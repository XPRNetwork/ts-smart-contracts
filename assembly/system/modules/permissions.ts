import { InlineAction, ActionData, Name, PermissionLevel, Authority } from "../..";
import { SYSTEM_CONTRACT } from "../constants";

//------------------- Action Names ------------------------------//

const UPDATEAUTH_ACTION = new InlineAction<UpdateAuth>("updateauth")
const DELETEAUTH_ACTION = new InlineAction<DeleteAuth>("deleteauth")
const LINKAUTH_ACTION = new InlineAction<LinkAuth>("linkauth")
const UNLINKAUTH_ACTION = new InlineAction<UnlinkAuth>("unlinkauth")

@packer
class UpdateAuth extends ActionData {
    constructor (
        public account: Name = new Name(),
        public permision: Name = new Name(),
        public parent: Name = new Name(),
        public auth: Authority = new Authority(),
    ) {
        super();
    }
}

@packer
class DeleteAuth extends ActionData {
    constructor (
        public account: Name = new Name(),
        public permision: Name = new Name(),
    ) {
        super();
    }
}

@packer
class LinkAuth extends ActionData {
    constructor (
        public account: Name = new Name(),
        public code: Name = new Name(),
        public type: Name = new Name(),
        public requirement: Name = new Name(),
    ) {
        super();
    }
}


@packer
class UnlinkAuth extends ActionData {
    constructor (
        public account: Name = new Name(),
        public code: Name = new Name(),
        public type: Name = new Name(),
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

