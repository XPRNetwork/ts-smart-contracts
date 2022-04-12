import { ActionWrapper, Name } from "../../assembly"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Actions
export const transfer = ActionWrapper.fromString("transfer")

// External
export const atomicassets = Name.fromString("atomicassets");