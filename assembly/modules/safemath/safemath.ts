import { check, U128 } from "../..";

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

    static mul(_x: u64, _y: u64): U128 {
        const x = new U128(_x)
        const y = new U128(_y)
        const z: U128 = U128.mul(x, y);
        check(_y == 0 || U128.eq(U128.div(z, y), x), "SafeMath Mul Overflow");
        return z;
    }
    
    static div(x: u64, y: u64): u64 {
        check(y > 0, "SafeMath Div Overflow");
        return x / y;
    }
}