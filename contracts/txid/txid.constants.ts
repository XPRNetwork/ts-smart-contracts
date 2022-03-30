import { ActionWrapper, Name, Table } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const txid = Name.fromString("txid")

// Tables
export const kvs = Name.fromString("kvs")

// Actions
export const getsizeandid = new ActionWrapper(Name.fromString("getsizeandid"))
export const readaction = new ActionWrapper(Name.fromString("readaction"))

// Include
@packer
class txid_contants extends Table { constructor() { super(); } }