import { Name, Symbol, Asset, InlineAction, ActionData, PermissionLevel, EMPTY_NAME } from "..";
import { AtomicAttribute, AtomicFormat } from "./atomicdata";
import { ATOMICASSETS_CONTRACT } from "./atomicassets.constants";

//------------------- Interfaces ------------------------------//
@packer
export class TransferNfts extends ActionData {
    constructor (
        public from: Name = EMPTY_NAME,
        public to: Name = EMPTY_NAME,
        public asset_ids: u64[] = [],
        public memo: string = ""
    ) {
        super();
    }
}

@packer
export class AdminColEdit extends ActionData {
    constructor (public collectionFormatExtension: AtomicFormat[] = []) {
        super();
    }
}

@packer
export class SetVersion extends ActionData {
    constructor (public newVersion: string = "") {
        super();
    }
}

@packer
export class AddConfigToken extends ActionData {
    constructor (
        public tokenContract: Name = EMPTY_NAME,
        public tokenSymbol: Symbol = new Symbol(),
    ) {
        super();
    }
}

@packer
export class CreateCollection extends ActionData {
    constructor (
        public author: Name = EMPTY_NAME,
        public collection_name: Name = EMPTY_NAME,
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
export class SetCollectionData extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public data: AtomicAttribute[] = []
    ) {
        super();
    }
}

@packer
export class AddCollectionAuth extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public account_to_add: Name = EMPTY_NAME,
    ) {
        super();
    }
}

@packer
export class RemoveCollectionAuth extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public account_to_remove: Name = EMPTY_NAME,
    ) {
        super();
    }
}

@packer
export class AddNotifyAccount extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public account_to_add: Name = EMPTY_NAME,
    ) {
        super();
    }
}

@packer
export class RemoveNotifyAccount extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public account_to_remove: Name = EMPTY_NAME,
    ) {
        super();
    }
}

@packer
export class SetMarketFee extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
        public market_fee: f64 = 0,
    ) {
        super();
    }
}

@packer
export class ForbidNotify extends ActionData {
    constructor (
        public collection_name: Name = EMPTY_NAME,
    ) {
        super();
    }
}


@packer
export class CreateSchema extends ActionData {
    constructor (
        public authorized_creator: Name = EMPTY_NAME,
        public collection_name: Name = EMPTY_NAME,
        public schema_name: Name = EMPTY_NAME,
        public schema_format: AtomicFormat[] = [],
    ) {
        super();
    }
}

@packer
export class ExtendSchema extends ActionData {
    constructor (
        public authorized_editor: Name = EMPTY_NAME,
        public collection_name: Name = EMPTY_NAME,
        public schema_name: Name = EMPTY_NAME,
        public schema_format_extension: AtomicFormat[] = [],
    ) {
        super();
    }
}

@packer
export class CreateTemplate extends ActionData {
    constructor (
        public authorized_creator: Name = EMPTY_NAME,
        public collection_name: Name = EMPTY_NAME,
        public schema_name: Name = EMPTY_NAME,
        public transferable: boolean = true,
        public burnable: boolean = true,
        public max_supply: u32 = 0,
        public immutable_data: AtomicAttribute[] = []
    ) {
        super();
    }
}

@packer
export class LockTemplate extends ActionData {
    constructor (
        public authorized_editor: Name = EMPTY_NAME,
        public collection_name: Name = EMPTY_NAME,
        public template_id: i32 = 0,
    ) {
        super();
    }
}

@packer
export class MintAsset extends ActionData {
    constructor (
        public authorized_minter: Name = EMPTY_NAME,
        public collection_name: Name = EMPTY_NAME,
        public schema_name: Name = EMPTY_NAME,
        public template_id: i32 = 0,
        public newasset_owner: Name = EMPTY_NAME,
        public immutable_data: AtomicAttribute[] = [],
        public mutable_data: AtomicAttribute[] = [],
        public tokens_to_back: Asset[] = []
    ) {
        super();
    }
}

@packer
export class SetAssetData extends ActionData {
    constructor (
        public authorized_editor: Name = EMPTY_NAME,
        public asset_owner: Name = EMPTY_NAME,
        public asset_id: u64 = 0,
        public new_mutable_data: AtomicAttribute[] = [],
    ) {
        super();
    }
}

@packer
export class Withdraw extends ActionData {
    constructor (
        public owner: Name = EMPTY_NAME,
        public token_to_withdraw: Asset = new Asset(),
    ) {
        super();
    }
}

@packer
export class BackAsset extends ActionData {
    constructor (
        public payer: Name = EMPTY_NAME,
        public asset_owner: Name = EMPTY_NAME,
        public asset_id: u64 = 0,
        public token_to_back: Asset = new Asset(),
    ) {
        super();
    }
}

@packer
export class BurnAsset extends ActionData {
    constructor (
        public asset_owner: Name = EMPTY_NAME,
        public asset_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class CreateOffer extends ActionData {
    constructor (
        public sender: Name = EMPTY_NAME,
        public recipient: Name = EMPTY_NAME,
        public sender_asset_ids: u64[] = [],
        public recipient_asset_ids: u64[] = [],
        public memo: string = "",
    ) {
        super();
    }
}

@packer
export class CancelOffer extends ActionData {
    constructor (
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class AcceptOffer extends ActionData {
    constructor (
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class DeclineOffer extends ActionData {
    constructor (
        public offer_id: u64 = 0,
    ) {
        super();
    }
}

@packer
export class PayOfferRam extends ActionData {
    constructor (
        public payer: Name = EMPTY_NAME,
        public offer_id: u64 = 0,
    ) {
        super();
    }
}


//------------------- Helper functions ------------------------------//

// Inline action
/**
 * Send a transfer action to the contract with the given parameters
 * @param {Name} from - Name of the account that is sending the NFTs
 * @param {Name} to - Name of the account to transfer the NFTs to.
 * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
 * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
 */
 export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void {
    const TRANSFER_ACTION = new InlineAction<TransferNfts>("transfer")

    if (asset_ids.length > 0) {
        const action = TRANSFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(from))
        const actionParams = new TransferNfts(from, to, asset_ids, memo)
        action.send(actionParams)
    }
}

export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void {
    const ADMINCOLEDIT_ACTION = new InlineAction<AdminColEdit>("admincoledit")
    const action = ADMINCOLEDIT_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AdminColEdit(collectionFormatExtension)
    action.send(actionParams)
}

export function sendSetVersion(contract: Name, newVersion: string): void {
    const SETVERSION_ACTION = new InlineAction<SetVersion>("setversion")
    const action = SETVERSION_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SetVersion(newVersion)
    action.send(actionParams)
}

export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void {
    const ADDCONFTOKEN_ACTION = new InlineAction<AddConfigToken>("addconftoken")
    const action = ADDCONFTOKEN_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AddConfigToken(tokenContract, tokenSymbol)
    action.send(actionParams)
}

export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void {
    const CREATECOL_ACTION = new InlineAction<CreateCollection>("createcol")
    const action = CREATECOL_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateCollection(author, collection_name, allow_notify, authorized_accounts, notify_accounts, market_fee, data)
    action.send(actionParams)
}

export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void {
    const SETCOLDATA_ACTION = new InlineAction<SetCollectionData>("setcoldata")
    const action = SETCOLDATA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SetCollectionData(collection_name, data)
    action.send(actionParams)
}

export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void {
    const ADDCOLAUTH_ACTION = new InlineAction<AddCollectionAuth>("addcolauth")
    const action = ADDCOLAUTH_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AddCollectionAuth(collection_name, account_to_add)
    action.send(actionParams)
}

export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void {
    const REMCOLAUTH_ACTION = new InlineAction<RemoveCollectionAuth>("removecolauth")
    const action = REMCOLAUTH_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new RemoveCollectionAuth(collection_name, account_to_remove)
    action.send(actionParams)
}

export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void {
    const ADDNOTIFYACC_ACTION = new InlineAction<AddNotifyAccount>("addnotifyacc")
    const action = ADDNOTIFYACC_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AddNotifyAccount(collection_name, account_to_add)
    action.send(actionParams)
}

export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void {
    const REMNOTIFYACC_ACTION = new InlineAction<RemoveNotifyAccount>("remnotifyacc")
    const action = REMNOTIFYACC_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new RemoveNotifyAccount(collection_name, account_to_remove)
    action.send(actionParams)
}

export function sendSetMarketFee(contract: Name, collection_name: Name, market_fee: f64): void {
    const SETMARKETFEE_ACTION = new InlineAction<SetMarketFee>("setmarketfee")
    const action = SETMARKETFEE_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SetMarketFee(collection_name, market_fee)
    action.send(actionParams)
}

export function sendForbidNotify(contract: Name, collection_name: Name): void {
    const FORBIDNOTIFY_ACTION = new InlineAction<ForbidNotify>("forbidnotify")
    const action = FORBIDNOTIFY_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new ForbidNotify(collection_name)
    action.send(actionParams)
}

export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void {
    const CREATESCHEMA_ACTION = new InlineAction<CreateSchema>("createschema")
    const action = CREATESCHEMA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateSchema(authorized_creator, collection_name, schema_name, schema_format)
    action.send(actionParams)
}

export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void {
    const EXTENDSCHEMA_ACTION = new InlineAction<ExtendSchema>("extendschema")
    const action = EXTENDSCHEMA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new ExtendSchema(authorized_editor, collection_name, schema_name, schema_format_extension)
    action.send(actionParams)
}

//------------------- Action Names ------------------------------//
export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void {
    const CREATETEMPL_ACTION = new InlineAction<CreateTemplate>("createtempl")
    const action = CREATETEMPL_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateTemplate(authorized_creator, collection_name, schema_name, transferable, burnable, max_supply, immutable_data)
    action.send(actionParams)
}

export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void {
    const LOCKTEMPLATE_ACTION = new InlineAction<LockTemplate>("locktemplate")
    const action = LOCKTEMPLATE_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new LockTemplate(authorized_editor, collection_name, template_id)
    action.send(actionParams)
}

export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void {
    const MINTASSET_ACTION = new InlineAction<MintAsset>("mintasset")
    const action = MINTASSET_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new MintAsset(authorized_minter, collection_name, schema_name, template_id, newasset_owner, immutable_data, mutable_data, tokens_to_back)
    action.send(actionParams)
}

export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void {
    const SETASSETDATA_ACTION = new InlineAction<SetAssetData>("setassetdata")
    const action = SETASSETDATA_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new SetAssetData(authorized_editor, asset_owner, asset_id, new_mutable_data)
    action.send(actionParams)
}

export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void {
    const WITHDRAW_ACTION = new InlineAction<Withdraw>("withdraw")
    const action = WITHDRAW_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new Withdraw(owner, token_to_withdraw)
    action.send(actionParams)
}

export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void {
    const BACKASSET_ACTION = new InlineAction<BackAsset>("backasset")
    const action = BACKASSET_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new BackAsset(payer, asset_owner, asset_id, token_to_back)
    action.send(actionParams)
}

export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void {
    const BURNASSET_ACTION = new InlineAction<BurnAsset>("burnasset")
    const action = BURNASSET_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new BurnAsset(asset_owner, asset_id)
    action.send(actionParams)
}

export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void {
    const CREATEOFFER_ACTION = new InlineAction<CreateOffer>("createoffer")
    const action = CREATEOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CreateOffer(sender, recipient, sender_asset_ids, recipient_asset_ids, memo)
    action.send(actionParams)
}

export function sendCancelOffer(contract: Name, offer_id: u64): void {
    const CANCELOFFER_ACTION = new InlineAction<CancelOffer>("canceloffer")
    const action = CANCELOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new CancelOffer(offer_id)
    action.send(actionParams)
}

export function sendAcceptOffer(contract: Name, offer_id: u64): void {
    const ACCEPTOFFER_ACTION = new InlineAction<AcceptOffer>("acceptoffer")
    const action = ACCEPTOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new AcceptOffer(offer_id)
    action.send(actionParams)
}

export function sendDeclineOffer(contract: Name, offer_id: u64): void {
    const DECLINEOFFER_ACTION = new InlineAction<DeclineOffer>("declineoffer")
    const action = DECLINEOFFER_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new DeclineOffer(offer_id)
    action.send(actionParams)
}

export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void {
    const PAYOFFERRAM_ACTION = new InlineAction<PayOfferRam>("payofferram")
    const action = PAYOFFERRAM_ACTION.act(ATOMICASSETS_CONTRACT, new PermissionLevel(contract))
    const actionParams = new PayOfferRam(payer, offer_id)
    action.send(actionParams)
}
