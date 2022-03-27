import { check } from "./system";
import { Encoder, Decoder, Packer } from "./serializer";

export class Microseconds implements Packer {
    constructor(
        public _count: i64 = 0
    ) {}

    static maximum(): Microseconds {
        return new Microseconds(0x7fffffffffffffff)
    }

	toTimePoint(): TimePoint {
		return new TimePoint(this._count)
	}

    count(): i64 {
        return this._count;
    }

    toString(): string {
        return this._count.toString()
    }

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        enc.packNumber<u64>(this._count);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this._count = dec.unpackNumber<u64>();
        return dec.getPos();
    }

    getSize(): usize {
        return 8;
    }

    @inline @operator('+')
    static add(a: Microseconds, b: Microseconds): Microseconds {
        return new Microseconds(a._count + b._count);
    }

    @inline @operator('-')
    static sub(a: Microseconds, b: Microseconds): Microseconds {
        return new Microseconds(a._count - b._count);
    }

    @inline @operator('*')
    static mul(a: Microseconds, b: Microseconds): Microseconds {
        return new Microseconds(a._count * b._count);
    }

    @inline @operator('/')
    static div(a: Microseconds, b: Microseconds): Microseconds {
        return new Microseconds(a._count / b._count);
    }

    @inline @operator('==')
    static eq(a: Microseconds, b: Microseconds): bool {
      return a._count == b._count;
    }

    @inline @operator('!=')
    static neq(a: Microseconds, b: Microseconds): bool {
      return a._count != b._count;
    }

    @inline @operator('>')
    static gt(a: Microseconds, b: Microseconds): bool {
      return a._count > b._count;
    }

    @inline @operator('>=')
    static gte(a: Microseconds, b: Microseconds): bool {
      return a._count >= b._count;
    }

    @inline @operator('<')
    static lt(a: Microseconds, b: Microseconds): bool {
      return a._count < b._count;
    }

    @inline @operator('<=')
    static lte(a: Microseconds, b: Microseconds): bool {
      return a._count <= b._count;
    }

    toSeconds(): i64 {
        return this._count / 1000000;
    }
}

export function seconds(s: i64): Microseconds {
    return new Microseconds(s * 1000000)
}

export function milliseconds(s: i64): Microseconds {
    return new Microseconds(s * 1000)
}

export function minutes(m: i64): Microseconds {
    return seconds(60 * m)
}

export function hours(h: i64): Microseconds {
    return minutes(60 * h)
}

export function days(d: i64): Microseconds {
    return hours(24 * d)
}


export class TimePoint implements Packer {
    public elapsed: Microseconds = new Microseconds()
    
    constructor(
        elapsed: i64 = 0
    ) {
        this.elapsed = new Microseconds(elapsed)
    }

    timeSinceEpoch(): i64 {
        return this.elapsed._count;
    }

    msSinceEpoch(): i64 {
        return this.elapsed._count / 1000;
    }

    secSinceEpoch(): u32 {
        return <u32>(this.elapsed._count / 1000000);
    }

    toString(): string {
        return this.elapsed.toString()
    }

    toMicroseconds(): Microseconds {
        return this.elapsed;
    }

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        enc.pack(this.elapsed)
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        dec.unpack(this.elapsed);
        return dec.getPos();
    }

    getSize(): usize {
        return 8;
    }

    @inline @operator('>')
    static gt(a: TimePoint, b: TimePoint): bool {
      return a.elapsed._count > b.elapsed._count;
    }

    @inline @operator('>=')
    static gte(a: TimePoint, b: TimePoint): bool {
      return a.elapsed._count >= b.elapsed._count;
    }

    @inline @operator('<')
    static lt(a: TimePoint, b: TimePoint): bool {
      return a.elapsed._count < b.elapsed._count;
    }

    @inline @operator('<=')
    static lte(a: TimePoint, b: TimePoint): bool {
      return a.elapsed._count <= b.elapsed._count;
    }

    @inline @operator('==')
    static eq(a: TimePoint, b: TimePoint): bool {
      return a.elapsed._count == b.elapsed._count;
    }

    @inline @operator('!=')
    static neq(a: TimePoint, b: TimePoint): bool {
      return a.elapsed._count != b.elapsed._count;
    }

    @inline @operator('+')
    static add(a: TimePoint, b: TimePoint): TimePoint {
      return Microseconds.add(a.elapsed, b.elapsed).toTimePoint();
    }

    @inline @operator('-')
    static sub(a: TimePoint, b: TimePoint): TimePoint {
        return Microseconds.sub(a.elapsed, b.elapsed).toTimePoint();
    }

	@inline @operator('*')
    static mul(a: TimePoint, b: TimePoint): TimePoint {
      return Microseconds.mul(a.elapsed, b.elapsed).toTimePoint();
    }

    @inline @operator('/')
    static div(a: TimePoint, b: TimePoint): TimePoint {
        return Microseconds.div(a.elapsed, b.elapsed).toTimePoint();
    }
}


export class TimePointSec implements Packer {
    constructor(
        public utcSeconds: u32 = 0
    ) {}

    static fromTimePoint(t: TimePoint): TimePointSec {
        return new TimePointSec(t.secSinceEpoch())
    }

    static maximum(): TimePointSec {
        return new TimePointSec(0xffffffff);
    }

    static min(): TimePointSec {
        return new TimePointSec(0);
    }

    secSinceEpoch(): i32 {
        return this.utcSeconds;
    }

    toString(): string {
        return this.utcSeconds.toString()
    }

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        enc.packNumber<u32>(this.utcSeconds);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.utcSeconds = dec.unpackNumber<u32>();
        return dec.getPos();
    }

    getSize(): usize {
        return 4;
    }

    @inline @operator('>')
    static gt(a: TimePointSec, b: TimePointSec): bool {
      return a.utcSeconds > b.utcSeconds;
    }

    @inline @operator('>=')
    static gte(a: TimePointSec, b: TimePointSec): bool {
      return a.utcSeconds >= b.utcSeconds;
    }

    @inline @operator('<')
    static lt(a: TimePointSec, b: TimePointSec): bool {
      return a.utcSeconds < b.utcSeconds;
    }

    @inline @operator('<=')
    static lte(a: TimePointSec, b: TimePointSec): bool {
      return a.utcSeconds <= b.utcSeconds;
    }

    @inline @operator('==')
    static eq(a: TimePointSec, b: TimePointSec): bool {
      return a.utcSeconds == b.utcSeconds;
    }

    @inline @operator('!=')
    static neq(a: TimePointSec, b: TimePointSec): bool {
      return a.utcSeconds != b.utcSeconds;
    }

    @inline @operator('+')
    static add(a: TimePointSec, b: TimePointSec): TimePointSec {
      return new TimePointSec(a.utcSeconds + b.utcSeconds);
    }

    @inline @operator('-')
    static sub(a: TimePointSec, b: TimePointSec): TimePointSec {
        return new TimePointSec(a.utcSeconds - b.utcSeconds);
    }

    @inline @operator('*')
    static mul(a: TimePointSec, b: TimePointSec): TimePointSec {
        return new TimePointSec(a.utcSeconds * b.utcSeconds);
    }

    @inline @operator('/')
    static div(a: TimePointSec, b: TimePointSec): TimePointSec {
        return new TimePointSec(a.utcSeconds / b.utcSeconds);
    }
}


export class BlockTimestamp implements Packer {
    static blockIntervalMs: i32 = 500;
    static blockTimestampEpoch: i64 = 946684800000;

    constructor(
        public slot: u32 = 0
    ) {}

    static fromTimePoint(t: TimePoint): BlockTimestamp {
        const b = new BlockTimestamp()
        b.setTimePoint(t)
        return b
    }

    static fromTimePointSec(t: TimePointSec): BlockTimestamp {
        const b = new BlockTimestamp()
        b.setTimePointSec(t)
        return b
    }

    static maximum(): BlockTimestamp {
        return new BlockTimestamp(0xffff);
    }

    static min(): BlockTimestamp {
        return new BlockTimestamp(0);
    }

    next(): BlockTimestamp {
        check(u32.MAX_VALUE - this.slot >= 1, "block timestamp overflow" );
        const result = new BlockTimestamp(this.slot);
        result.slot += 1;
        return result
    }

    toTimePoint(): TimePoint {
        const ms = (this.slot * BlockTimestamp.blockIntervalMs) + BlockTimestamp.blockIntervalMs
        return new Microseconds(ms).toTimePoint()
    }

    setTimePoint(t: TimePoint): void {
        const microSinceEpoch = t.timeSinceEpoch().count();
        const msecSinceEpoch  = microSinceEpoch / 1000;
        this.slot = <u32>((msecSinceEpoch - BlockTimestamp.blockTimestampEpoch) / BlockTimestamp.blockIntervalMs)
    }

    setTimePointSec(t: TimePointSec): void {
        const secSinceEpoch = t.secSinceEpoch();
        this.slot = <u32>((secSinceEpoch * 1000 - BlockTimestamp.blockTimestampEpoch) / BlockTimestamp.blockIntervalMs);
    }

    toString(): string {
        return this.slot.toString()
    }

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        enc.packNumber<u32>(this.slot);
        return enc.getBytes();
    }

    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.slot = dec.unpackNumber<u32>();
        return dec.getPos();
    }

    getSize(): usize {
        return 4;
    }

    @inline @operator('>')
    static gt(a: BlockTimestamp, b: BlockTimestamp): bool {
      return a.slot > b.slot;
    }

    @inline @operator('>=')
    static gte(a: BlockTimestamp, b: BlockTimestamp): bool {
      return a.slot >= b.slot;
    }

    @inline @operator('<')
    static lt(a: BlockTimestamp, b: BlockTimestamp): bool {
      return a.slot < b.slot;
    }

    @inline @operator('<=')
    static lte(a: BlockTimestamp, b: BlockTimestamp): bool {
      return a.slot <= b.slot;
    }

    @inline @operator('==')
    static eq(a: BlockTimestamp, b: BlockTimestamp): bool {
      return a.slot == b.slot;
    }

    @inline @operator('!=')
    static neq(a: BlockTimestamp, b: BlockTimestamp): bool {
      return a.slot != b.slot;
    }
}