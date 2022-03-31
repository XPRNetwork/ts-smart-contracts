import { ActionWrapper, Name } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const atomicassets = Name.fromString("atomicassets")

// Tables
export const collections = Name.fromString("collections")
export const config = Name.fromString("config")

// Actions
export const createcol = ActionWrapper.fromString("createcol")
export const setcolformat = ActionWrapper.fromString("setcolformat")
export const deserialize1 = ActionWrapper.fromString("deserialize1")

// Constants
export const MAX_MARKET_FEE: f64 = 0.15;
export const RESERVED: u64 = 4;