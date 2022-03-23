import { ActionWrapper, Name, packer, Table } from "as-chain"

// Contract
export const balance = Name.fromString("balance")

// Tables
export const accounts = Name.fromString("accounts")

// Actions
export const withdraw = new ActionWrapper(Name.fromString("withdraw"))
export const transfer = new ActionWrapper(Name.fromString("transfer"))

// External
export const atomicassets = Name.fromString("atomicassets");

// Include
@packer
class constants extends Table { constructor() { super(); } }