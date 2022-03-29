import { ActionWrapper, Name, packer, Table } from "as-chain"

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
export const createcol = new ActionWrapper(Name.fromString("createcol"))

// Constants
export const MAX_MARKET_FEE: f64 = 0.15;
export const RESERVED: u64 = 4;

// Include
@packer
class kv_contants extends Table { constructor() { super(); } }