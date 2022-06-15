import { Asset, Name, Table, Symbol, TableStore } from "..";

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
       public issuer: Name = new Name(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.supply.symbol.code();
    }
}

/**
 * Helpers
 */
export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset {
    const statstable = new TableStore<Stat>(tokenContractAccount, new Name(sym.code()));
    const st = statstable.requireGet(sym.code(), "token with symbol does not exist");
    return st.supply;
}

export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset {
    const acnts = new TableStore<Account>(tokenContractAccount, owner)
    const ac = acnts.requireGet(sym.code(), "no balance object found");
    return ac.balance;
}
