import { Packer, Encoder } from "./serializer"
import { memcpy } from "./env"
import { check } from "./system";

export class Float128 implements Packer {
    data: Array<u64>;
    constructor(lo: u64 = 0, hi: u64 = 0) {
        this.data = new Array<u64>(2);
        this.data[0] = lo;
        this.data[1] = hi;
    }

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        memcpy(enc.buf.dataStart, this.data.dataStart, 16);
        enc.incPos(16);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        check(data.length >= 16, "bad data");
        memcpy(this.data.dataStart, data.dataStart, 16);
        return 16;
    }

    getSize(): usize {
        return 16;
    }

    @inline @operator('==')
    static eq(a: Float128, b: Float128): bool {
        return a.data[0] == b.data[0] && a.data[1] == b.data[1];
    }

    @inline @operator('!=')
    static ne(a: Float128, b: Float128): bool {
        return !(a.data[0] == b.data[0] && a.data[1] == b.data[1]);
    }
}
