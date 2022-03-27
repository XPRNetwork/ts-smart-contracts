import { Packer } from "./serializer";

export function calcPackedVarUint32Length(val: u32): usize {
    let n: u32 = 0;
    while (true) {
        val >>= 7;
        n += 1;
        if (val <= 0) {
            break;
        }
    }
    return n;
}

export class VarInt32 implements Packer {
    pack(): u8[] {
        return new Array<u8>();
    }

    unpack(data: u8[]): usize {
        return 0;
    }

    getSize(): usize {
        return 0;
    }
}

export class VarUint32 implements Packer {
    constructor(
        public n: u32 = 0,
    ){}

    pack(): u8[] {
        let val = this.n;
        let result = new Array<u8>();
        while (true) {
            let b = <u8>(val & 0x7f);
            val >>= 7;
            if (val > 0) {
                b |= <u8>(1 << 7);
            }
            result.push(b);
            if (val <= 0) {
                break;
            }
        }
        return result;
    }

    unpack(val: u8[]): usize {
        let by: u32 = 0;
        let value: u32 = 0;
        let length: u32 = 0;
        for (let i=0; i<val.length; i++) {
            let b = val[i];
            value |= <u32>(b & 0x7f) << by;
            by += 7;
            length += 1;
            if ((b & 0x80) == 0) {
                break;
            }
        }
        this.n = value;
        return length;
    }

    getSize(): usize {
        return calcPackedVarUint32Length(this.n);
    }

    @inline @operator('==')
    static eq(a: VarUint32, b: VarUint32): bool {
        return a.n == b.n;
    }
}
