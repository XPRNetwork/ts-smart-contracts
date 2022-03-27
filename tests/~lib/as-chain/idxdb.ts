import { U128, U256 } from "./bignum";
import { Float128 } from "./float128";
import { check } from "./system";

export class SecondaryIterator {
    constructor(
        public i: i32,
        public primary: u64,
        public dbIndex: u32) {
    }

    isOk(): bool {
        return this.i >= 0;
    }

    isEnd(): bool {
        return this.i == -2;
    }
}

export enum SecondaryType {
    U64,
    U128,
    U256,
    F64,
    F128,
}

export class SecondaryValue {
    constructor(
        public type: SecondaryType,
        public value: Array<u64>) {
    }
}

export function newSecondaryValue_double<T extends number>(value: T): SecondaryValue {
    let arr = new Array<u64>(sizeof<T>()/8);
    arr[0] = value;
    return new SecondaryValue(SecondaryType.F64, arr);
}

export function newSecondaryValue_u64(value: u64): SecondaryValue {
    let arr = new Array<u64>(1);
    arr[0] = value;
    return new SecondaryValue(SecondaryType.U64, arr);
}

export function newSecondaryValue_U128(value: U128): SecondaryValue {
    let arr = new Array<u64>(2);
    let buffer = changetype<ArrayBufferView>(arr).dataStart;
    store<u64>(buffer, value.lo);
    store<u64>(buffer + 8, value.hi);
    return new SecondaryValue(SecondaryType.U128, arr);
}

export function newSecondaryValue_U256(value: U256): SecondaryValue {
    let arr = new Array<u64>(4);
    let dataStart = arr.dataStart;
    store<u64>(dataStart, value.lo1);
    store<u64>(dataStart + 8, value.lo2);
    store<u64>(dataStart + 16, value.hi1);
    store<u64>(dataStart + 24, value.hi2);
    return new SecondaryValue(SecondaryType.U256, arr);
}

export function newSecondaryValue_f64(value: f64): SecondaryValue {
    let arr = new Array<u64>(1);
    store<f64>(arr.dataStart, value);
    return new SecondaryValue(SecondaryType.F64, arr);
}

export function newSecondaryValue_Float128(value: Float128): SecondaryValue {
    let arr = new Array<u64>(2);
    store<u64>(arr.dataStart, value.data[0]);
    store<u64>(arr.dataStart + 8, value.data[1]);
    return new SecondaryValue(SecondaryType.F128, arr);
}

export function getSecondaryValue_u64(value: SecondaryValue): u64 {
    check(value.type == SecondaryType.U64, "secondary must be a u64 value");
    return value.value[0];
}

export function getSecondaryValue_U128(value: SecondaryValue): U128 {
    check(value.type == SecondaryType.U128, "secondary must be a U128 value");
    return new U128(value.value[0], value.value[1]);
}

export function getSecondaryValue_U256(value: SecondaryValue): U256 {
    check(value.type == SecondaryType.U256, "secondary must be a U256 value");
    return new U256(value.value[0], value.value[1], value.value[2], value.value[3]);
}

export function getSecondaryValue_f64(value: SecondaryValue): f64 {
    check(value.type == SecondaryType.F64, "secondary must be a f64 value");
    return load<f64>(value.value.dataStart);
}

export function getSecondaryValue_Float128(value: SecondaryValue): Float128 {
    check(value.type == SecondaryType.F128, "secondary must be a Float128 value");
    return new Float128(value.value[0], value.value[1])
}

export class SecondaryReturnValue {
    constructor(
        public i: SecondaryIterator,
        public value: SecondaryValue) {
    }
}

export abstract class IDXDB {
    constructor(
        public code: u64,
        public scope: u64,
        public table: u64,
        public dbIndex: u32) {
    }

    abstract storeEx(id: u64, secondary: SecondaryValue, payer: u64): SecondaryIterator;
    abstract updateEx(iterator: SecondaryIterator, secondary: SecondaryValue, payer: u64): void;
    abstract remove(iterator: SecondaryIterator): void;
    abstract findPrimaryEx(primary: u64): SecondaryReturnValue;
}
