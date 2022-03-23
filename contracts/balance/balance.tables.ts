import { ExtendedAsset, Name, table, primary, Table, MultiIndex } from "as-chain";
import { accounts } from "./balance.constants";

@table(accounts)
export class account extends Table {
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

export class Account extends account {}