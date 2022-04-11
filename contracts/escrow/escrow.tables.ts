import { ExtendedAsset, Name, Table, Singleton } from "as-chain";
import { TableStore } from "../../assembly";

@table("escrowglobal", singleton)
export class escrowGlobal extends Table {
    constructor (
       public escrowId: u64 = 0,
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<EscrowGlobal> {
        return new Singleton<EscrowGlobal>(code, code, Name.fromString("escrowglobal"));
    }
}
export class EscrowGlobal extends escrowGlobal {}

@table("escrows")
export class escrow extends Table {
    constructor (
       public id: u64 = 0,
       public from: Name = new Name(),
       public to: Name = new Name(),
       public fromTokens: ExtendedAsset[] = [],
       public fromNfts: u64[] = [],
       public toTokens: ExtendedAsset[] = [],
       public toNfts: u64[] = [],
       public expiry: u32 = 0,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.id;
    }

    @secondary
    get byFrom(): u64 {
        return this.from.N;
    }

    set byFrom(value: u64) {
        this.from.N = value;
    }

    @secondary
    get byTo(): u64 {
        return this.to.N;
    }

    set byTo(value: u64) {
        this.to.N = value;
    }
   
    static getTable(code: Name): TableStore<Escrow> {
        return new TableStore<Escrow>(code, code, Name.fromString("escrows"));
    }
}
export class Escrow extends escrow {}