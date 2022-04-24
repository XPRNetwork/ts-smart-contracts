import { Name, InlineAction, Symbol, Asset, ActionWrapper, PermissionLevel } from "..";
import { AtomicAttribute, AtomicFormat } from "./atomicdata";

//------------------- Constants ------------------------------//
export const MAX_MARKET_FEE: f64 = 0.15;
export const RESERVED: u64 = 4;
export const ATOMICASSETS_CONTRACT = Name.fromString("atomicassets")

//------------------- Action Names ------------------------------//
const ADMINCOLEDIT_ACTION = new ActionWrapper(Name.fromString("admincoledit"))
const SETVERSION_ACTION = new ActionWrapper(Name.fromString("setversion"))
const ADDCONFTOKEN_ACTION = new ActionWrapper(Name.fromString("addconftoken"))
const TRANSFER_ACTION = new ActionWrapper(Name.fromString("transfer"))
const CREATECOL_ACTION = new ActionWrapper(Name.fromString("createcol"))
const SETCOLDATA_ACTION = new ActionWrapper(Name.fromString("setcoldata"))
const ADDCOLAUTH_ACTION = new ActionWrapper(Name.fromString("addcolauth"))
const REMCOLAUTH_ACTION = new ActionWrapper(Name.fromString("remcolauth"))
const ADDNOTIFYACC_ACTION = new ActionWrapper(Name.fromString("addnotifyacc"))
const REMNOTIFYACC_ACTION = new ActionWrapper(Name.fromString("remnotifyacc"))
const SETmarket_fee_ACTION = new ActionWrapper(Name.fromString("setmarketfee"))
const FORBIDNOTIFY_ACTION = new ActionWrapper(Name.fromString("forbidnotify"))
const CREATESCHEMA_ACTION = new ActionWrapper(Name.fromString("createschema"))
const EXTENDSCHEMA_ACTION = new ActionWrapper(Name.fromString("extendschema"))
const CREATETEMPL_ACTION = new ActionWrapper(Name.fromString("createtempl"))
const LOCKTEMPLATE_ACTION = new ActionWrapper(Name.fromString("locktemplate"))
const MINTASSET_ACTION = new ActionWrapper(Name.fromString("mintasset"))
const SETASSETDATA_ACTION = new ActionWrapper(Name.fromString("setassetdata"))
const WITHDRAW_ACTION = new ActionWrapper(Name.fromString("withdraw"))
const BACKASSET_ACTION = new ActionWrapper(Name.fromString("backasset"))
const BURNASSET_ACTION = new ActionWrapper(Name.fromString("burnasset"))
const CREATEOFFER_ACTION = new ActionWrapper(Name.fromString("createoffer"))
const CANCELOFFER_ACTION = new ActionWrapper(Name.fromString("canceloffer"))
const ACCEPTOFFER_ACTION = new ActionWrapper(Name.fromString("acceptoffer"))
const DECLINEOFFER_ACTION = new ActionWrapper(Name.fromString("declineoffer"))
const PAYOFFERRAM_ACTION = new ActionWrapper(Name.fromString("payofferram"))

//------------------- Interfaces ------------------------------//

@packer
export class AdminColEdit extends InlineAction {
    constructor (public collectionFormatExtension: AtomicFormat[] = []) {
        super();
    }
}

@packer
export class SetVersion extends InlineAction {
    constructor (public newVersion: string = "") {
        super();
    }
}

@packer
export class AddConfigToken extends InlineAction {
    constructor (
        public tokenContract: Name = new Name(),
        public tokenSymbol: Symbol = new Symbol(),
    ) {
        super();
    }
}

@packer
export class TransferNfts extends InlineAction {
    constructor (
        public from: Name = new Name(),
        public to: Name = new Name(),
        public asset_ids: u64[] = [],
        public memo: string = ""
    ) {
        super();
    }
}

@packer
export class CreateCollection extends InlineAction {
    constructor (
        public author: Name = new Name(),
        public collection_name: Name = new Name(),
        public allow_notify: boolean = false,
        public authorized_accounts: Name[] = [],
        public notify_accounts: Name[] = [],
        public market_fee: f64 = 0,
        public data: AtomicAttribute[] = []
    ) {
        super();
    }
}

@packer
export class SetCollectionData extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
        public data: AtomicAttribute[] = []
    ) {
        super();
    }
}

@packer
export class AddCollectionAuth extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
        public account_to_add: Name = new Name(),
    ) {
        super();
    }
}

@packer
export class RemoveCollectionAuth extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
        public account_to_remove: Name = new Name(),
    ) {
        super();
    }
}

@packer
export class AddNotifyAccount extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
        public account_to_add: Name = new Name(),
    ) {
        super();
    }
}

@packer
export class RemoveNotifyAccount extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
        public account_to_remove: Name = new Name(),
    ) {
        super();
    }
}

@packer
export class Setmarket_fee extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
        public market_fee: f64 = 0,
    ) {
        super();
    }
}

@packer
export class ForbidNotify extends InlineAction {
    constructor (
        public collection_name: Name = new Name(),
    ) {
        super();
    }
}


@packer
export class CreateSchema extends InlineAction {
    constructor (
        public authorized_creator: Name = new Name(),
        public collection_name: Name = new Name(),
        public schema_name: Name = new Name(),
        public schema_format: AtomicFormat[] = [],
    ) {
        super();
    }
}

@packer
export class ExtendSchema extends InlineAction {
    constructor (
        public authorized_editor: Name = new Name(),
        public collection_name: Name = new Name(),
        public schema_name: Name = new Name(),
        public schema_format_extension: AtomicFormat[] = [],
    ) {
        super();
    }
}

@packer
export class CreateTemplate extends InlineAction {
    constructor (
        public authorized_creator: Name = new Name(),
        public collection_name: Name = new Name(),
        public schema_name: Name = new Name(),
        public transferable: boolean = true,
        public burnable: boolean = true,
        public max_supply: u32 = 0,
        public immutable_data: AtomicAttribute[] = []
    ) {
        super();
    }
}

@packer
export class LockTemplate extends InlineAction {
    constructor (
        public authorized_editor: Name = new Name(),
        public collection_name: Name = new Name(),
        public template_id: i32 = 0,
    ) {
        super();
    }
}

@packer
export class MintAsset extends InlineAction {
    constructor (
        public authorized_minter: Name = new Name(),
        public collection_name: Name = new Name(),
        public schema_name: Name = new Name(),
        public template_id: i32 = 0,
        public newasset_owner: Name = new Name(),
        public immutable_data: AtomicAttribute[] = [],
        public mutable_data: AtomicAttribute[] = [],
        public tokens_to_back: Asset[] = []
    ) {
        super();
    }
}

@packer
export class SetAssetData extends InlineAction {
    constructor (
        public authorized_editor: Name = new Name(),
        public asset_owner: Name = new Name(),
        public asset_id: u64 = 0,
        public new_mutable_data: AtomicAttribute[] = [],
    ) {
        super();
    }
}

@packer
export class Withdraw extends InlineAction {
    constructor (
        public owner: Name = new Name(),
        public token_to_withdraw: Asset = new Asset(),
    ) {
        super();
    }
}

@packer
export class BackAsset extends InlineAction {
    constructor (
        public payer: Name = new Name(),
        public asset_owner: Name = new Name(),
        public asset_id: u64 = 0,
        public token_to_back: Asset = new Asset(),
    ) {
        super();
    }
}

@packer
export class BurnAsset extends InlineAction {
    constructor (
        public asset_owner: Name = new Name(),
        public asset_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class CreateOffer extends InlineAction {
    constructor (
        public sender: Name = new Name(),
        public recipient: Name = new Name(),
        public sender_asset_ids: u64[] = [],
        public recipient_asset_ids: u64[] = [],
        public memo: string = "",
    ) {
        super();
    }
}

@packer
export class CancelOffer extends InlineAction {
    constructor (
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class AcceptOffer extends InlineAction {
    constructor (
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class DeclineOffer extends InlineAction {
    constructor (
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class PayOfferRam extends InlineAction {
    constructor (
        public payer: Name = new Name(),
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

//------------------- Helper functions ------------------------------//

// Inline action
export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void {
    const action = ADMINCOLEDIT_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AdminColEdit(collectionFormatExtension)
    action.send(actionParams)
}

export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void {
    const action = SETVERSION_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AdminColEdit(collectionFormatExtension)
    action.send(actionParams)
}

export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void {
    const action = ADDCONFTOKEN_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AddConfigToken(tokenContract, tokenSymbol)
    action.send(actionParams)
}

/**
 * Send a transfer action to the contract with the given parameters
 * @param {Name} from - Name of the account that is sending the NFTs
 * @param {Name} to - Name of the account to transfer the NFTs to.
 * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
 * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
 */
export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void {
    if (asset_ids.length > 0) {
        const action = TRANSFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(from))
        const actionParams = new TransferNfts(from, to, asset_ids, memo)
        action.send(actionParams)
    }
}

export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void {
    const action = CREATECOL_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateCollection(author, collection_name, allow_notify, authorized_accounts, notify_accounts, market_fee, data)
    action.send(actionParams)
}

export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void {
    const action = SETCOLDATA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SetCollectionData(collection_name, data)
    action.send(actionParams)
}

export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void {
    const action = ADDCOLAUTH_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AddCollectionAuth(collection_name, account_to_add)
    action.send(actionParams)
}

export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void {
    const action = REMCOLAUTH_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new RemoveCollectionAuth(collection_name, account_to_remove)
    action.send(actionParams)
}

export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void {
    const action = ADDNOTIFYACC_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AddNotifyAccount(collection_name, account_to_add)
    action.send(actionParams)
}

export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void {
    const action = REMNOTIFYACC_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new RemoveNotifyAccount(collection_name, account_to_remove)
    action.send(actionParams)
}

export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void {
    const action = SETmarket_fee_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new Setmarket_fee(collection_name, market_fee)
    action.send(actionParams)
}

export function sendForbidNotify(contract: Name, collection_name: Name): void {
    const action = FORBIDNOTIFY_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new ForbidNotify(collection_name)
    action.send(actionParams)
}

export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void {
    const action = CREATESCHEMA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateSchema(authorized_creator, collection_name, schema_name, schema_format)
    action.send(actionParams)
}

export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void {
    const action = EXTENDSCHEMA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new ExtendSchema(authorized_editor, collection_name, schema_name, schema_format_extension)
    action.send(actionParams)
}

export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void {
    const action = CREATETEMPL_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateTemplate(authorized_creator, collection_name, schema_name, transferable, burnable, max_supply, immutable_data)
    action.send(actionParams)
}

export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void {
    const action = LOCKTEMPLATE_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new LockTemplate(authorized_editor, collection_name, template_id)
    action.send(actionParams)
}

export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void {
    const action = MINTASSET_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new MintAsset(authorized_minter, collection_name, schema_name, template_id, newasset_owner, immutable_data, mutable_data, tokens_to_back)
    action.send(actionParams)
}

export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void {
    const action = SETASSETDATA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SetAssetData(authorized_editor, asset_owner, asset_id, new_mutable_data)
    action.send(actionParams)
}

export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void {
    const action = WITHDRAW_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new Withdraw(owner, token_to_withdraw)
    action.send(actionParams)
}

export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void {
    const action = BACKASSET_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new BackAsset(payer, asset_owner, asset_id, token_to_back)
    action.send(actionParams)
}

export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void {
    const action = BURNASSET_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new BurnAsset(asset_owner, asset_id)
    action.send(actionParams)
}

export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void {
    const action = CREATEOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateOffer(sender, recipient, sender_asset_ids, recipient_asset_ids, memo)
    action.send(actionParams)
}

export function sendCancelOffer(contract: Name, offer_id: u64): void {
    const action = CANCELOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CancelOffer(offer_id)
    action.send(actionParams)
}

export function sendAcceptOffer(contract: Name, offer_id: u64): void {
    const action = ACCEPTOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AcceptOffer(offer_id)
    action.send(actionParams)
}

export function sendDeclineOffer(contract: Name, offer_id: u64): void {
    const action = DECLINEOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new DeclineOffer(offer_id)
    action.send(actionParams)
}

export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void {
    const action = PAYOFFERRAM_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new PayOfferRam(payer, offer_id)
    action.send(actionParams)
}
