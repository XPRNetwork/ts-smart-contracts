
import { Table, BlockTimestamp, TimePoint, ActionData, Variant, Name, PublicKey, BinaryExtension, Asset, TimePointSec, OptionalNumber, KeyWeight, EMPTY_NAME } from "..";

@packer
export class BlockchainParameters extends Table {
    constructor (  
        public max_block_net_usage: u64 = 0,
        public target_block_net_usage_pct: u32 = 0,
        public max_transaction_net_usage: u32 = 0,
        public base_per_transaction_net_usage: u32 = 0,
        public net_usage_leeway: u32 = 0,
        public context_free_discount_net_usage_num: u32 = 0,
        public context_free_discount_net_usage_den: u32 = 0,
        public max_block_cpu_usage: u32 = 0,
        public target_block_cpu_usage_pct: u32 = 0,
        public max_transaction_cpu_usage: u32 = 0,
        public min_transaction_cpu_usage: u32 = 0,
        public max_transaction_lifetime: u32 = 0,
        public deferred_trx_expiration_window: u32 = 0,
        public max_transaction_delay: u32 = 0,
        public max_inline_action_size: u32 = 0,
        public max_inline_action_depth: u32 = 0,
        public max_authority_depth: u16 = 0
    ) {
        super()
    }
}

@table("global", singleton, noabigen)
export class Global extends BlockchainParameters {
    constructor (  
        public max_ram_size: u64 = <u64>(16) * 1024 * 1024 * 1024,
        public total_ram_bytes_reserved: u64 = 0,
        public total_ram_stake: i64 = 0,
        public last_producer_schedule_update: BlockTimestamp = new BlockTimestamp(),
        public last_pervote_bucket_fill: TimePoint = new TimePoint(),
        public pervote_bucket: i64 = 0,
        public perblock_bucket: i64 = 0,
        public total_unpaid_blocks: u32 = 0,
        public total_activated_stake: i64 = 0,
        public thresh_activated_stake_time: TimePoint = new TimePoint(),
        public last_producer_schedule_size: u16 = 0,
        public total_producer_vote_weight: f64 = 0,
        public last_name_close: BlockTimestamp = new BlockTimestamp(),
    ) {
        super();
    }

    get free_ram(): u64 {
        return this.max_ram_size - this.total_ram_bytes_reserved;
    }
}

@table("global2", singleton, noabigen)
export class Global2 extends Table {
    constructor (  
        public new_ram_per_block: u16 = 0,
        public last_ram_increase: BlockTimestamp = new BlockTimestamp(),
        public last_block_num: BlockTimestamp = new BlockTimestamp(),
        public total_producer_votepay_share: f64 = 0,
        public revision: u8 = 0,
    ) {
        super();
    }
}

@table("global3", singleton, noabigen)
export class Global3 extends Table {
    constructor (  
        public last_vpay_state_update: TimePoint = new TimePoint(),
        public total_vpay_share_change_rate: f64 = 0,
    ) {
        super();
    }
}

@table("global4", singleton, noabigen)
export class Global4 extends Table {
    constructor (  
        public continuous_rate: f64 = 0,
        public inflation_pay_factor: i64 = 0,
        public votepay_factor: i64 = 0,
    ) {
        super();
    }
}

@packer
class BlockSigningAuthorityV0 extends ActionData {
    constructor(
        public threshold: u32 = 0,
        public keys: KeyWeight[] = []
    ) {
        super()
    }
}

@variant
export class BlockSigningAuthority extends Variant {
    v0: BlockSigningAuthorityV0;

    // Just for TS intellisense, gets replaced by pre-processor
    static new<T>(value: T): BlockSigningAuthority {
        return instantiate<BlockSigningAuthority>()
    }
}

@table("producers", noabigen)
export class ProducerInfo extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public total_votes: f64 = 0,
        public producer_key: PublicKey = new PublicKey(),
        public is_active: boolean = true,
        public url: string = "",
        public unpaid_blocks: u32 = 0,
        public last_claim_time: TimePoint = new TimePoint(),
        public location: u32 = 0,
        public producer_authority: BinaryExtension<BlockSigningAuthority> = new BinaryExtension(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }

    @secondary
    get by_votes(): f64 {
        return this.is_active ? -this.total_votes : this.total_votes
    }
    set by_votes(value: f64) {
        this.total_votes = Math.abs(value)
    }

    get active(): bool {
        return this.is_active
    }

    deactivate(): void {
        this.producer_key = new PublicKey()
        this.producer_authority.value = null
        this.is_active = false
    }
}


@table("producers2", noabigen)
export class ProducerInfo2 extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public total_votes: f64 = 0,
        public producer_key: PublicKey = new PublicKey(),
        public is_active: boolean = true,
        public url: string =  "",
        public unpaid_blocks: u32 = 0,
        public last_claim_time: TimePoint = new TimePoint(),
        public location: u32 = 0,
        public producer_authority: BinaryExtension<BlockSigningAuthority> = new BinaryExtension(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }
}


@table("voters", noabigen)
export class VoterInfo extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public proxy: Name = EMPTY_NAME,
        public producers: Name[] = [],
        public staked: i64 = 0,
        public last_vote_weight: f64 = 0,
        public proxied_vote_weight: f64 = 0,
        public is_proxy: boolean = true,
        public flags1: u32 = 0,
        public reserved2: u32 = 0,
        public reserved3: u32 = 0,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }
}

@table("userres", noabigen)
export class UserResources extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public net_weight: Asset = new Asset(),
        public cpu_weight: Asset = new Asset(),
        public ram_bytes: i64 = 0,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }

    get is_empty(): bool {
        return this.net_weight.amount == 0 && this.cpu_weight.amount == 0 && this.ram_bytes == 0;
    }
}

@table("delband", noabigen)
export class DelegatedBandwidth extends Table {
    constructor (  
        public from: Name = EMPTY_NAME,
        public to: Name = EMPTY_NAME,
        public net_weight: Asset = new Asset(),
        public cpu_weight: Asset = new Asset(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.to.value
    }

    get is_empty(): bool {
        return this.net_weight.amount == 0 && this.cpu_weight.amount == 0;
    }
}

@table("refunds", noabigen)
export class Refunds extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public request_time: TimePointSec = new TimePointSec(),
        public net_amount: Asset = new Asset(),
        public cpu_amount: Asset = new Asset(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }

    get is_empty(): bool {
        return this.net_amount.amount == 0 && this.cpu_amount.amount == 0;
    }
}

@table("delxpr", noabigen)
export class DelegatedXpr extends Table {
    constructor (  
        public from: Name = EMPTY_NAME,
        public to: Name = EMPTY_NAME,
        public quantity: Asset = new Asset(),
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.to.value
    }

    get is_empty(): bool {
        return this.quantity.amount == 0;
    }
}


@table("votersxpr", noabigen)
export class VotersXpr extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public staked: u64 = 0,
        public isqualified: boolean = false,
        public claimamount: u64 = 0,
        public lastclaim: u64 = 0,
        public startstake: OptionalNumber<u64> = new OptionalNumber<u64>(),
        public startqualif: OptionalNumber<boolean> = new OptionalNumber<boolean>(),

    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }

    get is_empty(): bool {
        return this.staked == 0;
    }
}

@table("refundsxpr", noabigen)
export class XprRefundRequest extends Table {
    constructor (  
        public owner: Name = EMPTY_NAME,
        public request_time: TimePointSec = new TimePointSec(),
        public quantity: Asset = new Asset,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.owner.value
    }

    get is_empty(): bool {
        return this.quantity.amount == 0;
    }
}

@table("globalsxpr", singleton, noabigen)
export class GlobalsXpr extends Table {
    constructor (  
        public max_bp_per_vote: u64 = 4,
        public min_bp_reward: u64 = 4,
        public unstake_period: u64 = 14 * 24 * 60 * 60,
        public process_by: u64 = 50,
        public process_interval: u64 = 60 * 60 * 12,
        public voters_claim_interval: u64 = 60 * 60 * 24,
        public spare1: u64 = 0,
        public spare2: u64 = 0,
    ) {
        super();
    }
}

@table("usersram", noabigen)
export class UsersRam extends Table {
    constructor (  
        public account: Name = EMPTY_NAME,
        public ram: u64 = 0,
        public quantity: Asset = new Asset(),
        public ramlimit: u64 = 0,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.account.value
    }
}
