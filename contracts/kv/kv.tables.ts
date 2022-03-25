import { Name, table, primary, Table, MultiIndex, packer } from "as-chain";
import { kvs } from "./kv.constants";

@packer
export class KV extends Table {
    constructor (
        public key: string = "",
        public value: string = "",
    ) {
        super();
    }
}

@table(kvs)
export class AccountKVTable extends Table {
    constructor (
        public account: Name = new Name(),
        public values: KV[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.account.N;
    }

    static getTable(code: Name): MultiIndex<AccountKV> {
        return new MultiIndex<AccountKV>(code, code, kvs);
    }
}

export class AccountKV extends AccountKVTable {}