import { Name, Table } from "as-chain";
import { TableStore } from "../../lib/store";

@table("results")
export class ResultsTable extends Table {
    constructor (
        public customerId: u64 = 0,
        public account: Name = new Name(),
        public randomValue: u64 = 0,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.customerId;
    }

    static getTable(code: Name): TableStore<Results> {
        return new TableStore<Results>(code, code, Name.fromString("results"));
    }
}

export class Results extends ResultsTable {}