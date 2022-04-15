import { ExtendedAsset, Name, Table } from "..";
import { TableStore } from "..";

@table("balances")
export class Balance extends Table {
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

    static getTable(code: Name): TableStore<Balance> {
        return new TableStore<Balance>(code, code, Name.fromString("balances"));
    }
}