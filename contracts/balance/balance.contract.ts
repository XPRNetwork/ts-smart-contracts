import { ExtendedAsset, unpackActionData, Name, check, action, notify, contract, requireAuth, MultiIndex, SAME_PAYER } from 'as-chain'
import { AllowContract } from '../allow';
import { transfer, atomicassets, withdraw, balance } from './balance.constants';
import { sendTransferTokens, sendTransferNfts, NftTransfer, TokenTransfer } from './balance.inline';
import { Account } from './balance.tables';
import { addNfts, addTokens, OPERATION, substractNfts, substractTokens } from './balance.utils';

@contract(balance)
export class BalanceContract extends AllowContract {
    accountsTable: MultiIndex<Account> = Account.getTable(this.receiver)

    /**
     * Incoming notification of "transfer" action from any contract
     * - If the contract is the atomicassets contract, then the action data is an NFT transfer.
     * - Else, the action data is a token transfer
     * @returns Nothing.
     */
    @action(transfer, notify)
    transfer(): void {
        // Pre-conditions
        this.checkContractIsNotPaused()

        if (this.parentContract == atomicassets) {
            // Unpack nft transfer
            let t = unpackActionData<NftTransfer>()

            // Skip if outgoing
            if (t.from == this.contract) {
                return;
            }
        
            // Validate transfer
            check(t.to == this.contract, "Invalid Deposit");
        
            // Add nfts
            this.modifyBalance(t.from, [], t.asset_ids, OPERATION.ADD, this.contract)
        } else {
            // Unpack token transfer
            let t = unpackActionData<TokenTransfer>()

            // Skip if outgoing
            if (t.from == this.contract) {
                return;
            }
  
            // Skip if deposit from system accounts
            if (
                t.from == Name.fromString("eosio.stake") ||
                t.from == Name.fromString("eosio.ram") ||
                t.from == Name.fromString("eosio")
            ) {
                return
            }
        
            // Validate transfer
            check(t.to == this.contract, "Invalid Deposit");

            // Add balance
            const tokens = [new ExtendedAsset(t.quantity, this.parentContract)]
            this.modifyBalance(t.from, tokens, [], OPERATION.ADD, this.contract)
        }
    }

    /**
     * Withdraw tokens and NFTs from an actor and transfer them to another actor
     * @param {Name} actor - Name
     * @param {ExtendedAsset[]} tokens - An array of `ExtendedAsset` objects.
     * @param {u64[]} nfts - u64[]
     */
    @action(withdraw)
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
        this.modifyBalance(actor, tokens, nfts, OPERATION.SUB, SAME_PAYER)

        // Inline transfer Tokens and NFTs from contract to actor
        sendTransferTokens(this.contract, actor, tokens, "withdraw")
        sendTransferNfts(this.contract, actor, nfts, "withdraw")
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
    withdrawadmin(
        actor: Name,
        tokens: ExtendedAsset[],
        nfts: u64[],
        memo: string
    ): void {
        // Authorization
        requireAuth(this.contract)

        // Inline transfer Tokens and NFTs from contract to actor
        sendTransferTokens(this.contract, actor, tokens, memo)
        sendTransferNfts(this.contract, actor, nfts, memo)
    }

    /**
     * It adds or substracts tokens and NFTs from an actor.
     * @param {Name} actor - The actor for which to modify balances
     * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
     * @param {u64[]} nfts - The list of NFT asset ids
     * @param {OPERATION} op - OPERATION = add or sub
     * @param {Name} ramPayer - Account that pays for RAM 
     */
    modifyBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[], op: OPERATION, ramPayer: Name = actor): void {
        // Find actor
        let accountItr = this.accountsTable.find(actor.N);

        // Store empty actor if not found
        if (!accountItr.isOk()) {
            accountItr = this.accountsTable.store(new Account(actor), ramPayer);
        }
        
        // Get actor
        const account = this.accountsTable.get(accountItr)

        // Operation
        if (op == OPERATION.ADD) {
            addTokens(account, tokens)
            addNfts(account, nfts)
        } else if (op == OPERATION.SUB) {
            substractTokens(account, tokens)
            substractNfts(account, nfts)
        }
    
        // Delete table if no NFTs and no tokens
        // Update table if any NFT or token found
        if (account.nfts.length == 0 && account.tokens.length == 0) {
            this.accountsTable.remove(accountItr);
        } else {
            this.accountsTable.update(accountItr, account, ramPayer);
        }
    }
}