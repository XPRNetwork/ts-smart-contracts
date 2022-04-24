import { u128 } from "as-bignum";
import { check } from "../..";

export class SafeMath {
    static add(x: u64, y: u64): u64 {
        const z: u64 = x + y;
        check(z >= x, "SafeMath Add Overflow");
        return z;
    }

    static sub(x: u64, y: u64): u64 {
        const z: u64 = x - y;
        check(z <= x, "SafeMath Sub Overflow");
        return z;
    }

    static mul(_x: u64, _y: u64): u128 {
        const x = new u128(_x)
        const y = new u128(_y)
        const z: u128 = u128.mul(x, y);
        check(_y == 0 || u128.eq(u128.div(z, y), x), "SafeMath Mul Overflow");
        return z;
    }
    
    static div(x: u64, y: u64): u64 {
        check(y > 0, "SafeMath Div Overflow");
        return x / y;
    }
}