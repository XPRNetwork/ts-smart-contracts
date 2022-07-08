import { ActionData, InlineAction, Name, Authority, PermissionLevel, EMPTY_NAME } from "../..";
import { SYSTEM_CONTRACT } from "../constants";
import { sendBuyRamBytes } from "./ram";
import { sendNewAccRes } from "./resources";

const NEWACCOUNT_ACTION = new InlineAction<NewAccount>("newaccount")

@packer
export class NewAccount extends ActionData {
    constructor (
        public creator: Name = EMPTY_NAME,
        public name: Name = EMPTY_NAME,
        public owner: Authority = new Authority(),
        public active: Authority = new Authority(),
    ) {
        super();
    }
}

export function sendNewAccount(contract: Name, creator: Name, name: Name, owner: Authority, active: Authority): void {
    const action = NEWACCOUNT_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new NewAccount(creator, name, owner, active)
    action.send(actionParams)
}


export function createNewAccount(contract: Name, creator: Name, name: Name, owner: Authority, active: Authority, ramBytes: u32): void {
    sendNewAccount(contract, creator, name, owner, active)
    sendBuyRamBytes(contract, creator, name, ramBytes)
    sendNewAccRes(contract, name)
}

