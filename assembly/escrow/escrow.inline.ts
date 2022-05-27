import { Name, Table, PermissionLevel, InlineAction } from ".."
import { Escrow } from "./escrow.tables";

export namespace ESCROW_STATUS {
    export const START = 'start';
    export const FILL = 'fill';
    export const CANCEL = 'cancel';
}
export type ESCROW_STATUS = string;

/* LogEscrow is a table that contains a single escrow and its status */
@packer
export class LogEscrow extends Table {
    constructor (
        public escrow: Escrow = new Escrow(),
        public status: string = "",
    ) {
        super();
    }
}

/**
 * Send a logescrow action to the blockchain
 * @param {Name} contract - Name of the contract that is sending the log
 * @param {Escrow} escrow - Escrow
 * @param {string} status - The status of the escrow.
 */
export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void {
    const LOGESCROW = new InlineAction<LogEscrow>("logescrow")
    const action = LOGESCROW.act(contract, new PermissionLevel(contract))
    const actionParams = new LogEscrow(escrow, status)
    action.send(actionParams)
}