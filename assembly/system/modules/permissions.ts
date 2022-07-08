import { InlineAction, ActionData, Name, PermissionLevel, Authority, EMPTY_NAME } from "../..";
import { SYSTEM_CONTRACT } from "../constants";

//------------------- Action Names ------------------------------//

const UPDATEAUTH_ACTION = new InlineAction<UpdateAuth>("updateauth")
const DELETEAUTH_ACTION = new InlineAction<DeleteAuth>("deleteauth")
const LINKAUTH_ACTION = new InlineAction<LinkAuth>("linkauth")
const UNLINKAUTH_ACTION = new InlineAction<UnlinkAuth>("unlinkauth")

@packer
class UpdateAuth extends ActionData {
    constructor (
        public account: Name = EMPTY_NAME,
        public permision: Name = EMPTY_NAME,
        public parent: Name = EMPTY_NAME,
        public auth: Authority = new Authority(),
    ) {
        super();
    }
}

@packer
class DeleteAuth extends ActionData {
    constructor (
        public account: Name = EMPTY_NAME,
        public permision: Name = EMPTY_NAME,
    ) {
        super();
    }
}

@packer
class LinkAuth extends ActionData {
    constructor (
        public account: Name = EMPTY_NAME,
        public code: Name = EMPTY_NAME,
        public type: Name = EMPTY_NAME,
        public requirement: Name = EMPTY_NAME,
    ) {
        super();
    }
}


@packer
class UnlinkAuth extends ActionData {
    constructor (
        public account: Name = EMPTY_NAME,
        public code: Name = EMPTY_NAME,
        public type: Name = EMPTY_NAME,
    ) {
        super();
    }
}

//------------------- Inline Actions ------------------------------//

export function sendUpdateAuth(contract: Name, account: Name, permission: string, parent: string, auth: Authority): void {
    const action = UPDATEAUTH_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new UpdateAuth(account, Name.fromString(permission), Name.fromString(parent), auth)
    action.send(actionParams)
}

export function sendDeleteAuth(contract: Name, account: Name, permission: string): void {
    const action = DELETEAUTH_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new DeleteAuth(account, Name.fromString(permission))
    action.send(actionParams)
}

export function sendLinkAuth(contract: Name, account: Name, code: Name, type: Name, requirement: Name): void {
    const action = LINKAUTH_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new LinkAuth(account, code, type, requirement)
    action.send(actionParams)
}

export function sendUnlinkAuth(contract: Name, account: Name, code: Name, type: Name): void {
    const action = UNLINKAUTH_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new UnlinkAuth(account, code, type)
    action.send(actionParams)
}

