import { ActionWrapper, Name, packer, Table } from "as-chain"

/**
 * The name of the constant and the string must be exactly the same
 * for decorators to utilize it correctly
 */

// Contract
export const escrow = Name.fromString("escrow")

// Tables
export const escrows = Name.fromString("escrows")
export const accounts = Name.fromString("accounts")
export const escrowglobal = Name.fromString("escrowglobal")

// Actions
export const startescrow = ActionWrapper.fromString("startescrow");
export const fillescrow = ActionWrapper.fromString("fillescrow");
export const cancelescrow = ActionWrapper.fromString("cancelescrow");
export const logescrow = ActionWrapper.fromString("logescrow");

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