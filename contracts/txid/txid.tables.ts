import { Name, Table } from "as-chain";
import { TableStore } from "../../assembly";

@packer
export class KV {
    constructor (
        public key: string = "",
        public value: string = "",
    ) {}
}

@table("kvs")
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

    static getTable(code: Name): TableStore<AccountKV> {
        return new TableStore<AccountKV>(code, code, Name.fromString("kvs"));
    }
}

export class AccountKV extends AccountKVTable {}