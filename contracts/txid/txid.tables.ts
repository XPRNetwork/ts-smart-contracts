import { Name, Table, MultiIndex } from "as-chain";
import { kvs } from "./txid.constants";

@packer
export class KV {
    constructor (
        public key: string = "",
        public value: string = "",
    ) {}
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