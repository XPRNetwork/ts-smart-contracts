import { ExtendedAsset, Name, Table } from "../../assembly";
import { TableStore } from "../../assembly";

@table("balances")
export class BalanceTable extends Table {
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

export class Balance extends BalanceTable {}