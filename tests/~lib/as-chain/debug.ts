import * as env from "./env";
import { I128, U128 } from "./bignum";
import { Float128 } from "./float128";
import { Name } from "./name"

export function printui(n: u64): void {
    env.printui(n);
}

export function prints(s: string): void {
    print(s);
}

export function printi(n: i64): void {
    env.printi(n);
}

export function printString(s: string): void {
    let s1 = String.UTF8.encode(s);
    let dv = new DataView(s1);
    env.prints_l(dv.dataStart, dv.byteLength);
}

export function print(s: string): void {
    printString(s);
}

export function printArray(data: u8[]): void {
    let data_buf_in = changetype<ArrayBufferView>(data).dataStart;
    env.prints(data_buf_in);
}

export function printHex(data: u8[]): void {
    let data_ptr = changetype<ArrayBufferView>(data).dataStart;
    env.printhex(data_ptr, data.length);
}

export function printI128(value: I128): void {
    let arr: u64[] = [value.lo, value.hi];
    env.printi128(arr.dataStart);
}

export function printU128(value: U128): void {
    let arr: u64[] = [value.lo, value.hi];
    env.printi128(arr.dataStart);
}

export function printsf(value: f32): void {
    env.printsf(value);
}

export function printdf(value: f64): void {
    env.printdf(value);
}

export function printqf(value: Float128): void {
    env.printqf(value.data.dataStart);
}

export function printn(name: Name): void {
    env.printn(name.N);
}
