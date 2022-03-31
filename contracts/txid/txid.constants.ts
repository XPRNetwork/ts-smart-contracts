import { ActionWrapper, Name } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const txid = Name.fromString("txid")

// Tables
export const kvs = Name.fromString("kvs")

// Actions
export const getsizeandid = ActionWrapper.fromString("getsizeandid")
export const readaction = ActionWrapper.fromString("readaction")