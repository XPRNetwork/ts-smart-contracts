import {
    U128,
    U256,
    check,
    Contract,
    Table,
    printStorage,
    Name
} from "../..";
import { TableStore } from "./store";

@table("mydata")
class MyData extends Table {
    constructor(
        public a: u64 = 0,
        public b: u64 = 0,
        public c: U128 = new U128(),
        public d: f64 = 0.0,
        public e: U256 = new U256(),
    ) {
        super();
    }

    static equal (one: MyData, two: MyData): boolean {
        return one.a == two.a && one.b == two.b && one.c == two.c && one.d == two.d && one.e == two.e
    }

    @primary
    get getPrimary(): u64 {
        return this.a;
    }

    @secondary
    get bvalue(): u64 {
        return this.b;
    }
    set bvalue(value: u64) {
        this.b = value;
    }

    @secondary
    get cvalue(): U128 {
        return this.c;
    }
    set cvalue(value: U128) {
        this.c = value;
    }

    @secondary
    get dvalue(): f64 {
        return this.d;
    }
    set dvalue(value: f64) {
        this.d = value;
    }

    @secondary
    get evalue(): U256 {
        return this.e;
    }
    set evalue(value: U256) {
        this.e = value;
    }
}

@table("mydata2")
class MyData2 extends Table {
    constructor(
        public a: u64 = 0,
        public b: u64 = 0,
        public c: U128 = new U128(),
        public d: f64 = 0.0,
        public e: U256 = new U256(),
    ) {
        super();
    }

    @primary
    get getPrimary(): u64 {
        return this.a;
    }
}


function checkAvailablePrimaryKey (table: TableStore<MyData>, expected: u64): void {
    check(table.availablePrimaryKey == expected, `expected availablePrimaryKey ${expected}, got ${table.availablePrimaryKey}`);
}

@contract
class MyContract extends Contract{
    mdTable: TableStore<MyData> = new TableStore<MyData>(this.receiver)
    mdScopeTable: TableStore<MyData2> = new TableStore<MyData2>(this.receiver, Name.fromU64(0))

    @action("store")
    store(): void {
        // Variables
        let value: MyData

        // Is empty
        check(this.mdTable.isEmpty(), "is not empty")
        value = new MyData(1, 2, U128.from(3), 3.3, U256.fromU64(11));
        this.mdTable.store(value, this.receiver);
        check(!this.mdTable.isEmpty(), "is empty")
        this.mdTable.remove(value);
        check(this.mdTable.isEmpty(), "is not empty")

        // Set & Remove
        value = new MyData(8, 8, U128.from(9), 9.9, U256.fromU64(77));
        this.mdTable.set(value, this.receiver);
        value = new MyData(8, 0, U128.from(0), 0, U256.fromU64(0));
        this.mdTable.set(value, this.receiver);
        value = this.mdTable.requireGet(8, "set bad value")
        check(MyData.equal(value, new MyData(8, 0, U128.from(0), 0, U256.fromU64(0))), "get bad value: pk 8");
        this.mdTable.remove(value);

        // Update & Remove
        value = new MyData(8, 8, U128.from(9), 9.9, U256.fromU64(77));
        this.mdTable.store(value, this.receiver);
        value = new MyData(8, 0, U128.from(0), 0, U256.fromU64(0));
        this.mdTable.update(value, this.receiver);
        value = this.mdTable.requireGet(8, "set bad value")
        check(MyData.equal(value, new MyData(8, 0, U128.from(0), 0, U256.fromU64(0))), "get bad value: pk 8");
        this.mdTable.remove(value);

        // Available primary key & Store
        checkAvailablePrimaryKey(this.mdTable, 0)

        value = new MyData(1, 2, U128.from(3), 3.3, U256.fromU64(11));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 2)

        value = new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 5)

        value = new MyData(this.mdTable.availablePrimaryKey, 5, U128.from(6), 6.6, U256.fromU64(44));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 6)

        value = new MyData(7, 8, U128.from(9), 9.9, U256.fromU64(77));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 8)

        this.mdTable.remove(value);
        checkAvailablePrimaryKey(this.mdTable, 6)

        // Set
        value = new MyData(100, 20, U128.from(30), 3.30, U256.Max);
        this.mdTable.store(value, this.receiver);
    }

    @action("storescope")
    storescope(): void {
        let value = new MyData2(15, 2, U128.from(3), 3.3, U256.fromU64(11));
        this.mdScopeTable.store(value, this.receiver);
    }

    @action("getprimary")
    getprimary(): void {
        // Get
        let getValue = this.mdTable.get(4);
        if (getValue == null) {
            check(false, "value 4 not found !")
            return
        }
        check(MyData.equal(getValue, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "get bad value: pk 4");

        getValue = this.mdTable.get(10);
        check(getValue == null, "getValue should not have been found with pk 10")

        // Require get
        let value = this.mdTable.requireGet(4, "value 4 not found!");
        check(MyData.equal(value, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "requireGet bad value: pk 4");

        // Exists
        check(this.mdTable.exists(4), "pk 4 does not exist")
        check(!this.mdTable.exists(10), "pk 4 exists")

        check(this.mdTable.existsValue(value), "value 4 does not exist")
        const randomValue = new MyData(20, 8, U128.from(9), 9.9, U256.fromU64(77));
        check(!this.mdTable.existsValue(randomValue), "value 20 exists")

        // Next
        const nextValue = this.mdTable.next(this.mdTable.first()!)
        if (nextValue == null) {
            check(false, "next value from first not found")
            return
        }
        check(MyData.equal(nextValue, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "bad value: pk 4 next");

        // Previous
        const previousValue = this.mdTable.previous(value)
        if (previousValue == null) {
            check(false, "previous value from 4 not found")
            return
        }
        check(MyData.equal(previousValue, new MyData(1, 2, U128.from(3), 3.3, U256.fromU64(11))), "bad value: pk 4 prev");

        // Lower bound
        const lbValue = this.mdTable.lowerBound(1)
        if (lbValue == null) {
            check(false, "lower bound from 1 not found")
            return
        }
        check(MyData.equal(lbValue, new MyData(1, 2, U128.from(3), 3.3, U256.fromU64(11))), "bad value: pk lb 1");

        // Upper bound
        const ubValue = this.mdTable.upperBound(1)
        if (ubValue == null) {
            check(false, "upper bound from 1 not found")
            return
        }
        check(MyData.equal(ubValue, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "bad value: pk ub 1");

        // First
        const firstValue = this.mdTable.first()
        if (firstValue == null) {
            check(false, "first value not found")
            return
        }
        check(MyData.equal(firstValue, new MyData(1, 2, U128.from(3), 3.3, U256.fromU64(11))), "bad first value");

        // Last
        const lastValue = this.mdTable.last()
        if (lastValue == null) {
            check(false,  "last value not found")
            return
        }
        check(MyData.equal(lastValue, new MyData(100, 20, U128.from(30), 3.30, U256.Max)), "bad last value");
    }

    @action("getsecondary")
    getsecondary(): void {
        // Get U64
        const getSecU64Value = this.mdTable.getBySecondaryU64(5, 0)
        if (getSecU64Value == null) {
            check(false,  "secondary u64 value not found")
            return
        }
        check(MyData.equal(getSecU64Value, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "bad secondary u64 value");

        // Get U128
        const getSecU128Value = this.mdTable.getBySecondaryU128(U128.from(6), 1)
        if (getSecU128Value == null) {
            check(false,  "secondary U128 value not found")
            return
        }
        check(MyData.equal(getSecU128Value, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "bad secondary U128 value");

        // Get F64
        const getSecF64Value = this.mdTable.getBySecondaryF64(6.6, 2)
        if (getSecF64Value == null) {
            check(false,  "secondary f64 value not found")
            return
        }
        check(MyData.equal(getSecF64Value, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "bad secondary f64 value");

        // Get U256
        const getSecU256Value = this.mdTable.getBySecondaryU256(U256.fromU64(44), 3)
        if (getSecU256Value == null) {
            check(false,  "secondary U256 value not found")
            return
        }
        check(MyData.equal(getSecU256Value, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "bad secondary U256 value");
    }

    @action("itrstorage")
    itrstorage(): void {
        // Index U64: Get
        const getSecU64Value0 = this.mdTable.getBySecondaryU64(8, 0)
        if (getSecU64Value0 == null) {
            return
        }

        // Index U64: Get
        const getSecU64Value1 = this.mdTable.getBySecondaryU64(5, 0)
        if (getSecU64Value1 == null) {
            check(false,  "itrstorage: secondary u64 value 1 not found")
            return
        }
        check(MyData.equal(getSecU64Value1, new MyData(4, 5, U128.from(6), 6.6, U256.fromU64(44))), "itrstorage: bad secondary u64 value 1");

        // Index U64: Next
        const getSecU64Value2 = this.mdTable.nextBySecondaryU64(getSecU64Value1, 0)
        if (getSecU64Value2 == null) {
            check(false,  "itrstorage: secondary u64 value 2 not found")
            return
        }
        check(MyData.equal(getSecU64Value2, new MyData(5, 5, U128.from(6), 6.6, U256.fromU64(44))), "itrstorage: bad secondary u64 value 2");

        // Index U64: Previous
        const getSecU64Value3 = this.mdTable.previousBySecondaryU64(getSecU64Value1, 0)
        if (getSecU64Value3 == null) {
            check(false,  "itrstorage: secondary u64 value 3 not found")
            return
        }
        check(MyData.equal(getSecU64Value3, new MyData(1, 2, U128.from(3), 3.3, U256.fromU64(11))), "itrstorage: bad secondary u64 value 3");
    }    
}