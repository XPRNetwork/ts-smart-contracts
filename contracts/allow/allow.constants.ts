import { ActionWrapper, Name } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const allow = Name.fromString("allow")

// Tables
export const allowglobals = Name.fromString("allowglobals")
export const allowedactor = Name.fromString("allowedactor")
export const allowedtoken = Name.fromString("allowedtoken")

// Actions
export const setglobals = ActionWrapper.fromString("setglobals")
export const setactor = ActionWrapper.fromString("setactor")
export const settoken = ActionWrapper.fromString("settoken")