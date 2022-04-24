import { Checksum256 } from "..";

export function rngChecksumToU64(randomChecksum: Checksum256, maxValue: u64): u64 {
    const byteArray: u8[] = randomChecksum.data;

    let randomInt: u64 = 0;
    for (let i = 0; i < 8; i++) {
        randomInt <<= 8;
        randomInt |= <u64>(byteArray[i]);
    }

    return randomInt % maxValue
}