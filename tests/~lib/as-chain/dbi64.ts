import * as env from "./env";
import {printString} from "./debug";
import {Packer} from "./serializer";

export function say_hello(): void {
    printString("hello,world from dbi64");
}

export interface PrimaryValue extends Packer {
    getPrimaryValue(): u64;
}

export const UNKNOWN_PRIMARY_KEY: u64 = 0xffffffffffffffff

export class PrimaryIterator {
    constructor(
        public i: i32,
        public primary: u64,
    ) {}

    isOk(): bool {
        return this.i >= 0;
    }

    isEnd(): bool {
        return this.i == -2;
    }
}

export class DBI64 {
    constructor(
        public code: u64,
        public scope: u64,
        public table: u64) {
    }

    store(id: u64, data: u8[], payer: u64): PrimaryIterator {
        let data_ptr = data.dataStart;
        let i = env.db_store_i64(this.scope, this.table, payer, id, data_ptr, data.length );
        return new PrimaryIterator(i, id);
    }

    // export declare function db_update_i64(iterator: i32, payer: u64, data: usize, len: usize): void
    update(iterator: PrimaryIterator, payer: u64, data: u8[]): void {
        let data_ptr = data.dataStart;
        env.db_update_i64(iterator.i, payer, data_ptr, data.length);
    }

    // export declare function db_remove_i64(iterator: i32): void
    remove(iterator: i32): void {
        env.db_remove_i64(iterator);
    }

    // export declare function db_get_i64(iterator: i32, data: usize, len: usize): i32
    get(iterator: PrimaryIterator): u8[] {
        let size = env.db_get_i64(iterator.i, 0, 0);
        if (size == 0) {
            return [];
        }
        let arr = new Array<u8>(size);
        let ptr = arr.dataStart;
        env.db_get_i64(iterator.i, ptr, size);
        return arr;
    }

    // export declare function db_next_i64(iterator: i32, primary_ptr: usize): i32
    next(iterator: i32): PrimaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let itNext = env.db_next_i64(iterator, primary_ptr);
        return new PrimaryIterator(itNext, load<u64>(primary_ptr));
    }

    // export declare function db_previous_i64(iterator: i32, primary_ptr: usize): i32
    previous(iterator: i32): PrimaryIterator {
        let primary_ptr = __alloc(sizeof<u64>());
        let itNext = env.db_previous_i64(iterator, primary_ptr);
        return new PrimaryIterator(itNext, load<u64>(primary_ptr));
    }

    // export declare function db_find_i64(code: u64, scope: u64, table: u64, id: u64): i32
    find(id: u64): PrimaryIterator {
        let i = env.db_find_i64(this.code, this.scope, this.table, id);
        if (i >= 0) {
            return new PrimaryIterator(i, id);
        }
        return new PrimaryIterator(i, id);
    }

    // export declare function db_lowerbound_i64(code: u64, scope: u64, table: u64, id: u64): i32
    lowerBound(id: u64): PrimaryIterator {
        let i = env.db_lowerbound_i64(this.code, this.scope, this.table, id);
        return new PrimaryIterator(i, UNKNOWN_PRIMARY_KEY);
    }

    // export declare function db_upperbound_i64(code: u64, scope: u64, table: u64, id: u64): i32
    upperBound(id: u64): PrimaryIterator {
        let i = env.db_upperbound_i64(this.code, this.scope, this.table, id);
        return new PrimaryIterator(i, UNKNOWN_PRIMARY_KEY);
    }

    // export declare function db_end_i64(code: u64, scope: u64, table: u64): i32
    end(): PrimaryIterator {
        let i = env.db_end_i64(this.code, this.scope, this.table);
        return new PrimaryIterator(i, UNKNOWN_PRIMARY_KEY);
    }
}

