import { ExtendedAsset, unpackActionData, Name, check, requireAuth, SAME_PAYER, TableStore } from '..'
import { Transfer, sendTransferTokens } from '../token/token.inline';
import { AllowContract } from '../allow';
import { ATOMICASSETS_CONTRACT, sendTransferNfts, TransferNfts } from '../atomicassets'
import { Balance } from './balance.tables';
import { addNfts, addTokens, skipDepositFrom, substractNfts, substractTokens } from './balance.utils';

@contract
export class BalanceContract extends AllowContract {
    balancesTable: TableStore<Balance> = new TableStore<Balance>(this.receiver)

    /**
     * Incoming notification of "transfer" action from any contract
     * - If the contract is the atomicassets contract, then the action data is an NFT transfer.
     * - Else, the action data is a token transfer
     * @returns Nothing.
     */
    @action("transfer", notify)
    transfer(): void {
        // Pre-conditions
        this.checkContractIsNotPaused()

        if (this.parentContract == ATOMICASSETS_CONTRACT) {
            // Unpack nft transfer
            let t = unpackActionData<TransferNfts>()

            // Skip
            if (skipDepositFrom(t.from, this.contract)) {
                return;
            }
        
            // Validate transfer
            check(t.to == this.contract, "Invalid Deposit");

            // Check allowed
            this.checkNftsAreEnabled()
        
            // Add nfts
            this.addBalance(t.from, [], t.asset_ids, this.contract)
        } else {
            // Unpack token transfer
            let t = unpackActionData<Transfer>()

            // Skip
            if (skipDepositFrom(t.from, this.contract)) {
                return;
            }
        
            // Validate transfer
            check(t.to == this.contract, "Invalid Deposit");

            // Balance
            const tokens = [new ExtendedAsset(t.quantity, this.parentContract)]

            // Check allowed
            this.checkTokensAreEnabled()

            // Allow deposits
            check(this.isActorAllowed(this.parentContract), `Tokens from contract ${this.parentContract} are not enabled for deposits`)
            check(this.isTokenAllowed(tokens[0].getExtendedSymbol()), `Token ${tokens[0]} is not enabled for deposits`)

            // Add balance
            this.addBalance(t.from, tokens, [], this.contract)
        }
    }

    /**
     * Withdraw tokens and NFTs from an actor and transfer them to another actor
     * @param {Name} actor - Name
     * @param {ExtendedAsset[]} tokens - An array of `ExtendedAsset` objects.
     * @param {u64[]} nfts - u64[]
     */
    @action("withdraw")
    withdraw(
        actor: Name,
        tokens: ExtendedAsset[],
        nfts: u64[]
    ): void {
        // Authorization
        requireAuth(actor)

        // Pre-conditions
        this.checkContractIsNotPaused()

        // Substract Tokens and NFTs from actor balance
        this.substractBalance(actor, tokens, nfts)

        // Inline transfer Tokens and NFTs from contract to actor
        this.withdrawAdmin(actor, tokens, nfts, "withdraw")
    }

    /**
     * Withdraw all tokens and NFTs from the contract and transfer them to the actor.
     * Note:
     *  - Does not reduce balance
     *  - Assumes caller has already reduced balance using modifyBalance
     * @param {Name} actor - Name
     * @param {ExtendedAsset[]} tokens - The list of tokens to transfer.
     * @param {u64[]} nfts - u64[]
     * @param {string} memo - string
     */
    withdrawAdmin(
        actor: Name,
        tokens: ExtendedAsset[],
        nfts: u64[],
        memo: string
    ): void {
        // Authorization
        // Not a public action, so only contract can call

        // Inline transfer Tokens and NFTs from contract to actor
        sendTransferTokens(this.contract, actor, tokens, memo)
        sendTransferNfts(this.contract, actor, nfts, memo)
    }

    /**
     * It substracts tokens and/or NFTs from an actor.
     * @param {Name} actor - The actor for which to modify balances
     * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
     * @param {u64[]} nfts - The list of NFT asset ids
     * @param {Name} ramPayer - Account that pays for RAM 
     */
    substractBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[]): void {
        // Get account
        const account = this.balancesTable.requireGet(actor.N, `Account ${actor} not found`)

        // Substract Tokens + NFTs
        substractTokens(account, tokens)
        substractNfts(account, nfts)

        // Delete table if no NFTs and no tokens
        // Update table if any NFT or token found
        if (account.nfts.length == 0 && account.tokens.length == 0) {
            this.balancesTable.remove(account);
        } else {
            this.balancesTable.update(account, SAME_PAYER)
        }
    }

    /**
     * It adds tokens and/or NFTs from an actor.
     * @param {Name} actor - The actor for which to modify balances
     * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
     * @param {u64[]} nfts - The list of NFT asset ids
     * @param {Name} ramPayer - Account that pays for RAM 
     */
    addBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[], ramPayer: Name = actor): void {
        // Get actor
        let account = this.balancesTable.get(actor.N)
        if (!account) {
            account = new Balance(actor)
        }

        // Add Tokens + NFTs
        addTokens(account, tokens)
        addNfts(account, nfts)

        // Upsert table 
        this.balancesTable.set(account, ramPayer)
    }
}