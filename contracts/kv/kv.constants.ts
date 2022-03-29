import { ActionWrapper, Name, packer, Table } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const kv = Name.fromString("kv")

// Tables
export const kvs = Name.fromString("kvs")

// Actions
export const updatevalues = ActionWrapper.fromString("updatevalues")
export const removekeys = ActionWrapper.fromString("removekeys")

// Include
@packer
class kv_contants extends Table { constructor() { super(); } }