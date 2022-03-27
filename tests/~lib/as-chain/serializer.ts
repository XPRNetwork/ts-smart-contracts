import { Name } from "./name";
import { memcpy } from "./env";
import { check } from "./system";

export interface Packer {
    pack(): u8[];
    unpack(data: u8[]): usize;
    getSize(): usize;
}

class Template implements Packer {
    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        return dec.getPos();
    }

    getSize(): usize {
        return 0;
    }
}

export class Encoder {
    buf: Array<u8>;
    pos: usize;
  
    constructor(bufferSize: usize) {
        this.buf = new Array<u8>(<i32>bufferSize);
    }

    checkPos(n: usize): void {
        check(this.pos + n <= <u32>this.buf.length, `checkPos: buffer overflow`);
    }
    
    incPos(n: usize): void {
        this.pos += n;
        check(this.pos <= <u32>this.buf.length, `incPos: buffer overflow`);
    }

    pack(ser: Packer): usize {
        let raw = ser.pack();
        return this.packBytes(raw);
    }

    packBytes(arr: u8[]): usize {
        let dataSize = arr.length;
        this.checkPos(dataSize);
        let src = arr.dataStart;
        let pos = this.pos;
        this.incPos(dataSize);
        let dest = this.buf.dataStart + pos;
        memcpy(dest, src, dataSize);
        return dataSize;
    }

    packNumberArray<T>(arr: T[]): usize {
        let lengthBytes = this.packLength(arr.length);
        let dataSize = sizeof<T>()*arr.length;
        let src = arr.dataStart;
        let pos = this.pos;
        this.incPos(dataSize);
        let dest = this.buf.dataStart + pos;
        memcpy(dest, src, dataSize);
        return lengthBytes + dataSize;
    }

    packNumber<T>(n: T): usize {
        let pos = this.pos;
        let size = sizeof<T>();
        this.incPos(size);
        store<T>(this.buf.dataStart + pos, n);
        return size;
    }

    packName(n: Name): usize {
        this.packNumber<u64>(n.N);
        return 8;
    }
    
    packLength(val: u32): usize {
        let length: u32 = 0;
        while (true) {
            let b = <u8>(val & 0x7f);
            val >>= 7;
            if (val > 0) {
                b |= <u8>(1 << 7);
            }
            this.packNumber<u8>(b);
            length += 1;
            if (val <= 0) {
                break;
            }
        }
        return length;
    }

    packString(s: string): usize {
        let utf8Str = String.UTF8.encode(s);
        let packedLength = this.packLength(utf8Str.byteLength);
        // let view = new DataView(utf8Str);
        let src = changetype<usize>(utf8Str);
        let dest = this.buf.dataStart + this.pos;
        this.incPos(utf8Str.byteLength);
        memcpy(dest, src, utf8Str.byteLength);
        return packedLength + utf8Str.byteLength;
    }

    packStringArray(arr: string[]): usize {
        let oldPos = this.pos;
        this.packLength(arr.length);
        for (let i=0; i<arr.length; i++) {
            this.packString(arr[i]);
        }
        return this.pos - oldPos;
    }

    packObjectArray<T>(arr: T[]): usize {
        let oldPos = this.pos;
        this.packLength(arr.length);
        for (let i=0; i<arr.length; i++) {
            this.pack(arr[i]);
        }
        return this.pos - oldPos;
    }    

    getBytes(): u8[] {
        return this.buf.slice(0, <i32>this.pos);
    }
}

export class Decoder {
    buf: u8[];
    pos: u32;
  
    constructor(buf: u8[]) {
        this.buf = buf;
        this.pos = 0;
    }
    
    remains(): u8[] {
        return this.buf.slice(this.pos, this.buf.length);
    }

    isEnd(): bool {
        return this.pos >= <u32>this.buf.length;
    }

    incPos(n: u32): void {
        this.pos += n;
        check(this.pos <= <u32>this.buf.length, "Decoder.incPos: buffer overflow");
    }

    getPos(): u32 {
        return this.pos;
    }

    unpack(ser: Packer): usize {
        let size = ser.unpack(this.remains());
        this.incPos(<u32>size);
        return size;
    }

    unpackNumber<T>(): T {
        let value = load<T>(this.buf.dataStart + this.pos);
        this.incPos(sizeof<T>());
        return value;
    }

    unpackName(): Name {
        let n = this.unpackNumber<u64>();
        return new Name(n);
    }

    unpackLength(): u32 {
        let by: u32 = 0;
        let value: u32 = 0;
        let length: u32 = 0;
        while (true) {
            let b = this.unpackNumber<u8>();
            value |= <u32>(b & 0x7f) << by;
            by += 7;
            length += 1;
            if ((b & 0x80) == 0) {
                break;
            }
        }
        return value;
    }

    unpackBytes(size: usize): u8[] {
        let arr = new Array<u8>(<i32>size);
        let dest = arr.dataStart;
        let src = this.buf.dataStart + this.pos;
        memcpy(dest, src, size);
        this.incPos(<u32>size);
        return arr;
    }

    unpackNumberArray<T>(): T[] {
        let oldPos = this.pos;
        let length = this.unpackLength();
        let arr = new Array<T>(length);

        let copySize = length * sizeof<T>();
        let src = this.buf.dataStart + this.pos;
        memcpy(arr.dataStart, src, copySize);
        this.incPos(copySize);
        return arr;
    }

    unpackString(): string {
        let length = this.unpackLength();
        let rawStr = this.buf.slice(this.pos, this.pos + length);
        this.incPos(length);
        return String.UTF8.decode(rawStr.buffer);
    }

    unpackStringArray(): string[] {
        let length = this.unpackLength();
        let arr = new Array<string>(length);
        for (let i=0; i< <i32>length; i++) {
            arr[i] = this.unpackString();
        }
        return arr;
    }
}
