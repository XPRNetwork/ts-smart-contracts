import { ExtendedAsset, Name, table, primary, Table, singleton, secondary, MultiIndex, Singleton } from "as-chain";
import { globall, escrows } from "./escrow.constants";

@table(globall, singleton)
export class global extends Table {
    constructor (
       public escrow_id: u64 = 0,
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<Global> {
        return new Singleton<Global>(code, code, globall);
    }
}

@table(escrows)
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
   
    static getTable(code: Name): MultiIndex<Escrow> {
        return new MultiIndex<Escrow>(code, code, escrows);
    }
}

export class Global extends global {}
export class Escrow extends escrow {}