import { Name, Table, ExtendedSymbol, Asset, EMPTY_NAME } from "..";
import { AtomicFormat } from "./atomicdata";

// Scope: N/A
@table("collections", noabigen)
export class Collections extends Table {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public author: Name = EMPTY_NAME,
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
}

//Scope: collection_name
@table("schemas", noabigen)
export class Schemas extends Table {
    constructor (
        public schema_name: Name = EMPTY_NAME,
        public format: AtomicFormat[] = [],
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.schema_name.N;
    }
}

//Scope: collection_name
@table("templates", noabigen)
export class Templates extends Table {
    constructor (
        public template_id: i32 = 0,
        public schema_name: Name = EMPTY_NAME,
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
}

//Scope: owner
@table("assets", noabigen)
export class Assets extends Table {
    constructor (
        public asset_id: u64 = 0,
        public collection_name: Name = EMPTY_NAME,
        public schema_name: Name = EMPTY_NAME,
        public template_id: i32 = 0,
        public ram_payer: Name = EMPTY_NAME,
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
}

// Scope: N/A
@table("offers", noabigen)
export class Offers extends Table {
    constructor (
        public offer_id: u64 = 0,
        public sender: Name = EMPTY_NAME,
        public recipient: Name = EMPTY_NAME,
        public sender_asset_ids: u64[] = [],
        public recipient_asset_ids: u64[] = [],
        public memo: string = "",
        public ram_payer: Name = EMPTY_NAME,
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
}

@table("config", singleton, noabigen)
export class Config extends Table {
    constructor (
        public asset_counter: u64 = 1099511627776,
        public template_counter: u32 = 1,
        public offer_counter: u64 = 1,
        public collection_format: AtomicFormat[] = [],
        public supported_tokens: ExtendedSymbol[] = [],
    ) {
        super();
    }
}
