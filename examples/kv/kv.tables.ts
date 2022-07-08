import { Name, Table, EMPTY_NAME } from "proton-tsc";

@packer
export class KV {
    constructor (
        public key: string = "",
        public value: string = "",
    ) {}
}

@table("kvs")
export class AccountKV extends Table {
    constructor (
        public account: Name = EMPTY_NAME,
        public values: KV[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.account.N;
    }
}