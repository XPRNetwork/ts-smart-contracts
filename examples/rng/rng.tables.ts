import { Name, Table } from "proton-tsc";

@table("results")
export class Results extends Table {
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
}