import { Decoder, Packer } from "./serializer";
import { check } from "./system"
const charToSymbol = (c: u16): u16 => {
    if (c >= 97 && c <= 122) {// c >= 'a' && c <= 'z'
        return (c - 97) + 6;
    }

    if (c >= 49 && c <= 53) {// c >= '1' && c <= '5'
        return (c - 49) + 1;
    }

    if (c == 46) { // c == '.'
        return 0;
    }
    return 0xffff;
};

export function S2N(s: string): u64 {
    let value: u64 = 0;
    check(s.length <= 13, `Invalid name: ${s}`);
    for (let i=0; i<=12; i++) {
        let c: u64 = 0;
        if (i < s.length && i <= 12) {
            c = <u64>charToSymbol(<u16>s.charCodeAt(i));
            if (c==0xffff) {
                check(false, `invalid name ${s}`);
                return 0;
            }
        }
        if (i < 12) {
            c &= 0x1f;
            c <<= 64 - 5*(i+1);
        } else {
            c &= 0x0f;
        }
        value |= c;
    }
    return value;
}

// ".12345abcdefghijklmnopqrstuvwxyz"
const charmap: u8[] = [0x2e,0x31,0x32,0x33,0x34,0x35,0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6a,0x6b,0x6c,0x6d,0x6e,0x6f,0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77,0x78,0x79,0x7a];

export function N2S(value: u64): string {
    // 13 dots
    let str = new Array<u8>(13);
    let tmp: u64 = value;
    for (let i=0; i<=12; i++) {
        let c: u8;
        if (i == 0) {
            c = charmap[<i32>(tmp&0x0f)];
        } else {
            c = charmap[<i32>(tmp&0x1f)];
        }
        str[12-i] = c;
        if (i==0) {
            tmp >>= 4;
        } else {
            tmp >>= 5;
        }
    }

    let i = str.length - 1;
    for (; i >= 0; i--) {
        if (str[i] != 46) {// 46 '.'
            break;
        }
    }
    return String.UTF8.decode(str.slice(0, i+1).buffer);
}

export class Name implements Packer {
    N: u64;

    @inline constructor(n: u64=0) {
        this.N = n;
    }

    @inline static fromString(s: string): Name {
        return new Name(S2N(s));
    }

    @inline static fromU64(n: u64): Name {
        return new Name(n);
    }

    toString(): string {
        return N2S(this.N);
    }

    pack(): u8[] {
        let ret = new Array<u8>(8);
        store<u64>(ret.dataStart, this.N);
        return ret;
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.N = dec.unpackNumber<u64>();
        return 8;
    }

    getSize(): usize {
        return 8;
    }

    @inline @operator('==')
    static eq(a: Name, b: Name): bool {
        return a.N == b.N;
    }

    @inline @operator('!=')
    static neq(a: Name, b: Name): bool {
        return a.N != b.N;
    }

    @inline @operator('<')
    static lt(a: Name, b: Name): bool {
        return a.N < b.N;
    }
  
    @inline @operator('>')
    static gt(a: Name, b: Name): bool {
        return a.N > b.N;
    }
  
    @inline @operator('<=')
    static lte(a: Name, b: Name): bool {
        return a.N <= b.N;
    }
  
    @inline @operator('>=')
    static gte(a: Name, b: Name): bool {
        return a.N >= b.N;
    }
}

export function nameToSuffix(name: Name): Name {
    let remainingBitsAfterLastActualDot: u32 = 0
    let tmp: u32 = 0

    for (let remainingBits: i32 = 59; remainingBits >= 4; remainingBits -=5) {
        // Get characters one-by-one in name in order from left to right (not including the 13th character)
        const c = (name.N >> remainingBits) & <u64>(0x1F);
        if (!c) { // if this character is a dot
            tmp = <u32>(remainingBits)
        } else { // if this character is not a dot
            remainingBitsAfterLastActualDot = tmp;
        }
    }

    const thirteenthCharacter: u64 = name.N & <u64>(0x0F)
    if(thirteenthCharacter) { // if 13th character is not a dot
        remainingBitsAfterLastActualDot = tmp;
    }

    if(remainingBitsAfterLastActualDot == 0) // there is no actual dot in the %name other than potentially leading dots
        return new Name(name.N);

    // At this point remaining_bits_after_last_actual_dot has to be within the range of 4 to 59 (and restricted to increments of 5).

    // Mask for remaining bits corresponding to characters after last actual dot, except for 4 least significant bits (corresponds to 13th character).
    const mask: u64 = (<u64>(1) << remainingBitsAfterLastActualDot) - 16;
    const shift: u32 =  64 - remainingBitsAfterLastActualDot;

    const nameValue = ((name.N & mask) << shift) + (thirteenthCharacter << (shift-1))
    return new Name(nameValue)
}