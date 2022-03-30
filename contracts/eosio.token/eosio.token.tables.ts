import { Asset, Name, Table, MultiIndex, Symbol, check } from "as-chain";
import { accounts, stat } from "./eosio.token.constants";

/**
 * Tables
 */
@table(accounts)
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

    static getTable(code: Name, accountName: Name): MultiIndex<Account>  {
        return new MultiIndex<Account>(code, accountName, accounts);
    }
}
@table(stat)
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

    static getTable(code: Name, sym: Symbol): MultiIndex<Stat>  {
        return new MultiIndex<Stat>(code, new Name(sym.code()), stat);
    }
}

export class Account extends account {}
export class Stat extends currency_stats {}

/**
 * Helpers
 */
export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset {
    const statstable = Stat.getTable(tokenContractAccount, sym);

    const existing = statstable.find(sym.code());
    check(existing.isOk(), "token with symbol does not exist");
    const st = statstable.get(existing);

    return st.supply;
}

export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset {
    const acnts = Account.getTable(tokenContractAccount, owner)

    const existing = acnts.find(sym.code());
    check(existing.isOk(), "no balance object found");
    const ac = acnts.get(existing);

    return ac.balance;
}
