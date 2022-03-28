import { ExtendedAsset, Name, table, primary, Table, singleton, Singleton } from "as-chain";
import { TableStore } from "../store";
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
        public account: Name = new Name(),
        public tokens: ExtendedAsset[] = [],
        public nfts: u64[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.account.N;
    }

    static getTable(code: Name): TableStore<Account> {
        return new TableStore<Account>(code, code, accounts);
    }
}

export class Account extends AccountTable {}