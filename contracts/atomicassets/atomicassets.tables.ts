import { Name, Table, Singleton, ExtendedSymbol, Asset, IDX64, IDXDB } from "as-chain";
import { AtomicFormat } from "./atomicdata";
import { TableStore } from "../../lib/store";

// Scope: N/A
@table("collections", noabigen)
export class CollectionsTable extends Table {
    constructor (
        public collection_name: Name = new Name(),
        public author: Name = new Name(),
        public allow_notify: boolean = false,
        public authorized_accounts: Name[] = [],
        public notify_accounts: Name[] = [],
        public market_fee: f64 = <f64>(0),
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

//Scope: collection_name
@table("schemas", noabigen)
export class SchemasTable extends Table {
    constructor (
        public schema_name: Name = new Name(),
        public format: AtomicFormat[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.schema_name.N;
    }

    static getTable(code: Name, collection_name: Name): TableStore<Schemas> {
        return new TableStore<Schemas>(code, collection_name, Name.fromString("schemas"));
    }
}
export class Schemas extends SchemasTable {}

//Scope: collection_name
@table("templates", noabigen)
export class TemplatesTable extends Table {
    constructor (
        public template_id: i32 = 0,
        public schema_name: Name = new Name(),
        public transferable: boolean = true,
        public burnable: boolean = true,
        public max_supply: u32 = 0,
        public issued_supply: u32 = 0,
        public immutable_serialized_data: u8[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return <u64>(this.template_id);
    }

    static getTable(code: Name, collection_name: Name): TableStore<Templates> {
        return new TableStore<Templates>(code, collection_name, Name.fromString("templates"));
    }
}
export class Templates extends TemplatesTable {}

//Scope: owner
@table("assets", noabigen)
export class AssetsTable extends Table {
    constructor (
        public asset_id: u64 = 0,
        public collection_name: Name = new Name(),
        public schema_name: Name = new Name(),
        public template_id: i32 = 0,
        public ram_payer: Name = new Name(),
        public backed_tokens: Asset[] = [],
        public immutable_serialized_data: u8[] = [],
        public mutable_serialized_data: u8[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.asset_id;
    }

    static getTable(code: Name, owner: Name): TableStore<Assets> {
        return new TableStore<Assets>(code, owner, Name.fromString("assets"));
    }
}
export class Assets extends AssetsTable {}

// Scope: N/A
@table("offers", noabigen)
export class OffersTable extends Table {
    constructor (
        public offer_id: u64 = 0,
        public sender: Name = new Name(),
        public recipient: Name = new Name(),
        public sender_asset_ids: u64[] = [],
        public recipient_asset_ids: u64[] = [],
        public memo: string = "",
        public ram_payer: Name = new Name(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.offer_id;
    }

    @secondary
    get by_sender(): u64 {
        return this.sender.N
    }
    set by_sender(value: u64) {
        this.sender = Name.fromU64(value)
    }

    @secondary
    get by_recipient(): u64 {
        return this.recipient.N
    }
    set by_recipient(value: u64) {
        this.recipient = Name.fromU64(value)
    }

    static getTable(code: Name): TableStore<Offers> {
        const scope = code
        const tableName = Name.fromString("offers")
        const idxTableBase: u64 = (tableName.N & 0xfffffffffffffff0);
        const indexes: IDXDB[] = [
            new IDX64(code.N, scope.N, idxTableBase + 0, 0),
            new IDX64(code.N, scope.N, idxTableBase + 1, 0),
        ];
        return new TableStore<Offers>(code, code, tableName, indexes);
    }
}
export class Offers extends OffersTable {}

@table("config", singleton, noabigen)
export class ConfigSingleton extends Table {
    constructor (
        public asset_counter: u64 = 1099511627776,
        public template_counter: u32 = 1,
        public offer_counter: u64 = 1,
        public collection_format: AtomicFormat[] = [],
        public supported_tokens: ExtendedSymbol[] = [],
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<Config> {
        return new Singleton<Config>(code, code, Name.fromString("config"));
    }
}

export class Config extends ConfigSingleton {}