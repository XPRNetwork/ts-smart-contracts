import { IDXDB, SecondaryValue, SecondaryType, SecondaryIterator, SecondaryReturnValue } from "./idxdb";
import * as env from "./env";
import { check } from "./system";
import { U128 } from "./bignum";
import { print } from "./debug";

class IDX128ReturnValue {
    constructor(
        public i: SecondaryIterator,
        public value: U128) {
    }
}

export class IDX128 extends IDXDB {

    store(id: u64, value: U128, payer: u64): SecondaryIterator {
        let arr = new Array<u64>(2);
        store<u64>(arr.dataStart, value.lo);
        store<u64>(arr.dataStart+8, value.hi);

        let secondary_ptr = arr.dataStart;
        let it = env.db_idx128_store(this.scope, this.table, payer, id, secondary_ptr);
        return new SecondaryIterator(it, id, this.dbIndex);
    }

    storeEx(id: u64, value: SecondaryValue, payer: u64): SecondaryIterator {
        check(value.type == SecondaryType.U128, "idx128: bad type");
        check(value.value.length == 2, "idx128: bad value");
        let secondary_ptr = value.value.dataStart;
        let it = env.db_idx128_store(this.scope, this.table, payer, id, secondary_ptr);
        // env.db_idx128_find_primary(this.code, this.scope, this.table, secondary_ptr, id);
        // let lo = load<u64>(secondary_ptr);
        // let hi = load<u64>(secondary_ptr + 8);
        // printString(`+++++++++lo, hi: ${lo}, ${hi}\n`);

        return new SecondaryIterator(it, id, this.dbIndex);
    }

    update(iterator: SecondaryIterator, secondary: U128, payer: u64): void {
        let arr = new Array<u64>(2);
        store<u64>(arr.dataStart, secondary.lo);
        store<u64>(arr.dataStart + 8, secondary.hi);
        env.db_idx128_update(iterator.i, payer, arr.dataStart);
    }

    updateEx(iterator: SecondaryIterator, secondary: SecondaryValue, payer: u64): void {
        check(secondary.type == SecondaryType.U128, "idx128: bad value");
        check(secondary.value.length == 2, "idx128: bad value");
        let secondary_ptr = secondary.value.dataStart;
        env.db_idx128_update(iterator.i, payer, secondary_ptr);
    }

    remove(iterator: SecondaryIterator): void {
        env.db_idx128_remove(iterator.i);
    }

    next(iterator: SecondaryIterator): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let it = env.db_idx128_next(iterator.i, primary_ptr);
        let primary = load<u64>(primary_ptr);
        return new SecondaryIterator(it, primary, this.dbIndex);
    }

    previous(iterator: SecondaryIterator): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let it = env.db_idx128_previous(iterator.i, primary_ptr);
        let primary = load<u64>(primary_ptr);
        return new SecondaryIterator(it, primary, this.dbIndex);
    }

    findPrimary(primary: u64): IDX128ReturnValue {
        let secondary_ptr = __alloc(sizeof<u64>()*2);
        let it = env.db_idx128_find_primary(this.code, this.scope, this.table, secondary_ptr, primary);
        let i = new SecondaryIterator(it, primary, this.dbIndex);
        let lo = load<u64>(secondary_ptr);
        let hi = load<u64>(secondary_ptr+8);
        return new IDX128ReturnValue(i, new U128(lo, hi));
    }

    findPrimaryEx(primary: u64): SecondaryReturnValue {
        let secondary_ptr = __alloc(sizeof<u64>()*2);
        let it = env.db_idx128_find_primary(this.code, this.scope, this.table, secondary_ptr, primary);
        let i = new SecondaryIterator(it, primary, this.dbIndex);
        let value = new Array<u64>(2);
        value[0] = load<u64>(secondary_ptr);
        value[1] = load<u64>(secondary_ptr+8);
        let secondary = new SecondaryValue(SecondaryType.U128, value);
        return new SecondaryReturnValue(i, secondary);
    }

    find(secondary: U128): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.lo;
        secondaryCopy[1] = secondary.hi;
        let secondary_ptr = secondaryCopy.dataStart;
        let it = env.db_idx128_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        if (secondary.lo == secondaryCopy[0] && secondary.hi == secondaryCopy[1]) {
            return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        } else {
            return new SecondaryIterator(-1, 0, this.dbIndex);
        }
    }

    lowerBound(secondary: U128): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.lo;
        secondaryCopy[1] = secondary.hi;
        let secondary_ptr = secondaryCopy.dataStart;
        let it = env.db_idx128_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
    }

    lowerBoundEx(secondary: SecondaryValue): SecondaryReturnValue {
        check(secondary.type == SecondaryType.U128, "idx128: bad secondary type");
        check(secondary.value.length == 2, "idx128: bad value");
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.value[0];
        secondaryCopy[1] = secondary.value[1];
        let secondary_ptr = secondaryCopy.dataStart;

        let it = env.db_idx128_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        let iterator = new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        
        let value = new SecondaryValue(SecondaryType.U128, secondaryCopy);
        return new SecondaryReturnValue(iterator, value);
    }

    upperBound(secondary: U128): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.lo;
        secondaryCopy[1] = secondary.hi;
        let secondary_ptr = secondaryCopy.dataStart;
        let it = env.db_idx128_upperbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
    }

    upperBoundEx(secondary: SecondaryValue): SecondaryReturnValue {
        check(secondary.type == SecondaryType.U128, "idx128: bad secondary type");
        check(secondary.value.length == 2, "idx128: bad value");
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.value[0];
        secondaryCopy[1] = secondary.value[1];
        let secondary_ptr = secondaryCopy.dataStart;
        let it = env.db_idx128_upperbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        let iterator = new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        let value = new SecondaryValue(SecondaryType.U128, secondaryCopy);
        return new SecondaryReturnValue(iterator, value);
    }

    end(): SecondaryIterator {
        let it = env.db_idx128_end(this.code, this.scope, this.table);
        return new SecondaryIterator(it, 0, this.dbIndex);
    }
}

