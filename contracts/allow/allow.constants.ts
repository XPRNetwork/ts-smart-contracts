import { ActionWrapper, Name, packer, Table } from "as-chain"

// Contract
export const allow = Name.fromString("allow")

// Tables
export const paused = Name.fromString("paused")
export const allowedactor = Name.fromString("allowedactor")
export const allowedtoken = Name.fromString("allowedtoken")

// Actions
export const setpaused = new ActionWrapper(Name.fromString("setpaused"))
export const allowactor = new ActionWrapper(Name.fromString("allowactor"))
export const blockactor = new ActionWrapper(Name.fromString("blockactor"))
export const allowtoken = new ActionWrapper(Name.fromString("allowtoken"))
export const blocktoken = new ActionWrapper(Name.fromString("blocktoken"))

// Include
@packer
class constants extends Table { constructor() { super(); } }