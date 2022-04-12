import { currentTimePoint, ExtendedAsset, Name, check, requireAuth, isAccount, ExtendedSymbol } from '../../assembly'
import { TableStore } from '../../assembly';
import { BalanceContract } from '../balance';
import { ESCROW_STATUS } from './escrow.constants';
import { sendLogEscrow } from './escrow.inline';
import { EscrowGlobal, Escrow, escrow } from './escrow.tables';

@contract
export class EscrowContract extends BalanceContract {
    escrowsTable: TableStore<Escrow> = Escrow.getTable(this.receiver)

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
    @action("startescrow")
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

        // Pre-conditions
        this.checkContractIsNotPaused()

        // Validation
        check(to == new Name() || isAccount(to), "to must be empty or a valid account");
        check(expiry > currentTimePoint().secSinceEpoch(), "expiry must be in future");
        check(fromTokens.length || fromNfts.length, "must escrow atleast one token or NFT on from side");
        check(toTokens.length || toNfts.length, "must escrow atleast one token or NFT on to side");

        // Substract balances
        this.substractBalance(from, fromTokens, fromNfts)
      
        // Get and update config
        const escrowGlobalSingleton = EscrowGlobal.getSingleton(this.contract)
        const escrowGlobal = escrowGlobalSingleton.get()
        const escrowId = escrowGlobal.escrowId++;
        escrowGlobalSingleton.set(escrowGlobal, this.contract);

        // Create escrow object
        const escrow = new Escrow(
            escrowId,
            from,
            to,
            fromTokens,
            fromNfts,
            toTokens,
            toNfts,
            expiry
        )

        // Save escrow
        this.escrowsTable.store(escrow, this.contract);

        // Log
        sendLogEscrow(this.contract, escrow, ESCROW_STATUS.START);
    }

    /**
     * It fills an escrow.
     * @param {Name} actor - Name,
     * @param {u64} id - u64
     */
    @action("fillescrow")
    fillescrow(
        actor: Name,
        id: u64
    ): void {
        // Authenticate
        requireAuth(actor);

        // Pre-conditions
        this.checkContractIsNotPaused()
        
        // Get Escrow
        const escrow = this.escrowsTable.requireGet(id, `no escrow with ID ${id} found.`);
    
        // If empty, set to as actor
        if (escrow.to == new Name()) {
            escrow.to = actor;
        }

        // Validation
        check(escrow.to == actor, `only ${escrow.to} can fill this escrow`);

        // Substract balances
        this.substractBalance(escrow.to, escrow.toTokens, escrow.toNfts)

        // Erase
        this.escrowsTable.remove(escrow);
        
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
    @action("cancelescrow")
    cancelescrow(
        actor: Name,
        id: u64
    ): void {
        // Authenticate
        requireAuth(actor);

        // Pre-conditions
        this.checkContractIsNotPaused()

        // Get Escrow
        const escrow = this.escrowsTable.requireGet(id, `no escrow with ID ${id} found.`);
    
        // Authenticate
        check(actor == escrow.from || actor == escrow.to, `missing required authority of ${escrow.from} or ${escrow.to}`);

        // Erase
        this.escrowsTable.remove(escrow);

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
    @action("logescrow")
    logescrow(
        escrow: escrow,
        status: string
    ): void {
        requireAuth(this.contract)
    }
}
