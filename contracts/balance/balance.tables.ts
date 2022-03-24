import { ExtendedAsset, Name, table, primary, Table, MultiIndex, singleton, Singleton } from "as-chain";
import { global, accounts } from "./balance.constants";

@table(global, singleton)
export class GlobalTable extends Table {
    constructor (
        public enableWhitelist: u64 = 0,
        public enableBlacklist: u64 = 0,
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<Global> {
        return new Singleton<Global>(code, code, global);
    }
}

export class Global extends GlobalTable {}

@table(accounts)
export class AccountTable extends Table {
    constructor (
        public name: Name = new Name(),
        public tokens: ExtendedAsset[] = [],
        public nfts: u64[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.name.N;
    }

    static getTable(code: Name): MultiIndex<Account> {
        return new MultiIndex<Account>(code, code, accounts);
    }
}

export class Account extends AccountTable {}