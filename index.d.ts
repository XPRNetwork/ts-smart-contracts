declare module 'proton-tsc/allow/allow.contract' {
  import { Name, Singleton, Contract, ExtendedSymbol } from 'proton-tsc';
  import { TableStore } from 'proton-tsc';
  import { AllowedActor, AllowedToken, AllowGlobals } from 'proton-tsc/allow/allow.tables';
  export class AllowContract extends Contract {
      contract: Name;
      parentContract: Name;
      allowedActorTable: TableStore<AllowedActor>;
      allowedTokenTable: TableStore<AllowedToken>;
      allowGlobalsSingleton: Singleton<AllowGlobals>;
      /**
       * Set the global variables
       * @param {boolean} isPaused - boolean,
       * @param {boolean} isActorStrict - If true, then actors must be registered with the system.
       * @param {boolean} isTokenStrict - boolean
       */
      setglobals(isPaused: boolean, isActorStrict: boolean, isTokenStrict: boolean): void;
      /**
       * It updates the isAllowed field of the token.
       * @param {ExtendedSymbol} token - The token to be updated.
       * @param {boolean} isBlocked - boolean
       */
      settoken(token: ExtendedSymbol, isAllowed: boolean, isBlocked: boolean): void;
      /**
       * It sets the isAllowed field of the actor to the value of isAllowed.
       * @param {Name} actor - Name
       * @param {boolean} isAllowed - boolean
       */
      setactor(actor: Name, isAllowed: boolean, isBlocked: boolean): void;
      /**
       * Helper functions
       */
      findAllowedToken(token: ExtendedSymbol): AllowedToken | null;
      isTokenAllowed(token: ExtendedSymbol): boolean;
      checkTokenIsAllowed(token: ExtendedSymbol): void;
      isActorAllowed(actor: Name): boolean;
      checkActorIsAllowed(actor: Name): void;
      isContractPaused(): boolean;
      checkContractIsNotPaused(): void;
  }

}
declare module 'proton-tsc/allow/allow.spec' {
  export {};

}
declare module 'proton-tsc/allow/allow.tables' {
  /// <reference types="assembly" />
  import { Name, Table, Singleton, U128, ExtendedSymbol } from "proton-tsc";
  import { TableStore } from "proton-tsc";
  export class AllowGlobals extends Table {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
  }
  export class AllowedActor extends Table {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
  }
  export class AllowedToken extends Table {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
  }

}
declare module 'proton-tsc/allow/allow.utils' {
  import { ExtendedSymbol, U128 } from "proton-tsc";
  export const extendedSymbolToU128: (extSym: ExtendedSymbol) => U128;
  export const U128ToExtSym: (value: U128) => ExtendedSymbol;

}
declare module 'proton-tsc/allow/fixtures/allowed-fixtures.spec' {
  export {};

}
declare module 'proton-tsc/allow/fixtures/allowed-fixtures.test' {
  import { Fixtures } from "@proton/vert";
  export const allowFixtures: Fixtures;

}
declare module 'proton-tsc/allow' {
  export * from 'proton-tsc/allow/allow.contract';
  export * from 'proton-tsc/allow/allow.tables';
  export * from 'proton-tsc/allow/allow.utils';

}
declare module 'proton-tsc/allow/target/allow.contract' {
  /// <reference types="assembly" />
  import { Name, Singleton, Contract, ExtendedSymbol } from 'proton-tsc/allow';
  import { TableStore } from 'proton-tsc/allow';
  import { AllowedActor, AllowedToken, AllowGlobals } from 'proton-tsc/allow/target/allow.tables';
  export class AllowContract extends Contract {
      contract: Name;
      parentContract: Name;
      allowedActorTable: TableStore<AllowedActor>;
      allowedTokenTable: TableStore<AllowedToken>;
      allowGlobalsSingleton: Singleton<AllowGlobals>;
      /**
       * Set the global variables
       * @param {boolean} isPaused - boolean,
       * @param {boolean} isActorStrict - If true, then actors must be registered with the system.
       * @param {boolean} isTokenStrict - boolean
       */
      setglobals(isPaused: boolean, isActorStrict: boolean, isTokenStrict: boolean): void;
      /**
       * It updates the isAllowed field of the token.
       * @param {ExtendedSymbol} token - The token to be updated.
       * @param {boolean} isBlocked - boolean
       */
      settoken(token: ExtendedSymbol, isAllowed: boolean, isBlocked: boolean): void;
      /**
       * It sets the isAllowed field of the actor to the value of isAllowed.
       * @param {Name} actor - Name
       * @param {boolean} isAllowed - boolean
       */
      setactor(actor: Name, isAllowed: boolean, isBlocked: boolean): void;
      /**
       * Helper functions
       */
      findAllowedToken(token: ExtendedSymbol): AllowedToken | null;
      isTokenAllowed(token: ExtendedSymbol): boolean;
      checkTokenIsAllowed(token: ExtendedSymbol): void;
      isActorAllowed(actor: Name): boolean;
      checkActorIsAllowed(actor: Name): void;
      isContractPaused(): boolean;
      checkContractIsNotPaused(): void;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/allow/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/allow";
  import { TableStore } from "proton-tsc/allow";
  export class AllowGlobalsDB extends _chain.MultiIndex<AllowGlobals> {
  }
  export class AllowGlobals implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobals>;
  }
  export class AllowedActorDB extends _chain.MultiIndex<AllowedActor> {
  }
  export class AllowedActor implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorDB;
  }
  export class AllowedTokenDB extends _chain.MultiIndex<AllowedToken> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedToken implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenDB;
  }

}
declare module 'proton-tsc/allow/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/allow";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/allow/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/allow/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/allow";
  import { AtomicFormat } from "proton-tsc/allow/target/atomicdata";
  import { TableStore } from "proton-tsc/allow";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/allow/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/allow/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/allow";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/allow/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/allow";
  import { TableStore } from "proton-tsc/allow";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/allow/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/allow/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/allow";
  import { Escrow } from "proton-tsc/allow/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/allow/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/allow";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/allow/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/allow";
  import { TableStore } from "proton-tsc/allow";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/allow/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/allow";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/allow/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/allow";
  import { TableStore } from "proton-tsc/allow";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/allow/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/allow";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/allow/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/allow";
  import { TableStore } from "proton-tsc/allow";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/allow/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/allow';
  import { AccountKV } from 'proton-tsc/allow/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/atomicassets/atomicassets.constants' {
  /// <reference types="assembly" />
  export const MAX_MARKET_FEE: f64;
  export const RESERVED: u64;

}
declare module 'proton-tsc/atomicassets/atomicassets.contract' {
  export {};

}
declare module 'proton-tsc/atomicassets/atomicassets.inline' {
  /// <reference types="assembly" />
  import { Name, InlineAction, Symbol, Asset } from "proton-tsc";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/atomicassets/atomicdata";
  export const ATOMICASSETS_CONTRACT: Name;
  export class AdminColEdit extends InlineAction {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
  }
  export class SetVersion extends InlineAction {
      newVersion: string;
      constructor(newVersion?: string);
  }
  export class AddConfigToken extends InlineAction {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
  }
  export class TransferNfts extends InlineAction {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
  }
  export class CreateCollection extends InlineAction {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
  }
  export class SetCollectionData extends InlineAction {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
  }
  export class AddCollectionAuth extends InlineAction {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
  }
  export class RemoveCollectionAuth extends InlineAction {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
  }
  export class AddNotifyAccount extends InlineAction {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
  }
  export class RemoveNotifyAccount extends InlineAction {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
  }
  export class Setmarket_fee extends InlineAction {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
  }
  export class ForbidNotify extends InlineAction {
      collection_name: Name;
      constructor(collection_name?: Name);
  }
  export class CreateSchema extends InlineAction {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
  }
  export class ExtendSchema extends InlineAction {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
  }
  export class CreateTemplate extends InlineAction {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
  }
  export class LockTemplate extends InlineAction {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
  }
  export class MintAsset extends InlineAction {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
  }
  export class SetAssetData extends InlineAction {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
  }
  export class Withdraw extends InlineAction {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
  }
  export class BackAsset extends InlineAction {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
  }
  export class BurnAsset extends InlineAction {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
  }
  export class CreateOffer extends InlineAction {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
  }
  export class CancelOffer extends InlineAction {
      offer_id: u64;
      constructor(offer_id?: u64);
  }
  export class AcceptOffer extends InlineAction {
      offer_id: u64;
      constructor(offer_id?: u64);
  }
  export class DeclineOffer extends InlineAction {
      offer_id: u64;
      constructor(offer_id?: u64);
  }
  export class PayOfferRam extends InlineAction {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/atomicassets/atomicassets.spec' {
  export {};

}
declare module 'proton-tsc/atomicassets/atomicassets.tables' {
  /// <reference types="assembly" />
  import { Name, Table, Singleton, ExtendedSymbol, Asset } from "proton-tsc";
  import { AtomicFormat } from "proton-tsc/atomicassets/atomicdata";
  import { TableStore } from "proton-tsc";
  export class Collections extends Table {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
  }
  export class Schemas extends Table {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
  }
  export class Templates extends Table {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
  }
  export class Assets extends Table {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
  }
  export class Offers extends Table {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
  }
  export class Config extends Table {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
  }

}
declare module 'proton-tsc/atomicassets/atomicdata' {
  /// <reference types="assembly" />
  import { Variant } from "proton-tsc";
  export class AtomicFormat {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
  }
  export class AtomicAttribute {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
  }
  export class AtomicValue extends Variant {
      i8: i8;
      i16: i16;
      i32: i32;
      i64: i64;
      u8: u8;
      u16: u16;
      u32: u32;
      u64: u64;
      float: f32;
      double: f64;
      string: string;
      INT8_VEC: i8[];
      INT16_VEC: i16[];
      INT32_VEC: i32[];
      INT64_VEC: i64[];
      UINT8_VEC: u8[];
      UINT16_VEC: u16[];
      UINT32_VEC: u32[];
      UINT64_VEC: u64[];
      FLOAT_VEC: f32[];
      DOUBLE_VEC: f64[];
      STRING_VEC: string[];
      static new<T>(value: T): AtomicValue;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/atomicassets/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/atomicassets/checkformat' {
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/atomicassets/atomicdata";
  export function check_format(lines: AtomicFormat[]): void;
  /**
  * The "name" attribute is limited to 64 characters max for both assets and collections
  * This function checks that, if there exists an ATTRIBUTE with name: "name", the value of it
  * must be of length <= 64
  */
  export function check_name_length(data: AtomicAttribute[]): void;

}
declare module 'proton-tsc/atomicassets' {
  export * from 'proton-tsc/atomicassets/atomicassets.constants';
  export * from 'proton-tsc/atomicassets/atomicassets.contract';
  export * from 'proton-tsc/atomicassets/atomicassets.inline';
  export * from 'proton-tsc/atomicassets/atomicassets.tables';
  export * from 'proton-tsc/atomicassets/atomicdata';
  export * from 'proton-tsc/atomicassets/base58';
  export * from 'proton-tsc/atomicassets/checkformat';

}
declare module 'proton-tsc/atomicassets/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/atomicassets";
  import { TableStore } from "proton-tsc/atomicassets";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/atomicassets/target/atomicassets.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/atomicassets/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/atomicassets";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/atomicassets/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/atomicassets/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/atomicassets";
  import { AtomicFormat } from "proton-tsc/atomicassets/target/atomicdata";
  import { TableStore } from "proton-tsc/atomicassets";
  export class CollectionsDB extends _chain.MultiIndex<Collections> {
  }
  export class Collections implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasDB;
  }
  export class TemplatesDB extends _chain.MultiIndex<Templates> {
  }
  export class Templates implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesDB;
  }
  export class AssetsDB extends _chain.MultiIndex<Assets> {
  }
  export class Assets implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class Offers implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersDB;
  }
  export class ConfigDB extends _chain.MultiIndex<Config> {
  }
  export class Config implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<Config>;
  }

}
declare module 'proton-tsc/atomicassets/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/atomicassets/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/atomicassets";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/atomicassets/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/atomicassets";
  import { TableStore } from "proton-tsc/atomicassets";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/atomicassets/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/atomicassets/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/atomicassets";
  import { Escrow } from "proton-tsc/atomicassets/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/atomicassets/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/atomicassets";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/atomicassets/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/atomicassets";
  import { TableStore } from "proton-tsc/atomicassets";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/atomicassets/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/atomicassets";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/atomicassets/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/atomicassets";
  import { TableStore } from "proton-tsc/atomicassets";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/atomicassets/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/atomicassets";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/atomicassets/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/atomicassets";
  import { TableStore } from "proton-tsc/atomicassets";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/atomicassets/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/atomicassets';
  import { AccountKV } from 'proton-tsc/atomicassets/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/balance/balance.constants' {
  import { Name } from "proton-tsc";
  /**
   * The name of the constant and the string must be exactly the same
   * for decorators to utilize it correctly
   */
  export const atomicassets: Name;

}
declare module 'proton-tsc/balance/balance.contract' {
  /// <reference types="assembly" />
  import { ExtendedAsset, Name, TableStore } from 'proton-tsc';
  import { AllowContract } from 'proton-tsc/allow';
  import { Balance } from 'proton-tsc/balance/balance.tables';
  export class BalanceContract extends AllowContract {
      balancesTable: TableStore<Balance>;
      /**
       * Incoming notification of "transfer" action from any contract
       * - If the contract is the atomicassets contract, then the action data is an NFT transfer.
       * - Else, the action data is a token transfer
       * @returns Nothing.
       */
      transfer(): void;
      /**
       * Withdraw tokens and NFTs from an actor and transfer them to another actor
       * @param {Name} actor - Name
       * @param {ExtendedAsset[]} tokens - An array of `ExtendedAsset` objects.
       * @param {u64[]} nfts - u64[]
       */
      withdraw(actor: Name, tokens: ExtendedAsset[], nfts: u64[]): void;
      /**
       * Withdraw all tokens and NFTs from the contract and transfer them to the actor.
       * Note:
       *  - Does not reduce balance
       *  - Assumes caller has already reduced balance using modifyBalance
       * @param {Name} actor - Name
       * @param {ExtendedAsset[]} tokens - The list of tokens to transfer.
       * @param {u64[]} nfts - u64[]
       * @param {string} memo - string
       */
      withdrawadmin(actor: Name, tokens: ExtendedAsset[], nfts: u64[], memo: string): void;
      /**
       * It substracts tokens and/or NFTs from an actor.
       * @param {Name} actor - The actor for which to modify balances
       * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
       * @param {u64[]} nfts - The list of NFT asset ids
       * @param {Name} ramPayer - Account that pays for RAM
       */
      substractBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[]): void;
      /**
       * It adds tokens and/or NFTs from an actor.
       * @param {Name} actor - The actor for which to modify balances
       * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
       * @param {u64[]} nfts - The list of NFT asset ids
       * @param {Name} ramPayer - Account that pays for RAM
       */
      addBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[], ramPayer?: Name): void;
  }

}
declare module 'proton-tsc/balance/balance.spec' {
  export {};

}
declare module 'proton-tsc/balance/balance.tables' {
  /// <reference types="assembly" />
  import { ExtendedAsset, Name, Table } from "proton-tsc";
  import { TableStore } from "proton-tsc";
  export class Balance extends Table {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
  }

}
declare module 'proton-tsc/balance/balance.utils' {
  /// <reference types="assembly" />
  import { ExtendedAsset } from "proton-tsc";
  import { Balance } from "proton-tsc/balance/balance.tables";
  /**
   * Find the index of an extended asset in an array of extended assets
   * @param {ExtendedAsset[]} tokens - The list of tokens to search through.
   * @param {ExtendedAsset} token - ExtendedAsset
   * @returns The index of the token in the array of tokens.
   */
  export function findIndexOfExtendedAsset(tokens: ExtendedAsset[], token: ExtendedAsset): i32;
  /**
   * The function takes in an account and a list of nfts to remove from the account's balance.
   * @param {Balance} balance - Balance
   * @param {u64[]} nftsToRemove - u64[]
   */
  export function substractNfts(balance: Balance, nftsToRemove: u64[]): void;
  /**
   * Add the given nfts to the account's nfts.
   * @param {Balance} balance - balance - The account to add the NFTs to.
   * @param {u64[]} nftsToAdd - u64[]
   */
  export function addNfts(balance: Balance, nftsToAdd: u64[]): void;
  /**
   * It finds the index of the token in the array of tokens,
   * and then it substracts the balance of the user.
   * @param {ExtendedAsset[]} tokens - The list of tokens that the user has.
   * @param {ExtendedAsset} sub - The asset to be subtracted from the user's balance.
   */
  export function substractToken(tokens: ExtendedAsset[], sub: ExtendedAsset): void;
  /**
   * It subtracts the tokens from the account.
   * @param {Balance} balance - Account
   * @param {ExtendedAsset[]} tokensToSubtract - An array of ExtendedAsset objects.
   */
  export function substractTokens(balance: Balance, tokensToSubtract: ExtendedAsset[]): void;
  /**
   * If the token does not exist, add it. If the token exists, update the balance
   * @param {ExtendedAsset[]} tokens - The list of tokens that the user owns.
   * @param {ExtendedAsset} add - ExtendedAsset
   */
  export function addToken(tokens: ExtendedAsset[], add: ExtendedAsset): void;
  /**
   * It adds the tokens to the balance's tokens array.
   * @param {Balance} account - The balance to add the tokens to.
   * @param {ExtendedAsset[]} tokensToAdd - An array of ExtendedAsset objects.
   */
  export function addTokens(balance: Balance, tokensToAdd: ExtendedAsset[]): void;

}
declare module 'proton-tsc/balance' {
  export * from 'proton-tsc/balance/balance.constants';
  export * from 'proton-tsc/balance/balance.contract';
  export * from 'proton-tsc/balance/balance.tables';
  export * from 'proton-tsc/balance/balance.utils';

}
declare module 'proton-tsc/balance/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/balance";
  import { TableStore } from "proton-tsc/balance";
  export class AllowGlobalsDB extends _chain.MultiIndex<AllowGlobals> {
  }
  export class AllowGlobals implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobals>;
  }
  export class AllowedActorDB extends _chain.MultiIndex<AllowedActor> {
  }
  export class AllowedActor implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorDB;
  }
  export class AllowedTokenDB extends _chain.MultiIndex<AllowedToken> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedToken implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenDB;
  }

}
declare module 'proton-tsc/balance/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/balance";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/balance/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/balance/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/balance";
  import { AtomicFormat } from "proton-tsc/balance/target/atomicdata";
  import { TableStore } from "proton-tsc/balance";
  export class CollectionsDB extends _chain.MultiIndex<Collections> {
  }
  export class Collections implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasDB;
  }
  export class TemplatesDB extends _chain.MultiIndex<Templates> {
  }
  export class Templates implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesDB;
  }
  export class AssetsDB extends _chain.MultiIndex<Assets> {
  }
  export class Assets implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class Offers implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersDB;
  }
  export class ConfigDB extends _chain.MultiIndex<Config> {
  }
  export class Config implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<Config>;
  }

}
declare module 'proton-tsc/balance/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/balance/target/balance.contract' {
  /// <reference types="assembly" />
  import { ExtendedAsset, Name, TableStore } from 'proton-tsc/balance';
  import { AllowContract } from 'proton-tsc/balance/allow';
  import { Balance } from 'proton-tsc/balance/target/balance.tables';
  export class BalanceContract extends AllowContract {
      balancesTable: TableStore<Balance>;
      /**
       * Incoming notification of "transfer" action from any contract
       * - If the contract is the atomicassets contract, then the action data is an NFT transfer.
       * - Else, the action data is a token transfer
       * @returns Nothing.
       */
      transfer(): void;
      /**
       * Withdraw tokens and NFTs from an actor and transfer them to another actor
       * @param {Name} actor - Name
       * @param {ExtendedAsset[]} tokens - An array of `ExtendedAsset` objects.
       * @param {u64[]} nfts - u64[]
       */
      withdraw(actor: Name, tokens: ExtendedAsset[], nfts: u64[]): void;
      /**
       * Withdraw all tokens and NFTs from the contract and transfer them to the actor.
       * Note:
       *  - Does not reduce balance
       *  - Assumes caller has already reduced balance using modifyBalance
       * @param {Name} actor - Name
       * @param {ExtendedAsset[]} tokens - The list of tokens to transfer.
       * @param {u64[]} nfts - u64[]
       * @param {string} memo - string
       */
      withdrawadmin(actor: Name, tokens: ExtendedAsset[], nfts: u64[], memo: string): void;
      /**
       * It substracts tokens and/or NFTs from an actor.
       * @param {Name} actor - The actor for which to modify balances
       * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
       * @param {u64[]} nfts - The list of NFT asset ids
       * @param {Name} ramPayer - Account that pays for RAM
       */
      substractBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[]): void;
      /**
       * It adds tokens and/or NFTs from an actor.
       * @param {Name} actor - The actor for which to modify balances
       * @param {ExtendedAsset[]} tokens - The list of tokens that are being added or removed from the actor.
       * @param {u64[]} nfts - The list of NFT asset ids
       * @param {Name} ramPayer - Account that pays for RAM
       */
      addBalance(actor: Name, tokens: ExtendedAsset[], nfts: u64[], ramPayer?: Name): void;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/balance/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/balance";
  import { TableStore } from "proton-tsc/balance";
  export class BalanceDB extends _chain.MultiIndex<Balance> {
  }
  export class Balance implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceDB;
  }

}
declare module 'proton-tsc/balance/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/balance/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/balance";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/balance/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/balance";
  import { TableStore } from "proton-tsc/balance";
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountDB;
  }
  export class StatDB extends _chain.MultiIndex<Stat> {
  }
  export class Stat implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): StatDB;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/chain' {
  export { U128, U256, I128 } from "as-chain";
  export { Float128 } from "as-chain";
  export { VarInt32, VarUint32, calcPackedVarUint32Length } from "as-chain";
  export { DBI64, PrimaryIterator } from "as-chain";
  export { IDX64 } from "as-chain";
  export { IDXF64 } from "as-chain";
  export { IDXF128 } from "as-chain";
  export { IDX128 } from "as-chain";
  export { IDX256 } from "as-chain";
  export { VariantValue } from "as-chain";
  export { assert, check, currentTimePoint, currentTime, currentTimeMs, currentTimeSec, } from "as-chain";
  export { Microseconds, TimePoint, TimePointSec, BlockTimestamp } from "as-chain";
  export { prints, printui, print, printString, printArray, printHex, printi, printI128, printU128, printsf, printdf, printqf, printn, } from "as-chain";
  export { IDXDB, SecondaryType, SecondaryValue, SecondaryIterator, newSecondaryValue_u64, newSecondaryValue_U128, newSecondaryValue_U256, newSecondaryValue_f64, newSecondaryValue_Float128, getSecondaryValue_u64, getSecondaryValue_U128, getSecondaryValue_U256, getSecondaryValue_f64, getSecondaryValue_Float128, } from "as-chain";
  export { MultiIndex, MultiIndexValue, SAME_PAYER } from "as-chain";
  export { Singleton } from "as-chain";
  export { Contract, ActionWrapper, Table, InlineAction, Variant } from "as-chain";
  export { getSender, readActionData, unpackActionData, actionDataSize, requireRecipient, requireAuth, hasAuth, requireAuth2, isAccount, publicationTime, currentReceiver } from "as-chain";
  export { Name } from "as-chain";
  export { Action, PermissionLevel } from "as-chain";
  export { Asset, ExtendedAsset, Symbol, ExtendedSymbol, isValid } from "as-chain";
  export { sendDeferred, cancelDeferred, readTransaction, transactionSize, taposBlockNum, taposBlockPrefix, transactionExpiration, getAction, getContextFreeData, TransactionExtension, Transaction, } from "as-chain";
  export { PublicKey, Signature, Checksum160, Checksum256, Checksum512, recoverKey, assertRecoverKey, assertSha256, assertSha1, assertSha512, assertRipemd160, sha256, sha1, sha512, ripemd160, } from "as-chain";
  export { Packer, Encoder, Decoder, } from "as-chain";
  export { Utils } from "as-chain";

}
declare module 'proton-tsc/createnft/createnft.contract' {
  export {};

}
declare module 'proton-tsc/createnft/createnft.spec' {
  export {};

}
declare module 'proton-tsc/createnft' {
  export * from 'proton-tsc/createnft/createnft.contract';

}
declare module 'proton-tsc/createnft/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/createnft";
  import { TableStore } from "proton-tsc/createnft";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/createnft/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/createnft";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/createnft/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/createnft/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/createnft";
  import { AtomicFormat } from "proton-tsc/createnft/target/atomicdata";
  import { TableStore } from "proton-tsc/createnft";
  export class CollectionsDB extends _chain.MultiIndex<Collections> {
  }
  export class Collections implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasDB;
  }
  export class TemplatesDB extends _chain.MultiIndex<Templates> {
  }
  export class Templates implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesDB;
  }
  export class AssetsDB extends _chain.MultiIndex<Assets> {
  }
  export class Assets implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class Offers implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersDB;
  }
  export class ConfigDB extends _chain.MultiIndex<Config> {
  }
  export class Config implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<Config>;
  }

}
declare module 'proton-tsc/createnft/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/createnft/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/createnft";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/createnft/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/createnft";
  import { TableStore } from "proton-tsc/createnft";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/createnft/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/createnft/target/createnft.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/createnft/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/createnft";
  import { Escrow } from "proton-tsc/createnft/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/createnft/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/createnft";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/createnft/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/createnft";
  import { TableStore } from "proton-tsc/createnft";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/createnft/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/createnft";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/createnft/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/createnft";
  import { TableStore } from "proton-tsc/createnft";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/createnft/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/createnft";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/createnft/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/createnft";
  import { TableStore } from "proton-tsc/createnft";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/createnft/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/createnft';
  import { AccountKV } from 'proton-tsc/createnft/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/escrow/escrow.constants' {
  export namespace ESCROW_STATUS {
      const START = "start";
      const FILL = "fill";
      const CANCEL = "cancel";
  }
  export type ESCROW_STATUS = string;

}
declare module 'proton-tsc/escrow/escrow.contract' {
  export {};

}
declare module 'proton-tsc/escrow/escrow.inline' {
  import { Name, Table } from "proton-tsc";
  import { Escrow } from "proton-tsc/escrow/escrow.tables";
  export class LogEscrow extends Table {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/escrow/escrow.spec' {
  export {};

}
declare module 'proton-tsc/escrow/escrow.tables' {
  /// <reference types="assembly" />
  import { ExtendedAsset, Name, Table, Singleton, TableStore } from "proton-tsc";
  export class EscrowGlobal extends Table {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
  }
  export class Escrow extends Table {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
  }

}
declare module 'proton-tsc/escrow' {
  export * from 'proton-tsc/escrow/escrow.contract';
  export * from 'proton-tsc/escrow/escrow.tables';
  export * from 'proton-tsc/escrow/escrow.inline';
  export * from 'proton-tsc/escrow/escrow.constants';

}
declare module 'proton-tsc/escrow/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/escrow";
  import { TableStore } from "proton-tsc/escrow";
  export class AllowGlobalsDB extends _chain.MultiIndex<AllowGlobals> {
  }
  export class AllowGlobals implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobals>;
  }
  export class AllowedActorDB extends _chain.MultiIndex<AllowedActor> {
  }
  export class AllowedActor implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorDB;
  }
  export class AllowedTokenDB extends _chain.MultiIndex<AllowedToken> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedToken implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenDB;
  }

}
declare module 'proton-tsc/escrow/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/escrow";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/escrow/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/escrow/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/escrow";
  import { AtomicFormat } from "proton-tsc/escrow/target/atomicdata";
  import { TableStore } from "proton-tsc/escrow";
  export class CollectionsDB extends _chain.MultiIndex<Collections> {
  }
  export class Collections implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasDB;
  }
  export class TemplatesDB extends _chain.MultiIndex<Templates> {
  }
  export class Templates implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesDB;
  }
  export class AssetsDB extends _chain.MultiIndex<Assets> {
  }
  export class Assets implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class Offers implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersDB;
  }
  export class ConfigDB extends _chain.MultiIndex<Config> {
  }
  export class Config implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<Config>;
  }

}
declare module 'proton-tsc/escrow/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/escrow/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/escrow";
  import { TableStore } from "proton-tsc/escrow";
  export class BalanceDB extends _chain.MultiIndex<Balance> {
  }
  export class Balance implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceDB;
  }

}
declare module 'proton-tsc/escrow/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/escrow/target/escrow.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/escrow/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/escrow";
  import { Escrow } from "proton-tsc/escrow/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/escrow/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/escrow";
  export class EscrowGlobalDB extends _chain.MultiIndex<EscrowGlobal> {
  }
  export class EscrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<EscrowGlobal>;
  }
  export class EscrowDB extends _chain.MultiIndex<Escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class Escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): EscrowDB;
  }

}
declare module 'proton-tsc/escrow/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/escrow";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/escrow/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/escrow";
  import { TableStore } from "proton-tsc/escrow";
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountDB;
  }
  export class StatDB extends _chain.MultiIndex<Stat> {
  }
  export class Stat implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): StatDB;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/hello/hello.contract' {
  export {};

}
declare module 'proton-tsc/hello/hello.spec' {
  export {};

}
declare module 'proton-tsc/hello' {
  export * from 'proton-tsc/hello/hello.contract';

}
declare module 'proton-tsc/hello/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/hello";
  import { TableStore } from "proton-tsc/hello";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/hello/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/hello";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/hello/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/hello/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/hello";
  import { AtomicFormat } from "proton-tsc/hello/target/atomicdata";
  import { TableStore } from "proton-tsc/hello";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/hello/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/hello/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/hello";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/hello/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/hello";
  import { TableStore } from "proton-tsc/hello";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/hello/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/hello/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/hello";
  import { Escrow } from "proton-tsc/hello/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/hello/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/hello";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/hello/target/hello.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/hello/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/hello";
  import { TableStore } from "proton-tsc/hello";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/hello/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/hello";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/hello/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/hello";
  import { TableStore } from "proton-tsc/hello";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/hello/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/hello";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/hello/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/hello";
  import { TableStore } from "proton-tsc/hello";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/hello/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/hello';
  import { AccountKV } from 'proton-tsc/hello/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc' {
  export * from 'proton-tsc/chain';
  export * from 'proton-tsc/modules';

}
declare module 'proton-tsc/kv' {
  export * from 'proton-tsc/kv/kv.contract';
  export * from 'proton-tsc/kv/kv.tables';

}
declare module 'proton-tsc/kv/kv.contract' {
  import { Name, Contract, TableStore } from 'proton-tsc';
  import { KV, AccountKV } from 'proton-tsc/kv/kv.tables';
  export class KvContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      updatevalues(actor: Name, values: KV[]): void;
      removekeys(actor: Name, keys: string[]): void;
  }

}
declare module 'proton-tsc/kv/kv.spec' {
  export {};

}
declare module 'proton-tsc/kv/kv.tables' {
  /// <reference types="assembly" />
  import { Name, Table } from "proton-tsc";
  import { TableStore } from "proton-tsc";
  export class KV {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
  }
  export class AccountKV extends Table {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
  }

}
declare module 'proton-tsc/kv/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/kv";
  import { TableStore } from "proton-tsc/kv";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/kv/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/kv";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/kv/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/kv/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/kv";
  import { AtomicFormat } from "proton-tsc/kv/target/atomicdata";
  import { TableStore } from "proton-tsc/kv";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/kv/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/kv/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/kv";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/kv/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/kv";
  import { TableStore } from "proton-tsc/kv";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/kv/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/kv/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/kv";
  import { Escrow } from "proton-tsc/kv/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/kv/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/kv";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/kv/target/kv.contract' {
  /// <reference types="assembly" />
  import { Name, Contract, TableStore } from 'proton-tsc/kv';
  import { KV, AccountKV } from 'proton-tsc/kv/target/kv.tables';
  export class KvContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      updatevalues(actor: Name, values: KV[]): void;
      removekeys(actor: Name, keys: string[]): void;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/kv/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/kv";
  import { TableStore } from "proton-tsc/kv";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVDB extends _chain.MultiIndex<AccountKV> {
  }
  export class AccountKV implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVDB;
  }

}
declare module 'proton-tsc/kv/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/kv";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/kv/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/kv";
  import { TableStore } from "proton-tsc/kv";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/kv/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/kv";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/kv/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/kv";
  import { TableStore } from "proton-tsc/kv";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/kv/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/kv';
  import { AccountKV } from 'proton-tsc/kv/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/modules' {
  export { TableStore } from 'proton-tsc/store';
  export { SafeMath } from 'proton-tsc/safemath';

}
declare module 'proton-tsc/rng' {
  export * from 'proton-tsc/rng/rng.contract';
  export * from 'proton-tsc/rng/rng.inline';
  export * from 'proton-tsc/rng/rng.tables';

}
declare module 'proton-tsc/rng/rng.contract' {
  export {};

}
declare module 'proton-tsc/rng/rng.inline' {
  /// <reference types="assembly" />
  import { InlineAction } from "proton-tsc";
  import { Name } from "proton-tsc";
  export class RequestRandom extends InlineAction {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/rng/rng.spec' {
  export {};

}
declare module 'proton-tsc/rng/rng.tables' {
  /// <reference types="assembly" />
  import { Name, Table } from "proton-tsc";
  import { TableStore } from "proton-tsc";
  export class Results extends Table {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
  }

}
declare module 'proton-tsc/rng/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/rng";
  import { TableStore } from "proton-tsc/rng";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/rng/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/rng";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/rng/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/rng/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/rng";
  import { AtomicFormat } from "proton-tsc/rng/target/atomicdata";
  import { TableStore } from "proton-tsc/rng";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/rng/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/rng/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/rng";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/rng/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/rng";
  import { TableStore } from "proton-tsc/rng";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/rng/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/rng/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/rng";
  import { Escrow } from "proton-tsc/rng/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/rng/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/rng";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/rng/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/rng";
  import { TableStore } from "proton-tsc/rng";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/rng/target/rng.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/rng/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/rng";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/rng/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/rng";
  import { TableStore } from "proton-tsc/rng";
  export class ResultsDB extends _chain.MultiIndex<Results> {
  }
  export class Results implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsDB;
  }

}
declare module 'proton-tsc/rng/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/rng";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/rng/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/rng";
  import { TableStore } from "proton-tsc/rng";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/rng/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/rng';
  import { AccountKV } from 'proton-tsc/rng/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/safemath' {
  export * from 'proton-tsc/safemath/safemath';

}
declare module 'proton-tsc/safemath/safemath' {
  /// <reference types="assembly" />
  import { u128 } from "as-bignum";
  export class SafeMath {
      static add(x: u64, y: u64): u64;
      static sub(x: u64, y: u64): u64;
      static mul(_x: u64, _y: u64): u128;
      static div(x: u64, y: u64): u64;
  }

}
declare module 'proton-tsc/safemath/safemath.spec' {
  export {};

}
declare module 'proton-tsc/safemath/safemath.test' {
  export {};

}
declare module 'proton-tsc/safemath/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/safemath";
  import { TableStore } from "proton-tsc/safemath";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/safemath/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/safemath";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/safemath/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/safemath/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/safemath";
  import { AtomicFormat } from "proton-tsc/safemath/target/atomicdata";
  import { TableStore } from "proton-tsc/safemath";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/safemath/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/safemath/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/safemath";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/safemath/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/safemath";
  import { TableStore } from "proton-tsc/safemath";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/safemath/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/safemath/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/safemath";
  import { Escrow } from "proton-tsc/safemath/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/safemath/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/safemath";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/safemath/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/safemath";
  import { TableStore } from "proton-tsc/safemath";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/safemath/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/safemath";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/safemath/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/safemath";
  import { TableStore } from "proton-tsc/safemath";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/safemath/target/safemath.test' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/safemath/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/safemath";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/safemath/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/safemath";
  import { TableStore } from "proton-tsc/safemath";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/safemath/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/safemath';
  import { AccountKV } from 'proton-tsc/safemath/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/store' {
  export * from 'proton-tsc/store/store';

}
declare module 'proton-tsc/store/store' {
  /// <reference types="assembly" />
  import { Name, IDXDB, MultiIndexValue, U128, U256, Float128 } from "proton-tsc";
  export const NO_AVAILABLE_PRIMARY_KEY: number;
  export const UNSET_NEXT_PRIMARY_KEY: number;
  export class TableStore<T extends MultiIndexValue> {
      private mi;
      nextPrimaryKey: u64;
      constructor(code: Name, scope: Name, table: Name, indexes?: Array<IDXDB>);
      /**
       * CRUD
       */
      set(value: T, payer: Name): void;
      store(value: T, payer: Name): void;
      update(value: T, payer: Name): void;
      remove(value: T): void;
      get(key: u64): T | null;
      requireGet(key: u64, errorMsg: string): T;
      /**
       * Search
       */
      exists(pk: u64): bool;
      existsValue(value: T): bool;
      next(value: T): T | null;
      previous(value: T): T | null;
      lowerBound(id: u64): T | null;
      upperBound(id: u64): T | null;
      /**
       * Size utils
       */
      first(): T | null;
      last(): T | null;
      isEmpty(): bool;
      /**
       * Available primary index
       */
      get availablePrimaryKey(): u64;
      /**
       * Secondary indexes
       */
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {u64} secondaryValue - u64 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryIDX64(secondaryValue: u64, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {U128} secondaryValue - U128 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryIDX128(secondaryValue: U128, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {U256} secondaryValue - U256 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryIDX256(secondaryValue: U256, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {f64} secondaryValue - f64 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryIDXDouble(secondaryValue: f64, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {Float128} secondaryValue - double - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element..
       */
      getBySecondaryIDXLongDouble(secondaryValue: Float128, index: u8): T | null;
  }

}
declare module 'proton-tsc/store/store.spec' {
  export {};

}
declare module 'proton-tsc/store/store.test' {
  export {};

}
declare module 'proton-tsc/store/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/store";
  import { TableStore } from "proton-tsc/store";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/store/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/store";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/store/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/store/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/store";
  import { AtomicFormat } from "proton-tsc/store/target/atomicdata";
  import { TableStore } from "proton-tsc/store";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/store/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/store/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/store";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/store/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/store";
  import { TableStore } from "proton-tsc/store";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/store/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/store/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/store";
  import { Escrow } from "proton-tsc/store/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/store/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/store";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/store/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/store";
  import { TableStore } from "proton-tsc/store";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/store/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/store";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/store/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/store";
  import { TableStore } from "proton-tsc/store";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/store/target/store.test' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/store/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/store";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/store/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/store";
  import { TableStore } from "proton-tsc/store";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/store/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/store';
  import { AccountKV } from 'proton-tsc/store/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/token' {
  export * from 'proton-tsc/token/token.contract';
  export * from 'proton-tsc/token/token.tables';
  export * from 'proton-tsc/token/token.inline';

}
declare module 'proton-tsc/token/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/token";
  import { TableStore } from "proton-tsc/token";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/token/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/token";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/token/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/token/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/token";
  import { AtomicFormat } from "proton-tsc/token/target/atomicdata";
  import { TableStore } from "proton-tsc/token";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/token/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/token/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/token";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/token/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/token";
  import { TableStore } from "proton-tsc/token";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/token/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/token/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/token";
  import { Escrow } from "proton-tsc/token/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/token/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/token";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/token/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/token";
  import { TableStore } from "proton-tsc/token";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/token/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/token";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/token/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/token";
  import { TableStore } from "proton-tsc/token";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/token/target/token.contract' {
  /// <reference types="assembly" />
  import { Name, Asset, Symbol, Contract } from "proton-tsc/token";
  export class TokenContract extends Contract {
      /**
       * Allows `issuer` account to create a token in supply of `maximum_supply`. If validation is successful a new entry in statstable for token symbol scope gets created.
       *
       * @param issuer - the account that creates the token,
       * @param maximum_supply - the maximum supply set for the token created.
       *
       * @pre Token symbol has to be valid,
       * @pre Token symbol must not be already created,
       * @pre maximum_supply has to be smaller than the maximum supply allowed by the system: 1^62 - 1.
       * @pre Maximum supply must be positive;
       */
      create(issuer: Name, maximum_supply: Asset): void;
      /**
       *  This action issues to `to` account a `quantity` of tokens.
       *
       * @param to - the account to issue tokens to, it must be the same as the issuer,
       * @param quantity - the amount of tokens to be issued,
       * @memo - the memo string that accompanies the token issue transaction.
       */
      issue(to: Name, quantity: Asset, memo: string): void;
      /**
       * The opposite for create action, if all validations succeed,
       * it debits the statstable.supply amount.
       *
       * @param quantity - the quantity of tokens to retire,
       * @param memo - the memo string to accompany the transaction.
       */
      retire(quantity: Asset, memo: string): void;
      /**
       * Allows `from` account to transfer to `to` account the `quantity` tokens.
       * One account is debited and the other is credited with quantity tokens.
       *
       * @param from - the account to transfer from,
       * @param to - the account to be transferred to,
       * @param quantity - the quantity of tokens to be transferred,
       * @param memo - the memo string to accompany the transaction.
       */
      transfer(from: Name, to: Name, quantity: Asset, memo: string): void;
      /**
       * Allows `ram_payer` to create an account `owner` with zero balance for
       * token `symbol` at the expense of `ram_payer`.
       *
       * @param owner - the account to be created,
       * @param symbol - the token to be payed with by `ram_payer`,
       * @param ram_payer - the account that supports the cost of this action.
       *
       */
      open(owner: Name, symbol: Symbol, ram_payer: Name): void;
      /**
       * This action is the opposite for open, it closes the account `owner`
       * for token `symbol`.
       *
       * @param owner - the owner account to execute the close action for,
       * @param symbol - the symbol of the token to execute the close action for.
       *
       * @pre The pair of owner plus symbol has to exist otherwise no action is executed,
       * @pre If the pair of owner plus symbol exists, the balance has to be zero.
       */
      close(owner: Name, symbol: Symbol): void;
      subBalance(owner: Name, value: Asset): void;
      addBalance(owner: Name, value: Asset, ramPayer: Name): void;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/token/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/token";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/token/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/token";
  import { TableStore } from "proton-tsc/token";
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountDB;
  }
  export class StatDB extends _chain.MultiIndex<Stat> {
  }
  export class Stat implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): StatDB;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/token/target/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/token';
  import { AccountKV } from 'proton-tsc/token/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/token/token.contract' {
  import { Name, Asset, Symbol, Contract } from "proton-tsc";
  export class TokenContract extends Contract {
      /**
       * Allows `issuer` account to create a token in supply of `maximum_supply`. If validation is successful a new entry in statstable for token symbol scope gets created.
       *
       * @param issuer - the account that creates the token,
       * @param maximum_supply - the maximum supply set for the token created.
       *
       * @pre Token symbol has to be valid,
       * @pre Token symbol must not be already created,
       * @pre maximum_supply has to be smaller than the maximum supply allowed by the system: 1^62 - 1.
       * @pre Maximum supply must be positive;
       */
      create(issuer: Name, maximum_supply: Asset): void;
      /**
       *  This action issues to `to` account a `quantity` of tokens.
       *
       * @param to - the account to issue tokens to, it must be the same as the issuer,
       * @param quantity - the amount of tokens to be issued,
       * @memo - the memo string that accompanies the token issue transaction.
       */
      issue(to: Name, quantity: Asset, memo: string): void;
      /**
       * The opposite for create action, if all validations succeed,
       * it debits the statstable.supply amount.
       *
       * @param quantity - the quantity of tokens to retire,
       * @param memo - the memo string to accompany the transaction.
       */
      retire(quantity: Asset, memo: string): void;
      /**
       * Allows `from` account to transfer to `to` account the `quantity` tokens.
       * One account is debited and the other is credited with quantity tokens.
       *
       * @param from - the account to transfer from,
       * @param to - the account to be transferred to,
       * @param quantity - the quantity of tokens to be transferred,
       * @param memo - the memo string to accompany the transaction.
       */
      transfer(from: Name, to: Name, quantity: Asset, memo: string): void;
      /**
       * Allows `ram_payer` to create an account `owner` with zero balance for
       * token `symbol` at the expense of `ram_payer`.
       *
       * @param owner - the account to be created,
       * @param symbol - the token to be payed with by `ram_payer`,
       * @param ram_payer - the account that supports the cost of this action.
       *
       */
      open(owner: Name, symbol: Symbol, ram_payer: Name): void;
      /**
       * This action is the opposite for open, it closes the account `owner`
       * for token `symbol`.
       *
       * @param owner - the owner account to execute the close action for,
       * @param symbol - the symbol of the token to execute the close action for.
       *
       * @pre The pair of owner plus symbol has to exist otherwise no action is executed,
       * @pre If the pair of owner plus symbol exists, the balance has to be zero.
       */
      close(owner: Name, symbol: Symbol): void;
      subBalance(owner: Name, value: Asset): void;
      addBalance(owner: Name, value: Asset, ramPayer: Name): void;
  }

}
declare module 'proton-tsc/token/token.inline' {
  import { ActionWrapper, Name, ExtendedAsset, Asset, InlineAction } from "proton-tsc";
  export const transfer: ActionWrapper;
  export class TokenTransfer extends InlineAction {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/token/token.spec' {
  export {};

}
declare module 'proton-tsc/token/token.tables' {
  /// <reference types="assembly" />
  import { Asset, Name, Table, Symbol } from "proton-tsc";
  import { TableStore } from "proton-tsc";
  /**
   * Tables
   */
  export class Account extends Table {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
  }
  export class Stat extends Table {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/txid' {
  export * from 'proton-tsc/txid/txid.contract';

}
declare module 'proton-tsc/txid/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, U128, ExtendedSymbol } from "proton-tsc/txid";
  import { TableStore } from "proton-tsc/txid";
  export class AllowGlobalsSingletonDB extends _chain.MultiIndex<AllowGlobalsSingleton> {
  }
  export class AllowGlobalsSingleton implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean);
      static getSingleton(code: Name): Singleton<AllowGlobals>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<AllowGlobalsSingleton>;
  }
  export class AllowGlobals extends AllowGlobalsSingleton {
  }
  export class AllowedActorTableDB extends _chain.MultiIndex<AllowedActorTable> {
  }
  export class AllowedActorTable implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      static getTable(code: Name): TableStore<AllowedActor>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedActorTableDB;
  }
  export class AllowedActor extends AllowedActorTable {
  }
  export class AllowedTokenTableDB extends _chain.MultiIndex<AllowedTokenTable> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): _chain.IDX128;
  }
  export class AllowedTokenTable implements _chain.MultiIndexValue {
      index: u64;
      token: ExtendedSymbol;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(index?: u64, token?: ExtendedSymbol, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      get byToken(): U128;
      set byToken(value: U128);
      static getTable(code: Name): TableStore<AllowedToken>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AllowedTokenTableDB;
  }
  export class AllowedToken extends AllowedTokenTable {
  }

}
declare module 'proton-tsc/txid/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/txid";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/txid/target/atomicdata";
  export const ATOMICASSETS_CONTRACT: any;
  export class AdminColEdit implements _chain.Packer {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetVersion implements _chain.Packer {
      newVersion: string;
      constructor(newVersion?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddConfigToken implements _chain.Packer {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class TransferNfts implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateCollection implements _chain.Packer {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetCollectionData implements _chain.Packer {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveCollectionAuth implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AddNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class RemoveNotifyAccount implements _chain.Packer {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Setmarket_fee implements _chain.Packer {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ForbidNotify implements _chain.Packer {
      collection_name: Name;
      constructor(collection_name?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateSchema implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class ExtendSchema implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateTemplate implements _chain.Packer {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class LockTemplate implements _chain.Packer {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class MintAsset implements _chain.Packer {
      authorized_minter: Name;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      newasset_owner: Name;
      immutable_data: AtomicAttribute[];
      mutable_data: AtomicAttribute[];
      tokens_to_back: Asset[];
      constructor(authorized_minter?: Name, collection_name?: Name, schema_name?: Name, template_id?: i32, newasset_owner?: Name, immutable_data?: AtomicAttribute[], mutable_data?: AtomicAttribute[], tokens_to_back?: Asset[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class SetAssetData implements _chain.Packer {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Withdraw implements _chain.Packer {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BackAsset implements _chain.Packer {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class BurnAsset implements _chain.Packer {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CreateOffer implements _chain.Packer {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class CancelOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AcceptOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class DeclineOffer implements _chain.Packer {
      offer_id: u64;
      constructor(offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PayOfferRam implements _chain.Packer {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetmarket_fee(contract: Name, collection_name: Name, market_fee: f64): void;
  export function sendForbidNotify(contract: Name, collection_name: Name): void;
  export function sendCreateSchema(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, schema_format: AtomicFormat[]): void;
  export function sendExtendSchema(contract: Name, authorized_editor: Name, collection_name: Name, schema_name: Name, schema_format_extension: AtomicFormat[]): void;
  export function sendCreateTemplate(contract: Name, authorized_creator: Name, collection_name: Name, schema_name: Name, transferable: boolean, burnable: boolean, max_supply: u32, immutable_data: AtomicAttribute[]): void;
  export function sendLockTemplate(contract: Name, authorized_editor: Name, collection_name: Name, template_id: i32): void;
  export function sendMintAsset(contract: Name, authorized_minter: Name, collection_name: Name, schema_name: Name, template_id: i32, newasset_owner: Name, immutable_data: AtomicAttribute[], mutable_data: AtomicAttribute[], tokens_to_back: Asset[]): void;
  export function sendSetAssetData(contract: Name, authorized_editor: Name, asset_owner: Name, asset_id: u64, new_mutable_data: AtomicAttribute[]): void;
  export function sendWithdraw(contract: Name, owner: Name, token_to_withdraw: Asset): void;
  export function sendBackAsset(contract: Name, payer: Name, asset_owner: Name, asset_id: u64, token_to_back: Asset): void;
  export function sendBurnAsset(contract: Name, asset_owner: Name, asset_id: u64): void;
  export function sendCreateOffer(contract: Name, sender: Name, recipient: Name, sender_asset_ids: u64[], recipient_asset_ids: u64[], memo: string): void;
  export function sendCancelOffer(contract: Name, offer_id: u64): void;
  export function sendAcceptOffer(contract: Name, offer_id: u64): void;
  export function sendDeclineOffer(contract: Name, offer_id: u64): void;
  export function sendPayOfferRam(contract: Name, payer: Name, offer_id: u64): void;

}
declare module 'proton-tsc/txid/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Singleton, ExtendedSymbol, Asset } from "proton-tsc/txid";
  import { AtomicFormat } from "proton-tsc/txid/target/atomicdata";
  import { TableStore } from "proton-tsc/txid";
  export class CollectionsTableDB extends _chain.MultiIndex<CollectionsTable> {
  }
  export class CollectionsTable implements _chain.MultiIndexValue {
      collection_name: Name;
      author: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      serialized_data: u8[];
      constructor(collection_name?: Name, author?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Collections>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): CollectionsTableDB;
  }
  export class Collections extends CollectionsTable {
  }
  export class SchemasTableDB extends _chain.MultiIndex<SchemasTable> {
  }
  export class SchemasTable implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Schemas>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): SchemasTableDB;
  }
  export class Schemas extends SchemasTable {
  }
  export class TemplatesTableDB extends _chain.MultiIndex<TemplatesTable> {
  }
  export class TemplatesTable implements _chain.MultiIndexValue {
      template_id: i32;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      issued_supply: u32;
      immutable_serialized_data: u8[];
      constructor(template_id?: i32, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, issued_supply?: u32, immutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, collection_name: Name): TableStore<Templates>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): TemplatesTableDB;
  }
  export class Templates extends TemplatesTable {
  }
  export class AssetsTableDB extends _chain.MultiIndex<AssetsTable> {
  }
  export class AssetsTable implements _chain.MultiIndexValue {
      asset_id: u64;
      collection_name: Name;
      schema_name: Name;
      template_id: i32;
      ram_payer: Name;
      backed_tokens: Asset[];
      immutable_serialized_data: u8[];
      mutable_serialized_data: u8[];
      constructor(asset_id?: u64, collection_name?: Name, schema_name?: Name, template_id?: i32, ram_payer?: Name, backed_tokens?: Asset[], immutable_serialized_data?: u8[], mutable_serialized_data?: u8[]);
      get primary(): u64;
      static getTable(code: Name, owner: Name): TableStore<Assets>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AssetsTableDB;
  }
  export class Assets extends AssetsTable {
  }
  export class OffersTableDB extends _chain.MultiIndex<OffersTable> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class OffersTable implements _chain.MultiIndexValue {
      offer_id: u64;
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      ram_payer: Name;
      constructor(offer_id?: u64, sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string, ram_payer?: Name);
      get primary(): u64;
      get by_sender(): u64;
      set by_sender(value: u64);
      get by_recipient(): u64;
      set by_recipient(value: u64);
      static getTable(code: Name): TableStore<Offers>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): OffersTableDB;
  }
  export class Offers extends OffersTable {
  }
  export class ConfigSingletonDB extends _chain.MultiIndex<ConfigSingleton> {
  }
  export class ConfigSingleton implements _chain.MultiIndexValue {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
      static getSingleton(code: Name): Singleton<Config>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<ConfigSingleton>;
  }
  export class Config extends ConfigSingleton {
  }

}
declare module 'proton-tsc/txid/target/atomicdata' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  export class AtomicFormat implements _chain.Packer {
      name: string;
      type: string;
      constructor(name?: string, type?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicAttribute implements _chain.Packer {
      key: string;
      value: AtomicValue;
      constructor(key?: string, value?: AtomicValue);
      static eq(a: AtomicAttribute, b: AtomicAttribute): bool;
      static neq(a: AtomicAttribute, b: AtomicAttribute): bool;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AtomicValue implements _chain.Packer {
      _index: u8;
      value: usize;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static new<T>(value: T): AtomicValue;
      isi8(): bool;
      geti8(): i8;
      isi16(): bool;
      geti16(): i16;
      isi32(): bool;
      geti32(): i32;
      isi64(): bool;
      geti64(): i64;
      isu8(): bool;
      getu8(): u8;
      isu16(): bool;
      getu16(): u16;
      isu32(): bool;
      getu32(): u32;
      isu64(): bool;
      getu64(): u64;
      isfloat(): bool;
      getfloat(): f32;
      isdouble(): bool;
      getdouble(): f64;
      isstring(): bool;
      getstring(): string;
      isINT8_VEC(): bool;
      getINT8_VEC(): i8[];
      isINT16_VEC(): bool;
      getINT16_VEC(): i16[];
      isINT32_VEC(): bool;
      getINT32_VEC(): i32[];
      isINT64_VEC(): bool;
      getINT64_VEC(): i64[];
      isUINT8_VEC(): bool;
      getUINT8_VEC(): u8[];
      isUINT16_VEC(): bool;
      getUINT16_VEC(): u16[];
      isUINT32_VEC(): bool;
      getUINT32_VEC(): u32[];
      isUINT64_VEC(): bool;
      getUINT64_VEC(): u64[];
      isFLOAT_VEC(): bool;
      getFLOAT_VEC(): f32[];
      isDOUBLE_VEC(): bool;
      getDOUBLE_VEC(): f64[];
      isSTRING_VEC(): bool;
      getSTRING_VEC(): string[];
      get<T>(): T;
      is<T>(): bool;
  }
  export function unsignedFromVarintBytes(itr: u8[]): u64;
  export function toIntBytes(number: u64, byte_amount: u64): u8[];
  export function unsignedFromIntBytes(itr: u8[], original_bytes?: u64): u64;
  export function zigzagEncode(value: i64): u64;
  export function zigzagDecode(value: u64): i64;
  export function eraseAttribute(attributes: AtomicAttribute[], toErase: AtomicAttribute): void;
  export function toVarintBytes(number: u64, original_bytes?: u64): u8[];
  export function findIndexOfAttribute(attributes: AtomicAttribute[], key: string): i32;
  export function floatToBytes(float: f32): u8[];
  export function doubleToBytes(float: f64): u8[];
  export function stringToBytes(string: string): u8[];
  export function serialize_attribute(type: string, attr: AtomicValue): u8[];
  export function deserialize_attribute(type: string, itr: u8[]): AtomicValue;
  export function serialize(attr_map: AtomicAttribute[], format_lines: AtomicFormat[]): u8[];
  export function deserialize(data: u8[], format_lines: AtomicFormat[]): AtomicAttribute[];

}
declare module 'proton-tsc/txid/target/balance.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Asset, ExtendedAsset } from "proton-tsc/txid";
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class NftTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/txid/target/balance.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name } from "proton-tsc/txid";
  import { TableStore } from "proton-tsc/txid";
  export class BalanceTableDB extends _chain.MultiIndex<BalanceTable> {
  }
  export class BalanceTable implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<Balance>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): BalanceTableDB;
  }
  export class Balance extends BalanceTable {
  }

}
declare module 'proton-tsc/txid/target/base58' {
  /// <reference types="assembly" />
  /**
  * Encode Uint8Array as a base58 string.
  * @param bytes Byte array of type Uint8Array.
  */
  export function encode(source: Uint8Array): string;
  export function decodeUnsafe(source: string): u8[] | null;
  export function decode(source: string): u8[];

}
declare module 'proton-tsc/txid/target/escrow.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/txid";
  import { Escrow } from "proton-tsc/txid/target/escrow.tables";
  export class LogEscrow implements _chain.Packer {
      escrow: Escrow;
      status: string;
      constructor(escrow?: Escrow, status?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send a logescrow action to the blockchain
   * @param {Name} contract - Name of the contract that is sending the log
   * @param {Escrow} escrow - Escrow
   * @param {string} status - The status of the escrow.
   */
  export function sendLogEscrow(contract: Name, escrow: Escrow, status: string): void;

}
declare module 'proton-tsc/txid/target/escrow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { ExtendedAsset, Name, Singleton, TableStore } from "proton-tsc/txid";
  export class escrowGlobalDB extends _chain.MultiIndex<escrowGlobal> {
  }
  export class escrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      static getSingleton(code: Name): Singleton<EscrowGlobal>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): _chain.Singleton<escrowGlobal>;
  }
  export class EscrowGlobal extends escrowGlobal {
  }
  export class escrowDB extends _chain.MultiIndex<escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): _chain.IDX64;
  }
  export class escrow implements _chain.MultiIndexValue {
      id: u64;
      from: Name;
      to: Name;
      fromTokens: ExtendedAsset[];
      fromNfts: u64[];
      toTokens: ExtendedAsset[];
      toNfts: u64[];
      expiry: u32;
      constructor(id?: u64, from?: Name, to?: Name, fromTokens?: ExtendedAsset[], fromNfts?: u64[], toTokens?: ExtendedAsset[], toNfts?: u64[], expiry?: u32);
      get primary(): u64;
      get byFrom(): u64;
      set byFrom(value: u64);
      get byTo(): u64;
      set byTo(value: u64);
      static getTable(code: Name): TableStore<Escrow>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): escrowDB;
  }
  export class Escrow implements _chain.Packer {
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/txid/target/kv.constants' {
  import * as _chain from "as-chain";
  export const kv: _chain.Name;
  export const kvs: _chain.Name;
  export const updatevalues: _chain.ActionWrapper;
  export const removekeys: _chain.ActionWrapper;

}
declare module 'proton-tsc/txid/target/kv.contract' {
  /// <reference types="assembly" />
  import { Name, MultiIndex, Contract } from 'as-chain';
  import { KV, AccountKV } from 'proton-tsc/txid/target/kv.tables';
  export class KvContract extends Contract {
      kvsTable: MultiIndex<AccountKV>;
      updatevalues(actor: Name, values: KV[]): void;
      removekeys(actor: Name, keys: string[]): void;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/txid/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/txid";
  import { TableStore } from "proton-tsc/txid";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVDB extends _chain.MultiIndex<AccountKV> {
  }
  export class AccountKV implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVDB;
  }

}
declare module 'proton-tsc/txid/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/txid";
  export class RequestRandom implements _chain.Packer {
      customerId: u64;
      signingValue: u64;
      contract: Name;
      constructor(customerId?: u64, signingValue?: u64, contract?: Name);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/txid/target/rng.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/txid";
  import { TableStore } from "proton-tsc/txid";
  export class ResultsTableDB extends _chain.MultiIndex<ResultsTable> {
  }
  export class ResultsTable implements _chain.MultiIndexValue {
      customerId: u64;
      account: Name;
      randomValue: u64;
      constructor(customerId?: u64, account?: Name, randomValue?: u64);
      get primary(): u64;
      static getTable(code: Name): TableStore<Results>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): ResultsTableDB;
  }
  export class Results extends ResultsTable {
  }

}
declare module 'proton-tsc/txid/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset } from "proton-tsc/txid";
  export const transfer: any;
  export class TokenTransfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Send tokens from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void;

}
declare module 'proton-tsc/txid/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name, Symbol } from "proton-tsc/txid";
  import { TableStore } from "proton-tsc/txid";
  /**
   * Tables
   */
  export class accountDB extends _chain.MultiIndex<account> {
  }
  export class account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      static getTable(code: Name, accountName: Name): TableStore<Account>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): accountDB;
  }
  export class currency_statsDB extends _chain.MultiIndex<currency_stats> {
  }
  export class currency_stats implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      static getTable(code: Name, sym: Symbol): TableStore<Stat>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): currency_statsDB;
  }
  export class Account extends account {
  }
  export class Stat extends currency_stats {
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;

}
declare module 'proton-tsc/txid/target/txid.constants' {
  import * as _chain from "as-chain";
  /**
   * The name of the constant and the string must be exactly the same
   * for decorators to utilize it correctly
   */
  export const txid: _chain.Name;
  export const kvs: _chain.Name;
  export const getsizeandid: _chain.ActionWrapper;
  export const readaction: _chain.ActionWrapper;

}
declare module 'proton-tsc/txid/target/txid.contract' {
  /// <reference types="assembly" />
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc/txid';
  import { AccountKV } from 'proton-tsc/txid/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/txid/target/txid.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc/assembly";
  import { TableStore } from "proton-tsc/assembly";
  export class KV implements _chain.Packer {
      key: string;
      value: string;
      constructor(key?: string, value?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class AccountKVTableDB extends _chain.MultiIndex<AccountKVTable> {
  }
  export class AccountKVTable implements _chain.MultiIndexValue {
      account: Name;
      values: KV[];
      constructor(account?: Name, values?: KV[]);
      get primary(): u64;
      static getTable(code: Name): TableStore<AccountKV>;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope: _chain.Name): AccountKVTableDB;
  }
  export class AccountKV extends AccountKVTable {
  }

}
declare module 'proton-tsc/txid/txid.contract' {
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc';
  import { AccountKV } from 'proton-tsc/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }

}
declare module 'proton-tsc/txid/txid.spec' {
  export {};

}
declare module 'proton-tsc/external/rng/utils' {
  /// <reference types="node" />
  import crypto from 'crypto';
  export const privateKey: crypto.KeyObject;
  export const publicKey: crypto.KeyObject;
  export const sign: (data: string) => string;
  export const pubKeyData: {
      exponent: string;
      modulus: string;
  };

}
declare module 'proton-tsc/playground' {
  export {};

}
declare module 'proton-tsc/replace.config' {
  export const files: string;
  export const from: RegExp[];
  export const to: string[];

}
declare module 'proton-tsc/assembly' {
  import main = require('proton-tsc');
  export = main;
}