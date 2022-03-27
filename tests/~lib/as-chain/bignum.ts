import { i128, u128, u256 } from "as-bignum";
import { Encoder, Decoder, Packer } from "./serializer";

export class I128 extends i128 implements Packer {
    pack(): u8[] {
        let enc = new Encoder(16);
        enc.packNumber<u64>(this.lo);
        enc.packNumber<i64>(this.hi);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.lo = dec.unpackNumber<u64>();
        this.hi = dec.unpackNumber<i64>();
        return 16;
    }

    getSize(): usize {
        return 16;
    }
}

export class U128 extends u128 implements Packer {
    pack(): u8[] {
        let enc = new Encoder(16);
        enc.packNumber<u64>(this.lo);
        enc.packNumber<u64>(this.hi);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.lo = dec.unpackNumber<u64>();
        this.hi = dec.unpackNumber<u64>();
        return 16;
    }

    getSize(): usize {
        return 16;
    }

    @inline @operator('+')
    static add(a: U128, b: U128): U128 {
        let ret = u128.add(a, b);
        return new U128(ret.lo, ret.hi);
    }
  
    @inline @operator('-')
    static sub(a: U128, b: U128): U128 {
        let ret = u128.sub(a, b);
        return new U128(ret.lo, ret.hi);
    }
  
    // mul: u128 x u128 = u128
    @inline @operator('*')
    static mul(a: U128, b: U128): U128 {
        let ret = u128.mul(a, b);
        return new U128(ret.lo, ret.hi);
    }
  
    @inline @operator('/')
    static div(a: U128, b: U128): U128 {
        let ret = u128.div(a, b);
        return new U128(ret.lo, ret.hi);
    }
  
    @inline @operator('%')
    static rem(a: U128, b: U128): U128 {
        let ret = u128.rem(a, b);
        return new U128(ret.lo, ret.hi);
    }
}

export class U256 extends u256 implements Packer {
    pack(): u8[] {
        let enc = new Encoder(32);
        enc.packNumber<u64>(this.lo1);
        enc.packNumber<u64>(this.lo2);
        enc.packNumber<u64>(this.hi1);
        enc.packNumber<u64>(this.hi2);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.lo1 = dec.unpackNumber<u64>();
        this.lo2 = dec.unpackNumber<u64>();
        this.hi1 = dec.unpackNumber<u64>();
        this.hi2 = dec.unpackNumber<u64>();
        return 32;
    }

    getSize(): usize {
        return 32;
    }
}
