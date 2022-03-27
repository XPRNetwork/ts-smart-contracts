import { ActionWrapper, Name, packer, Table } from "as-chain"

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