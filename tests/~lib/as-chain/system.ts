import * as env from "./env";
import { TimePoint } from "./time";

export function assert(test: bool, msg: string): void {
    let s1 = String.UTF8.encode(msg, true);
    let dv = new DataView(s1);
    let _test = test ? 1 : 0;
    env.eosio_assert(_test, dv.dataStart);
}

export function check(test: bool, msg: string): void {
    assert(test, msg);
}

export function currentTimePoint(): TimePoint {
    return new TimePoint(env.current_time());
}

export function currentTime(): u64 {
    return currentTimePoint().timeSinceEpoch()
}

export function currentTimeMs(): u64 {
    return currentTimePoint().msSinceEpoch()
}

export function currentTimeSec(): u32 {
    return currentTimePoint().secSinceEpoch()
}
