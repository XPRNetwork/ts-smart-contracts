import {IDXDB, SecondaryValue, SecondaryType, SecondaryIterator, SecondaryReturnValue} from "./idxdb";
import * as env from "./env";
import { check } from "./system";
import { Float128 } from "./float128"

class IDXF128ReturnValue {
    constructor(
        public i: SecondaryIterator,
        public value: Float128,// secondary value
    ) {
    }
}

export class IDXF128 extends IDXDB {
    store(id: u64, value: Float128, payer: u64): SecondaryIterator {
        check(value.type == SecondaryType.F128, "idx_long_double: bad type");
        check(value.value.length == 2, "idx_long_double: bad value");
        let secondary_ptr = value.data.dataStart;
        let it = env.db_idx_long_double_store(this.scope, this.table, payer, id, secondary_ptr);
        return new SecondaryIterator(it, id, this.dbIndex);
    }
    
    storeEx(id: u64, value: SecondaryValue, payer: u64): SecondaryIterator {
        check(value.type == SecondaryType.F128, "idx_long_double: bad type");
        check(value.value.length == 2, "idx_long_double: bad value");
        let secondary_ptr = value.value.dataStart;
        let it = env.db_idx_long_double_store(this.scope, this.table, payer, id, secondary_ptr);
        return new SecondaryIterator(it, id, this.dbIndex);
    }

    update(iterator: SecondaryIterator, secondary: Float128, payer: u64): void {
        check(secondary.type == SecondaryType.F128, "idx_long_double: bad value");
        check(secondary.data.length == 2, "idx_long_double: bad value");
        let secondary_ptr = secondary.value.dataStart;
        env.db_idx_long_double_update(iterator, payer, secondary_ptr);
    }

    updateEx(iterator: SecondaryIterator, secondary: SecondaryValue, payer: u64): void {
        check(secondary.type == SecondaryType.F128, "idx_long_double: bad value");
        check(secondary.value.length == 2, "idx_long_double: bad value");
        let secondary_ptr = secondary.value.dataStart;
        env.db_idx_long_double_update(iterator.i, payer, secondary_ptr);
    }

    remove(iterator: SecondaryIterator): void {
        env.db_idx_long_double_remove(iterator.i);
    }

    next(iterator: SecondaryIterator): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let it = env.db_idx_long_double_next(iterator.i, primary_ptr);
        let primary = load<u64>(primary_ptr);
        return new SecondaryIterator(it, primary, this.dbIndex);
    }

    previous(iterator: SecondaryIterator): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let it = env.db_idx_long_double_previous(iterator.i, primary_ptr);
        let primary = load<u64>(primary_ptr);
        return new SecondaryIterator(it, primary, this.dbIndex);
    }

    findPrimary(primary: u64): IDXF128ReturnValue {
        let secondary = new Float128();
        let it = env.db_idx_long_double_find_primary(this.code, this.scope, this.table, secondary.data.dataStart, primary);
        let i = new SecondaryIterator(it, primary, this.dbIndex);
        return new IDXF128ReturnValue(i, secondary);
    }

    findPrimaryEx(primary: u64): SecondaryReturnValue {
        let secondary_ptr = __alloc(sizeof<u64>()*2);
        let it = env.db_idx_long_double_find_primary(this.code, this.scope, this.table, secondary_ptr, primary);
        let i = new SecondaryIterator(it, primary, this.dbIndex);
        let value = new Array<u64>(2);
        value[0] = load<u64>(secondary_ptr);
        value[1] = load<u64>(secondary_ptr+8);
        let secondary = new SecondaryValue(SecondaryType.F128, value);
        return new SecondaryReturnValue(i, secondary);
    }

    find(secondary: Float128): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.data[0];
        secondaryCopy[1] = secondary.data[1];
        let secondary_ptr = secondaryCopy.dataStart;

        let it = env.db_idx_long_double_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        if (secondary.data[0] == secondaryCopy[0] && secondary.data[1] == secondaryCopy[1]) {
            return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        } else {
            return new SecondaryIterator(-1, 0, this.dbIndex);
        }
    }

    lowerBound(secondary: Float128): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.data[0];
        secondaryCopy[1] = secondary.data[1];
        let secondary_ptr = secondaryCopy.dataStart;

        let it = env.db_idx_long_double_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
    }

    lowerBoundEx(secondary: SecondaryValue): SecondaryReturnValue {
        check(secondary.type == SecondaryType.F128, "idx_long_double: bad secondary type");
        check(secondary.value.length == 2, "idx_long_double: bad value");
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.value[0];
        secondaryCopy[1] = secondary.value[1];
        let secondary_ptr = secondaryCopy.dataStart;

        let it = env.db_idx_long_double_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        let iterator = new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        
        let value = new SecondaryValue(SecondaryType.F128, secondaryCopy);
        return new SecondaryReturnValue(iterator, value);
    }

    upperBound(secondary: Float128): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.data[0];
        secondaryCopy[1] = secondary.data[1];
        let secondary_ptr = secondaryCopy.dataStart;
        let it = env.db_idx_long_double_upperbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
    }

    upperBoundEx(secondary: SecondaryValue): SecondaryReturnValue {
        check(secondary.type == SecondaryType.F128, "idx_long_double: bad secondary type");
        check(secondary.value.length == 2, "idx_long_double: bad value");
        let primary_ptr = __alloc(sizeof<u64>());

        let secondaryCopy = new Array<u64>(2);
        secondaryCopy[0] = secondary.value[0];
        secondaryCopy[1] = secondary.value[1];
        let secondary_ptr = secondaryCopy.dataStart;
        let it = env.db_idx_long_double_upperbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        let iterator = new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        let value = new SecondaryValue(SecondaryType.F128, secondaryCopy);
        return new SecondaryReturnValue(iterator, value);
    }

    end(): SecondaryIterator {
        let it = env.db_idx_long_double_end(this.code, this.scope, this.table);
        return new SecondaryIterator(it, 0, this.dbIndex);
    }
}

