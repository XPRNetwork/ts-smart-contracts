import { ActionWrapper, Name } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const token = Name.fromString("token")

// Tables
export const stat = Name.fromString("stat")
export const accounts = Name.fromString("accounts")

// Actions
export const create = ActionWrapper.fromString("create");
export const retire = ActionWrapper.fromString("retire");
export const transfer = ActionWrapper.fromString("transfer");
export const open = ActionWrapper.fromString("open");
export const close = ActionWrapper.fromString("close");
export const issue = ActionWrapper.fromString("issue");