import { currentTimePoint, ExtendedAsset, Name, check, contract, action, requireAuth, isAccount, SAME_PAYER, MultiIndex } from 'as-chain'
import { BalanceContract, OPERATION } from '../balance';
import { startescrow, fillescrow, cancelescrow, logescrow, ESCROW_STATUS } from './escrow.constants';
import { sendLogEscrow } from './escrow.inline';
import { Global, Escrow, escrow } from './escrow.tables';

@contract(escrow)
class EscrowContract extends BalanceContract {
    escrowsTable: MultiIndex<Escrow> = Escrow.getTable(this.receiver)

    /**
     * It creates an escrow.
     * @param {Name} from - Name,
     * @param {Name} to - Name,
     * @param {ExtendedAsset[]} fromTokens - ExtendedAsset[],
     * @param {u64[]} fromNfts - u64[]
     * @param {ExtendedAsset[]} toTokens - A list of tokens that the user wants to buy.
     * @param {u64[]} toNfts - the nft's that were given to the user
     * @param {u32} expiry - u32
     */
    @action(startescrow)
    startescrow(
        from: Name,
        to: Name,
        fromTokens: ExtendedAsset[],
        fromNfts: u64[],
        toTokens: ExtendedAsset[],
        toNfts: u64[],
        expiry: u32
    ): void {
        // Authenticate
        requireAuth(from);

        // Validation
        check(to == new Name() || isAccount(to), "to must be empty or a valid account");
        check(expiry > currentTimePoint().secSinceEpoch(), "expiry must be in future");
        check(fromTokens.length || fromNfts.length || toTokens.length || toNfts.length, "all tokens and NFTs must not be empty");

        // Substract balances
        this.modifyAccount(from, fromTokens, fromNfts, OPERATION.SUB, SAME_PAYER)
      
        // Get config
        const configSingleton = Global.getSingleton(this.contract)
        const config = configSingleton.get()

        // Create escrow object
        const escrow = new Escrow(
            config.escrow_id,
            from,
            to,
            fromTokens,
            fromNfts,
            toTokens,
            toNfts,
            expiry
        )

        // Update config
        config.escrow_id++;
        configSingleton.set(config, this.contract);

        // Save escrow
        this.escrowsTable.store(escrow, from);

        // Log
        sendLogEscrow(this.contract, escrow, ESCROW_STATUS.START);
    }

    /**
     * It fills an escrow.
     * @param {Name} fulfiller - Name,
     * @param {u64} id - u64
     */
    @action(fillescrow)
    fillescrow(
        fulfiller: Name,
        id: u64
    ): void {
        // Authenticate
        requireAuth(fulfiller);
  
        // Get Escrow
        const escrowItr = this.escrowsTable.requireFind(id, "no escrow with ID found.");
        const escrow = this.escrowsTable.get(escrowItr);
    
        // If empty, set to as fulfiller
        if (escrow.to == new Name()) {
            escrow.to = fulfiller;
        }

        // Validation
        check(escrow.to == fulfiller, "incorrect to account");

        // Substract balances
        this.modifyAccount(escrow.to, escrow.toTokens, escrow.toNfts, OPERATION.SUB, SAME_PAYER)

        // Erase
        this.escrowsTable.remove(escrowItr);
        
        // Send out
        const memo = `escrow ${id} completed!`
        this.withdrawadmin(escrow.from, escrow.toTokens, escrow.toNfts, memo)
        this.withdrawadmin(escrow.to, escrow.fromTokens, escrow.fromNfts, memo)
  
        // Log
        sendLogEscrow(this.contract, escrow, ESCROW_STATUS.FILL);
    }

    /**
     * It cancels an escrow.
     * @param {u64} id - u64
     */
    @action(cancelescrow)
    cancelescrow(
        actor: Name,
        id: u64
    ): void {
        // Authenticate
        requireAuth(actor);

        // Get Escrow
        const escrowItr = this.escrowsTable.requireFind(id, `no escrow with ID ${id} found.`);
        const escrow = this.escrowsTable.get(escrowItr);
    
        // Authenticate
        check(actor == escrow.from || actor == escrow.to, `must have auth of ${escrow.from} or ${escrow.to}`);

        // Erase
        this.escrowsTable.remove(escrowItr);

        // Send out
        this.withdrawadmin(escrow.from, escrow.fromTokens, escrow.fromNfts, `escrow ${id} cancelled!`)
  
        // Log
        sendLogEscrow(this.contract, escrow, ESCROW_STATUS.CANCEL);
    }

    /**
     * It logs the escrow and its status.
     * @param {escrow} escrow - The escrow object that is being updated.
     * @param {string} status - The status of the escrow.
     */
    @action(logescrow)
    logescrow(
        escrow: escrow,
        status: string
    ): void {
        requireAuth(this.contract)
    }
}
