import { ExtendedAsset, Name, Table, EMPTY_NAME } from "..";

@table("balances")
export class Balance extends Table {
    constructor (
        public account: Name = EMPTY_NAME,
        public tokens: ExtendedAsset[] = [],
        public nfts: u64[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.account.N;
    }
}