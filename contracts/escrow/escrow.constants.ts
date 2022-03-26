import { ActionWrapper, Name, packer, Table } from "as-chain"

// Contract
export const escrow = Name.fromString("escrow")

// Tables
export const escrows = Name.fromString("escrows")
export const accounts = Name.fromString("accounts")
export const escrowglobal = Name.fromString("escrowglobal")

// Actions
export const startescrow = new ActionWrapper(Name.fromString("startescrow"));
export const fillescrow = new ActionWrapper(Name.fromString("fillescrow"));
export const cancelescrow = new ActionWrapper(Name.fromString("cancelescrow"));
export const logescrow = new ActionWrapper(Name.fromString("logescrow"));

// Status
export namespace ESCROW_STATUS {
    export const START = 'start';
    export const FILL = 'fill';
    export const CANCEL = 'cancel';
}
export type ESCROW_STATUS = string;

// Include
@packer
class empty extends Table { constructor() { super(); } }