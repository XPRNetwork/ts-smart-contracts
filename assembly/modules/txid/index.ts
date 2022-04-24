import { Checksum256, transactionSize, readTransaction, check, sha256 } from "../..";

export function getTransactionId(): Checksum256 {
    const size = transactionSize()
    const buffer = new Array<u8>(<i32>size);
    const read = readTransaction(buffer)
    check(size == read, "readTransaction failed");
    return sha256(buffer)
}