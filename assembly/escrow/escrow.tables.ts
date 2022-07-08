import { ExtendedAsset, Name, Table, EMPTY_NAME } from "../index";

@table("escrowglobal", singleton)
export class EscrowGlobal extends Table {
    constructor (
       public escrowId: u64 = 0
    ) {
        super();
    }
}

@table("escrows")
export class Escrow extends Table {
    constructor (
       public id: u64 = 0,
       public from: Name = EMPTY_NAME,
       public to: Name = EMPTY_NAME,
       public fromTokens: ExtendedAsset[] = [],
       public fromNfts: u64[] = [],
       public toTokens: ExtendedAsset[] = [],
       public toNfts: u64[] = [],
       public expiry: u32 = 0
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
}