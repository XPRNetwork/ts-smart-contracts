import {IDXDB, SecondaryValue, SecondaryType, SecondaryIterator, SecondaryReturnValue} from "./idxdb";
import * as env from "./env";
import { assert } from "./system";

class IDXF64ReturnValue {
    constructor(
        public i: SecondaryIterator,
        public value: f64) {
    }
}

export class IDXF64 extends IDXDB {
    store(id: u64, value: f64, payer: u64): SecondaryIterator {
        let secondary_ptr = __alloc(sizeof<f64>());
        store<f64>(secondary_ptr, value);
        let it = env.db_idx_double_store(this.scope, this.table, payer, id, secondary_ptr);
        return new SecondaryIterator(it, id, this.dbIndex);
    }
    
    storeEx(id: u64, value: SecondaryValue, payer: u64): SecondaryIterator {
        assert(value.type == SecondaryType.F64, "idxf64: bad type");
        return this.store(id, load<f64>(value.value.dataStart), payer);
    }

    update(iterator: SecondaryIterator, value: f64, payer: u64): void {
        let value_ptr = __alloc(sizeof<f64>());
        store<f64>(value_ptr, value);
        env.db_idx_double_update(iterator.i, payer, value_ptr);
    }

    updateEx(iterator: SecondaryIterator, secondary: SecondaryValue, payer: u64): void {
        assert(secondary.type == SecondaryType.F64, "idxf64: bad value");
        this.update(iterator, load<f64>(secondary.value.dataStart), payer);
    }

    remove(iterator: SecondaryIterator): void {
        env.db_idx_double_remove(iterator.i);
    }

    next(iterator: SecondaryIterator): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let it = env.db_idx_double_next(iterator.i, primary_ptr);
        let primary = load<u64>(primary_ptr);
        return new SecondaryIterator(it, primary, this.dbIndex);
    }

    previous(iterator: SecondaryIterator): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let it = env.db_idx_double_previous(iterator.i, primary_ptr);
        let primary = load<u64>(primary_ptr);
        return new SecondaryIterator(it, primary, this.dbIndex);
    }

    findPrimary(primary: u64): IDXF64ReturnValue {
        let secondary_ptr = __alloc(sizeof<f64>());
        let it = env.db_idx_double_find_primary(this.code, this.scope, this.table, secondary_ptr, primary);
        let i = new SecondaryIterator(it, primary, this.dbIndex);
        return new IDXF64ReturnValue(i, load<f64>(secondary_ptr));
    }

    findPrimaryEx(primary: u64): SecondaryReturnValue {
        let secondary_ptr = __alloc(sizeof<f64>());
        let it = env.db_idx_double_find_primary(this.code, this.scope, this.table, secondary_ptr, primary);
        let i = new SecondaryIterator(it, primary, this.dbIndex);
        let value = new Array<u64>(1);
        value[0] = load<u64>(secondary_ptr);
        let secondary = new SecondaryValue(SecondaryType.F64, value);
        return new SecondaryReturnValue(i, secondary);
    }

    find(secondary: f64): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let secondary_ptr = __alloc(sizeof<f64>());
        store<f64>(secondary_ptr, secondary);
        let it = env.db_idx_double_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        let secondary2 = load<f64>(secondary_ptr);
        if (secondary2 == secondary) {
            return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        } else {
            return new SecondaryIterator(-1, 0, this.dbIndex);
        }
    }

    lowerBound(secondary: f64): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let secondary_ptr = __alloc(sizeof<f64>());
        store<f64>(secondary_ptr, secondary);
        let it = env.db_idx_double_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
    }

    lowerBoundEx(secondary: SecondaryValue): IDXF64ReturnValue {
        assert(secondary.type == SecondaryType.F64, "lowerBoundEx:bad secondary value");
        let primary_ptr = __alloc(sizeof<u64>());
        let secondary_ptr = __alloc(sizeof<f64>());
        store<u64>(secondary_ptr, secondary.value[0]);
        let it = env.db_idx_double_lowerbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        let iterator = new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        return new IDXF64ReturnValue(iterator, load<f64>(secondary_ptr));
    }

    upperBound(secondary: f64): SecondaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let secondary_ptr = __alloc(sizeof<f64>());
        store<f64>(secondary_ptr, secondary);
        let it = env.db_idx_double_upperbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);
        return new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
    }

    upperBoundEx(secondary: SecondaryValue): IDXF64ReturnValue {
        assert(secondary.type == SecondaryType.F64, "upperBoundEx:bad secondary value");
        let primary_ptr = __alloc(sizeof<u64>());
        let secondary_ptr = __alloc(sizeof<f64>());
        store<u64>(secondary_ptr, secondary.value[0]);
        let it = env.db_idx_double_upperbound(this.code, this.scope, this.table, secondary_ptr, primary_ptr);

        let iterator = new SecondaryIterator(it, load<u64>(primary_ptr), this.dbIndex);
        return new IDXF64ReturnValue(iterator, load<f64>(secondary_ptr));
    }

    end(): SecondaryIterator {
        let it = env.db_idx_double_end(this.code, this.scope, this.table);
        return new SecondaryIterator(it, 0, this.dbIndex);
    }
}

