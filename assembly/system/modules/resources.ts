import { ActionData, InlineAction, Name, PermissionLevel, EMPTY_NAME } from "../..";
import { PROTON_USER_CONTRACT } from "../constants";

const NEWACCRES_ACTION = new InlineAction<NewAccountResources>("newaccres")

@packer
class NewAccountResources extends ActionData {
    constructor (
        public account: Name = EMPTY_NAME,
    ) {
        super();
    }
}

export function sendNewAccRes(contract: Name, account: Name): void {
    const action = NEWACCRES_ACTION.act(PROTON_USER_CONTRACT, new PermissionLevel(contract))
    const actionParams = new NewAccountResources(account)
    action.send(actionParams)
}
