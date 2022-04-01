import { Name, Table, Singleton, ExtendedSymbol } from "as-chain";
import { FORMAT } from "./atomicdata";
import { TableStore } from "../../contracts/store";

@table("collections")
export class CollectionsTable extends Table {
    constructor (
        public collection_name: Name = new Name(),
        public author: Name = new Name(),
        public allow_notify: boolean = false,
        public authorized_accounts: Name[] = [],
        public notify_accounts: Name[] = [],
        public market_fee: f64 = 0,
        public serialized_data: u8[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.collection_name.N;
    }

    static getTable(code: Name): TableStore<Collections> {
        return new TableStore<Collections>(code, code, Name.fromString("collections"));
    }
}
export class Collections extends CollectionsTable {}

@table("config", singleton)
export class ConfigSingleton extends Table {
    constructor (
        public asset_counter: u64 = 1099511627776,
        public template_counter: u32 = 1,
        public offer_counter: u64 = 1,
        public collection_format: FORMAT[] = [],
        public supported_tokens: ExtendedSymbol[] = [],
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<Config> {
        return new Singleton<Config>(code, code, Name.fromString("config"));
    }
}

export class Config extends ConfigSingleton {}