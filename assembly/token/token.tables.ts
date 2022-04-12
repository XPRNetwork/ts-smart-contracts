import { Asset, Name, Table, Symbol } from "..";
import { TableStore } from ".."

/**
 * Tables
 */
@table("accounts")
export class account extends Table {
    constructor (
        public balance: Asset = new Asset()
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.balance.symbol.code();
    }

    static getTable(code: Name, accountName: Name): TableStore<Account>  {
        return new TableStore<Account>(code, accountName, Name.fromString("accounts"));
    }
}
@table("stat")
export class currency_stats extends Table {
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

    static getTable(code: Name, sym: Symbol): TableStore<Stat>  {
        return new TableStore<Stat>(code, new Name(sym.code()), Name.fromString("stat"));
    }
}

export class Account extends account {}
export class Stat extends currency_stats {}

/**
 * Helpers
 */
export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset {
    const statstable = Stat.getTable(tokenContractAccount, sym);
    const st = statstable.requireGet(sym.code(), "token with symbol does not exist");
    return st.supply;
}

export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset {
    const acnts = Account.getTable(tokenContractAccount, owner)
    const ac = acnts.requireGet(sym.code(), "no balance object found");
    return ac.balance;
}
