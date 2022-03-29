import { ActionWrapper, Name, packer, Table } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const balance = Name.fromString("balance")

// Tables
export const balances = Name.fromString("balances")

// Actions
export const withdraw = ActionWrapper.fromString("withdraw")
export const transfer = ActionWrapper.fromString("transfer")

// External
export const atomicassets = Name.fromString("atomicassets");

// Include
@packer
class balance_constants extends Table { constructor() { super(); } }