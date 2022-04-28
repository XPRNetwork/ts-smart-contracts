import { InlineAction, Name, PermissionLevel, ActionWrapper, Asset, Authority } from "..";

//------------------- Constants ------------------------------//
export const SYSTEM_CONTRACT = Name.fromString("eosio")
export const PROTON_USER_CONTRACT = Name.fromString("eosio.proton")

//------------------- Action Names ------------------------------//

// system
const NEWACCOUNT_ACTION = new ActionWrapper(Name.fromString("newaccount"))
const BUYRAMBYTES_ACTION = new ActionWrapper(Name.fromString("buyrambytes"))
const BUYRAM_ACTION = new ActionWrapper(Name.fromString("buyram"))
const SELLRAM_ACTION = new ActionWrapper(Name.fromString("sellram"))
const VOTEPRODUCER_ACTION = new ActionWrapper(Name.fromString("voteproducer"))
const UPDATEAUTH_ACTION = new ActionWrapper(Name.fromString("updateauth"))
const DELETEAUTH_ACTION = new ActionWrapper(Name.fromString("deleteauth"))
const LINKAUTH_ACTION = new ActionWrapper(Name.fromString("linkauth"))
const UNLINKAUTH_ACTION = new ActionWrapper(Name.fromString("unlinkauth"))

// user
const NEWACCRES_ACTION = new ActionWrapper(Name.fromString("newaccres"))

//------------------- Action Packers ------------------------------//

// system
@packer
export class NewAccount extends InlineAction {
    constructor (
        public creator: Name = new Name(),
        public name: Name = new Name(),
        public owner: Authority = new Authority(),
        public active: Authority = new Authority(),
    ) {
        super();
    }
}

@packer
export class BuyRamBytes extends InlineAction {
    constructor (
        public payer: Name = new Name(),
        public receiver: Name = new Name(),
        public bytes: u32 = 0,
    ) {
        super();
    }
}

@packer
export class BuyRam extends InlineAction {
    constructor (
        public payer: Name = new Name(),
        public receiver: Name = new Name(),
        public quantity: Asset = new Asset(),
    ) {
        super();
    }
}

@packer
export class SellRam extends InlineAction {
    constructor (
        public account: Name = new Name(),
        public bytes: i64 = 0,
    ) {
        super();
    }
}

@packer
class VoteProducer extends InlineAction {
    constructor (
        public voter: Name = new Name(),
        public proxy: Name = new Name(),
        public producers: Name[] = [],
    ) {
        super();
    }
}

@packer
class UpdateAuth extends InlineAction {
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
class DeleteAuth extends InlineAction {
    constructor (
        public account: Name = new Name(),
        public permision: Name = new Name(),
    ) {
        super();
    }
}

@packer
class LinkAuth extends InlineAction {
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
class UnlinkAuth extends InlineAction {
    constructor (
        public account: Name = new Name(),
        public code: Name = new Name(),
        public type: Name = new Name(),
    ) {
        super();
    }
}

// user
@packer
class NewAccountResources extends InlineAction {
    constructor (
        public account: Name = new Name(),
    ) {
        super();
    }
}

//------------------- Inline Actions ------------------------------//

// system
export function sendNewAccount(contract: Name, creator: Name, name: Name, owner: Authority, active: Authority): void {
    const action = NEWACCOUNT_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new NewAccount(creator, name, owner, active)
    action.send(actionParams)
}

export function sendBuyRamBytes(contract: Name, payer: Name, receiver: Name, bytes: u32): void {
    const action = BUYRAMBYTES_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new BuyRamBytes(payer, receiver, bytes)
    action.send(actionParams)
}

export function sendBuyRam(contract: Name, payer: Name, receiver: Name, quantity: Asset): void {
    const action = BUYRAM_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new BuyRam(payer, receiver, quantity)
    action.send(actionParams)
}

export function sendSellRam(contract: Name, owner: Name, bytes: i64): void {
    const action = SELLRAM_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SellRam(owner, bytes)
    action.send(actionParams)
}

export function sendVoteProducer(contract: Name, voter: Name, proxy: Name, producers: Name[]): void {
    const action = VOTEPRODUCER_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new VoteProducer(voter, proxy, producers)
    action.send(actionParams)
}

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

// user
function sendNewAccRes(contract: Name, account: Name): void {
    const action = NEWACCRES_ACTION.act(PROTON_USER_CONTRACT, new PermissionLevel(contract))
    const actionParams = new NewAccountResources(account)
    action.send(actionParams)
}

//------------------- Actions ------------------------------//

export function createNewAccount(contract: Name, creator: Name, name: Name, owner: Authority, active: Authority, ramBytes: u32): void {
    sendNewAccount(contract, creator, name, owner, active)
    sendBuyRamBytes(contract, creator, name, ramBytes)
    sendNewAccRes(contract, name)
}