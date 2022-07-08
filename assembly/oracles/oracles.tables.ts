import { Name, Table, OptionalNumber, OptionalString, check, TimePoint, EMPTY_NAME } from "..";

@packer
export class DataVariant extends Table {
    private d_string: OptionalString;
    private d_uint64_t: OptionalNumber<u64>;
    private d_double: OptionalNumber<f64>;

    constructor(
        d_string: string | null = null,
        d_uint64_t: u64 = 0,
        d_double: f64 = f64.NaN,
    ) {
        super();

        if (d_string != null) {
            this.d_string = new OptionalString(d_string!, true); 
        } else {
            this.d_string = new OptionalString("", false); 
        }

        if (d_uint64_t != u64.MAX_VALUE) {
            this.d_uint64_t = new OptionalNumber<u64>(d_uint64_t, true); 
        } else {
            this.d_uint64_t = new OptionalNumber<u64>(0, false); 
        }

        if (d_double != f64.NaN) {
            this.d_double = new OptionalNumber<f64>(d_double, true); 
        } else {
            this.d_double = new OptionalNumber<f64>(0, false); 
        }
    }

    get dataType(): string {
        if (this.d_string.hasValue) {
          return "string";
        } else if (this.d_uint64_t.hasValue) {
          return "uint64_t";
        } else if (this.d_double.hasValue) {
          return "double";
        } else {
          check(false, "invalid data_variant type");
          return "";
        }
    }

    get stringValue(): string {
        check(this.d_string.hasValue, "invalid data variant type: not a string");
        return this.d_string.value;
    }

    get u64Value(): u64 {
        check(this.d_uint64_t.hasValue, "invalid data variant type: not a u64");
        return this.d_uint64_t.value;
    }

    get f64Value(): f64 {
        check(this.d_double.hasValue, "invalid data variant type: not a f64");
        return this.d_double.value;
    }
}

@packer
export class ProviderPoint extends Table {
    constructor (
        public provider: Name = EMPTY_NAME,
        public time: TimePoint = new TimePoint(),
        public data: DataVariant = new DataVariant(),
    ) {
        super();
    }
}

@packer
export class ConfigSingle extends Table {
    constructor (
        public key: string = "",
        public value: u64 = 0
    ) {
        super();
    }
}

@table("feeds", noabigen)
export class Feed extends Table {
    constructor (
        public index: u64 = 0,
        public name: string = "",
        public description: string = "",
        public aggregate_function: string = "",
        public data_type: string = "",
        public config: ConfigSingle[] = [],
        public providers: ProviderSingle[] = [],
    ) {
        super();
    }

    @primary
    get primaryKey(): u64 {
        return this.index;
    }
}

@packer
export class ProviderSingle extends Table {
    constructor (
        public key: Name = EMPTY_NAME,
        public value: TimePoint = new TimePoint()
    ) {
        super();
    }
}


@table("data", noabigen)
export class Data extends Table {
    constructor (
        public feed_index: u64 = 0,
        public aggregate: DataVariant = new DataVariant(),
        public points: ProviderPoint[] = [],
    ) {
        super();
    }

    @primary
    get primaryKey(): u64 {
        return this.feed_index;
    }
}

@packer
export class VoteSingle extends Table {
    constructor (
        public key: Name = EMPTY_NAME,
        public value: boolean = false
    ) {
        super();
    }
}

@table("msigs", noabigen)
export class Msig extends Table {
    constructor (
        public index: u64 = 0,
        public proposer: Name = EMPTY_NAME,
        public new_feed: Feed = new Feed(),
        public votes: VoteSingle[] = [],
    ) {
        super();
    }

    @primary
    get primaryKey(): u64 {
        return this.index;
    }
}