import { Asset, Name, Table, EMPTY_NAME } from "..";

/**
 * Tables
 */
@table("accounts")
export class Account extends Table {
    constructor (
        public balance: Asset = new Asset()
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.balance.symbol.code();
    }
}

@table("stat")
export class Stat extends Table {
    constructor (
       public supply: Asset = new Asset(),
       public max_supply: Asset =  new Asset(),
       public issuer: Name = EMPTY_NAME,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.supply.symbol.code();
    }
}