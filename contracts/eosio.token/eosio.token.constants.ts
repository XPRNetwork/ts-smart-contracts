import { ActionWrapper, Name, packer, Table } from "as-chain"

// Contract
export const token = Name.fromString("token")

// Tables
export const stat = Name.fromString("stat")
export const accounts = Name.fromString("accounts")

// Actions
export const create = new ActionWrapper(Name.fromString("create"));
export const retire = new ActionWrapper(Name.fromString("retire"));
export const transfer = new ActionWrapper(Name.fromString("transfer"));
export const open = new ActionWrapper(Name.fromString("open"));
export const close = new ActionWrapper(Name.fromString("close"));
export const issue = new ActionWrapper(Name.fromString("issue"));

// Include
@packer
class empty extends Table { constructor() { super(); } }