import {
    U128,
    U256,
    check,
    Float128,
    Contract,
    Table,
    Name,
} from "..";
import { TableStore } from "./store";

@table("mydata")
class MyData extends Table {
    constructor(
        public a: u64=0,
        public b: u64=0,
        public c: U128=new U128(),
        public d: f64=0.0,
        public e: U256=new U256(),
        public f: Float128=new Float128(),
    ) {
        super();
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

    @secondary
    get fvalue(): Float128 {
        return this.f;
    }
    set fvalue(value: Float128) {
        this.f = value;
    }

    static getTable(code: Name): TableStore<MyData> {
        return new TableStore<MyData>(code, code, Name.fromString("mydata"));
    }
}

function checkAvailablePrimaryKey (table: TableStore<MyData>, expected: u64): void {
    check(table.availablePrimaryKey == expected, `expected availablePrimaryKey ${expected}, got ${table.availablePrimaryKey}`);
}

@contract
class MyContract extends Contract{
    mdTable: TableStore<MyData> = MyData.getTable(this.receiver)

    @action("teststore")
    teststore(): void {
        // Variables
        let value: MyData

        // Is empty
        check(this.mdTable.isEmpty(), "is not empty")
        value = new MyData(1, 2, new U128(3), 3.3, new U256(11), new Float128(0xaa));
        this.mdTable.store(value, this.receiver);
        check(!this.mdTable.isEmpty(), "is empty")
        this.mdTable.remove(value);
        check(this.mdTable.isEmpty(), "is not empty")

        // Set & Remove
        value = new MyData(8, 8, new U128(9), 9.9, new U256(77), new Float128(0xcc));
        this.mdTable.set(value, this.receiver);
        value = new MyData(8, 0, new U128(0), 0, new U256(0), new Float128(0x0));
        this.mdTable.set(value, this.receiver);
        value = this.mdTable.requireGet(8, "set bad value")
        check(value.a == 8 && value.b == 0 && value.c == new U128(0) && value.d == 0, "get bad value: pk 8");
        this.mdTable.remove(value);

        // Update & Remove
        value = new MyData(8, 8, new U128(9), 9.9, new U256(77), new Float128(0xcc));
        this.mdTable.store(value, this.receiver);
        value = new MyData(8, 0, new U128(0), 0, new U256(0), new Float128(0x0));
        this.mdTable.update(value, this.receiver);
        value = this.mdTable.requireGet(8, "set bad value")
        check(value.a == 8 && value.b == 0 && value.c == new U128(0) && value.d == 0, "get bad value: pk 8");
        this.mdTable.remove(value);

        // Available primary key & Store
        checkAvailablePrimaryKey(this.mdTable, 0)

        value = new MyData(1, 2, new U128(3), 3.3, new U256(11), new Float128(0xaa));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 2)

        value = new MyData(4, 5, new U128(6), 6.6, new U256(44), new Float128(0xbb));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 5)

        value = new MyData(this.mdTable.availablePrimaryKey, 5, new U128(6), 6.6, new U256(44), new Float128(0xbb));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 6)

        value = new MyData(7, 8, new U128(9), 9.9, new U256(77), new Float128(0xcc));
        this.mdTable.store(value, this.receiver);
        checkAvailablePrimaryKey(this.mdTable, 8)

        this.mdTable.remove(value);
        checkAvailablePrimaryKey(this.mdTable, 6)

        // Get
        let getValue = this.mdTable.get(4);
        if (getValue == null) {
            check(false, "value 4 not found!")
            return
        }
        check(getValue.a == 4 && getValue.b == 5 && getValue.c == new U128(6) && getValue.d == 6.6, "get bad value: pk 4");

        getValue = this.mdTable.get(10);
        check(getValue == null, "getValue should not have been found with pk 10")

        // Require get
        value = this.mdTable.requireGet(4, "value 4 not found!");
        check(value.a == 4 && value.b == 5 && value.c == new U128(6) && value.d == 6.6, "requireGet bad value: pk 4");

        // Exists
        check(this.mdTable.exists(4), "pk 4 does not exist")
        check(!this.mdTable.exists(10), "pk 4 exists")

        check(this.mdTable.existsValue(value), "value 4 does not exist")
        const randomValue = new MyData(20, 8, new U128(9), 9.9, new U256(77), new Float128(0xcc));
        check(!this.mdTable.existsValue(randomValue), "value 20 exists")

        // Next
        const nextValue = this.mdTable.next(this.mdTable.first()!)
        if (nextValue == null) {
            check(false, "next value from first not found")
            return
        }
        check(nextValue.a == 4 && nextValue.b == 5 && nextValue.c == new U128(6) && nextValue.d == 6.6, "bad value: pk ub 1");

        // Previous
        const previousValue = this.mdTable.previous(value)
        if (previousValue == null) {
            check(false, "previous value from 4 not found")
            return
        }
        check(previousValue.a == 1 && previousValue.b == 2 && previousValue.c == new U128(3) && previousValue.d == 3.3, "bad value: pk 4 prev");

        // Lower bound
        const lbValue = this.mdTable.lowerBound(1)
        if (lbValue == null) {
            check(false, "lower bound from 1 not found")
            return
        }
        check(lbValue.a == 1 && lbValue.b == 2 && lbValue.c == new U128(3) && lbValue.d == 3.3, "bad value: pk lb 1");

        // Upper bound
        const ubValue = this.mdTable.upperBound(1)
        if (ubValue == null) {
            check(false, "upper bound from 1 not found")
            return
        }
        check(ubValue.a == 4 && ubValue.b == 5 && ubValue.c == new U128(6) && ubValue.d == 6.6, "bad value: pk ub 1");

        // First
        const firstValue = this.mdTable.first()
        if (firstValue == null) {
            check(false, "first value not found")
            return
        }
        check(firstValue.a == 1 && firstValue.b == 2 && firstValue.c == new U128(3) && firstValue.d == 3.3, "bad first value");

        // Last
        const lastValue = this.mdTable.last()
        if (lastValue == null) {
            check(false,  "last value not found")
            return
        }
        check(lastValue.a == 5 && lastValue.b == 5 && lastValue.c == new U128(6) && lastValue.d == 6.6, "bad last value");
    }
}