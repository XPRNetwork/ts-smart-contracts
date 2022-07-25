declare module 'proton-tsc/allow/allow.contract' {
  import { Name, Singleton, Contract, ExtendedSymbol, TableStore } from 'proton-tsc';
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
      setglobals(isPaused: boolean, isActorStrict: boolean, isTokenStrict: boolean, isTokensEnabled: boolean, isNftsEnabled: boolean, isContractsEnabled: boolean): void;
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
      protected checkContractIsNotPaused(): void;
      protected checkActorIsAllowed(actor: Name, message?: string): void;
      protected checkTokenIsAllowed(token: ExtendedSymbol, message?: string): void;
      protected checkNftsAreEnabled(message?: string): void;
      protected checkTokensAreEnabled(message?: string): void;
      protected findAllowedToken(token: ExtendedSymbol): AllowedToken | null;
      protected isTokenAllowed(token: ExtendedSymbol): boolean;
      protected isActorAllowed(actor: Name): boolean;
      protected isTokensEnabled(): boolean;
      protected isNftsEnabled(): boolean;
      protected isContractsEnabled(): boolean;
      protected isContractPaused(): boolean;
  }

}
declare module 'proton-tsc/allow/allow.spec' {
  export {};

}
declare module 'proton-tsc/allow/allow.tables' {
  /// <reference types="assembly" />
  import { Name, Table, U128, ExtendedSymbol } from "proton-tsc";
  export class AllowGlobals extends Table {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      isTokensEnabled: boolean;
      isNftsEnabled: boolean;
      isContractsEnabled: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean, isTokensEnabled?: boolean, isNftsEnabled?: boolean, isContractsEnabled?: boolean);
  }
  export class AllowedActor extends Table {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
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
  }

}
declare module 'proton-tsc/allow/allow.utils' {
  import { ExtendedSymbol, U128 } from "proton-tsc";
  export const extendedSymbolToU128: (extSym: ExtendedSymbol) => U128;
  export const U128ToExtSym: (value: U128) => ExtendedSymbol;

}
declare module 'proton-tsc/allow/allow_test.contract' {
  import { Name, ExtendedSymbol } from 'proton-tsc';
  import { AllowContract } from 'proton-tsc/allow';
  export class AllowTestContract extends AllowContract {
      /**
       * Helper actions
       */
      testpaused(): void;
      testactor(actor: Name, message: string): void;
      testtoken(token: ExtendedSymbol, message: string): void;
  }

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
  import { Name, Singleton, Contract, ExtendedSymbol, TableStore } from 'proton-tsc/allow';
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
      setglobals(isPaused: boolean, isActorStrict: boolean, isTokenStrict: boolean, isTokensEnabled: boolean, isNftsEnabled: boolean, isContractsEnabled: boolean): void;
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
      protected checkContractIsNotPaused(): void;
      protected checkActorIsAllowed(actor: Name, message?: string): void;
      protected checkTokenIsAllowed(token: ExtendedSymbol, message?: string): void;
      protected checkNftsAreEnabled(message?: string): void;
      protected checkTokensAreEnabled(message?: string): void;
      protected findAllowedToken(token: ExtendedSymbol): AllowedToken | null;
      protected isTokenAllowed(token: ExtendedSymbol): boolean;
      protected isActorAllowed(actor: Name): boolean;
      protected isTokensEnabled(): boolean;
      protected isNftsEnabled(): boolean;
      protected isContractsEnabled(): boolean;
      protected isContractPaused(): boolean;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/allow/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, U128, ExtendedSymbol } from "proton-tsc/allow";
  export class AllowGlobalsDB extends _chain.MultiIndex<AllowGlobals> {
  }
  export class AllowGlobals implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      isTokensEnabled: boolean;
      isNftsEnabled: boolean;
      isContractsEnabled: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean, isTokensEnabled?: boolean, isNftsEnabled?: boolean, isContractsEnabled?: boolean);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<AllowGlobals>;
  }
  export class AllowedActorDB extends _chain.MultiIndex<AllowedActor> {
  }
  export class AllowedActor implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AllowedActorDB;
  }
  export class AllowedTokenDB extends _chain.MultiIndex<AllowedToken> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AllowedTokenDB;
  }

}
declare module 'proton-tsc/allow/target/allow_test.contract' {
  /// <reference types="assembly" />
  import { Name, ExtendedSymbol } from 'proton-tsc/allow';
  import { AllowContract } from 'proton-tsc/allow/target';
  export class AllowTestContract extends AllowContract {
      /**
       * Helper actions
       */
      testpaused(): void;
      testactor(actor: Name, message: string): void;
      testtoken(token: ExtendedSymbol, message: string): void;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/allow/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/allow/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc";
  export const RNG_CONTRACT: _chain.Name;
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/atomicassets/atomicassets.constants' {
  /// <reference types="assembly" />
  import { Name } from "proton-tsc";
  export const MAX_MARKET_FEE: f64;
  export const RESERVED: u64;
  export const ATOMICASSETS_CONTRACT: Name;

}
declare module 'proton-tsc/atomicassets/atomicassets.contract' {
  export {};

}
declare module 'proton-tsc/atomicassets/atomicassets.inline' {
  /// <reference types="assembly" />
  import { Name, Symbol, Asset, ActionData } from "proton-tsc";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/atomicassets/atomicdata";
  export class TransferNfts extends ActionData {
      from: Name;
      to: Name;
      asset_ids: u64[];
      memo: string;
      constructor(from?: Name, to?: Name, asset_ids?: u64[], memo?: string);
  }
  export class AdminColEdit extends ActionData {
      collectionFormatExtension: AtomicFormat[];
      constructor(collectionFormatExtension?: AtomicFormat[]);
  }
  export class SetVersion extends ActionData {
      newVersion: string;
      constructor(newVersion?: string);
  }
  export class AddConfigToken extends ActionData {
      tokenContract: Name;
      tokenSymbol: Symbol;
      constructor(tokenContract?: Name, tokenSymbol?: Symbol);
  }
  export class CreateCollection extends ActionData {
      author: Name;
      collection_name: Name;
      allow_notify: boolean;
      authorized_accounts: Name[];
      notify_accounts: Name[];
      market_fee: f64;
      data: AtomicAttribute[];
      constructor(author?: Name, collection_name?: Name, allow_notify?: boolean, authorized_accounts?: Name[], notify_accounts?: Name[], market_fee?: f64, data?: AtomicAttribute[]);
  }
  export class SetCollectionData extends ActionData {
      collection_name: Name;
      data: AtomicAttribute[];
      constructor(collection_name?: Name, data?: AtomicAttribute[]);
  }
  export class AddCollectionAuth extends ActionData {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
  }
  export class RemoveCollectionAuth extends ActionData {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
  }
  export class AddNotifyAccount extends ActionData {
      collection_name: Name;
      account_to_add: Name;
      constructor(collection_name?: Name, account_to_add?: Name);
  }
  export class RemoveNotifyAccount extends ActionData {
      collection_name: Name;
      account_to_remove: Name;
      constructor(collection_name?: Name, account_to_remove?: Name);
  }
  export class SetMarketFee extends ActionData {
      collection_name: Name;
      market_fee: f64;
      constructor(collection_name?: Name, market_fee?: f64);
  }
  export class ForbidNotify extends ActionData {
      collection_name: Name;
      constructor(collection_name?: Name);
  }
  export class CreateSchema extends ActionData {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format: AtomicFormat[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, schema_format?: AtomicFormat[]);
  }
  export class ExtendSchema extends ActionData {
      authorized_editor: Name;
      collection_name: Name;
      schema_name: Name;
      schema_format_extension: AtomicFormat[];
      constructor(authorized_editor?: Name, collection_name?: Name, schema_name?: Name, schema_format_extension?: AtomicFormat[]);
  }
  export class CreateTemplate extends ActionData {
      authorized_creator: Name;
      collection_name: Name;
      schema_name: Name;
      transferable: boolean;
      burnable: boolean;
      max_supply: u32;
      immutable_data: AtomicAttribute[];
      constructor(authorized_creator?: Name, collection_name?: Name, schema_name?: Name, transferable?: boolean, burnable?: boolean, max_supply?: u32, immutable_data?: AtomicAttribute[]);
  }
  export class LockTemplate extends ActionData {
      authorized_editor: Name;
      collection_name: Name;
      template_id: i32;
      constructor(authorized_editor?: Name, collection_name?: Name, template_id?: i32);
  }
  export class MintAsset extends ActionData {
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
  export class SetAssetData extends ActionData {
      authorized_editor: Name;
      asset_owner: Name;
      asset_id: u64;
      new_mutable_data: AtomicAttribute[];
      constructor(authorized_editor?: Name, asset_owner?: Name, asset_id?: u64, new_mutable_data?: AtomicAttribute[]);
  }
  export class Withdraw extends ActionData {
      owner: Name;
      token_to_withdraw: Asset;
      constructor(owner?: Name, token_to_withdraw?: Asset);
  }
  export class BackAsset extends ActionData {
      payer: Name;
      asset_owner: Name;
      asset_id: u64;
      token_to_back: Asset;
      constructor(payer?: Name, asset_owner?: Name, asset_id?: u64, token_to_back?: Asset);
  }
  export class BurnAsset extends ActionData {
      asset_owner: Name;
      asset_id: u64;
      constructor(asset_owner?: Name, asset_id?: u64);
  }
  export class CreateOffer extends ActionData {
      sender: Name;
      recipient: Name;
      sender_asset_ids: u64[];
      recipient_asset_ids: u64[];
      memo: string;
      constructor(sender?: Name, recipient?: Name, sender_asset_ids?: u64[], recipient_asset_ids?: u64[], memo?: string);
  }
  export class CancelOffer extends ActionData {
      offer_id: u64;
      constructor(offer_id?: u64);
  }
  export class AcceptOffer extends ActionData {
      offer_id: u64;
      constructor(offer_id?: u64);
  }
  export class DeclineOffer extends ActionData {
      offer_id: u64;
      constructor(offer_id?: u64);
  }
  export class PayOfferRam extends ActionData {
      payer: Name;
      offer_id: u64;
      constructor(payer?: Name, offer_id?: u64);
  }
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, newVersion: string): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetMarketFee(contract: Name, collection_name: Name, market_fee: f64): void;
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
  import { Name, Table, ExtendedSymbol, Asset } from "proton-tsc";
  import { AtomicFormat } from "proton-tsc/atomicassets/atomicdata";
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
  }
  export class Schemas extends Table {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
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
  }
  export class Config extends Table {
      asset_counter: u64;
      template_counter: u32;
      offer_counter: u64;
      collection_format: AtomicFormat[];
      supported_tokens: ExtendedSymbol[];
      constructor(asset_counter?: u64, template_counter?: u32, offer_counter?: u64, collection_format?: AtomicFormat[], supported_tokens?: ExtendedSymbol[]);
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
  export * from 'proton-tsc/atomicassets/atomicassets.inline';
  export * from 'proton-tsc/atomicassets/atomicassets.tables';
  export * from 'proton-tsc/atomicassets/atomicdata';
  export * from 'proton-tsc/atomicassets/base58';
  export * from 'proton-tsc/atomicassets/checkformat';

}
declare module 'proton-tsc/atomicassets/target/atomicassets.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/atomicassets/target/atomicassets.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedSymbol, Asset } from "proton-tsc/atomicassets";
  import { AtomicFormat } from "proton-tsc/atomicassets/target/atomicdata";
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): SchemasDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): TemplatesDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): OffersDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<Config>;
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
declare module 'proton-tsc/atomicassets/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

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
      withdrawAdmin(actor: Name, tokens: ExtendedAsset[], nfts: u64[], memo: string): void;
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
  export class Balance extends Table {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
  }

}
declare module 'proton-tsc/balance/balance.utils' {
  /// <reference types="assembly" />
  import { ExtendedAsset, Name } from "proton-tsc";
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
  export function skipDepositFrom(from: Name, currentContract: Name): boolean;

}
declare module 'proton-tsc/balance' {
  export * from 'proton-tsc/balance/balance.contract';
  export * from 'proton-tsc/balance/balance.tables';
  export * from 'proton-tsc/balance/balance.utils';

}
declare module 'proton-tsc/balance/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, U128, ExtendedSymbol } from "proton-tsc/balance";
  export class AllowGlobalsDB extends _chain.MultiIndex<AllowGlobals> {
  }
  export class AllowGlobals implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      isTokensEnabled: boolean;
      isNftsEnabled: boolean;
      isContractsEnabled: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean, isTokensEnabled?: boolean, isNftsEnabled?: boolean, isContractsEnabled?: boolean);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<AllowGlobals>;
  }
  export class AllowedActorDB extends _chain.MultiIndex<AllowedActor> {
  }
  export class AllowedActor implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AllowedActorDB;
  }
  export class AllowedTokenDB extends _chain.MultiIndex<AllowedToken> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AllowedTokenDB;
  }

}
declare module 'proton-tsc/balance/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/balance";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/balance/target/atomicdata";
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
  export class SetMarketFee implements _chain.Packer {
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
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, newVersion: string): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetMarketFee(contract: Name, collection_name: Name, market_fee: f64): void;
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
  import { Name, ExtendedSymbol, Asset } from "proton-tsc/balance";
  import { AtomicFormat } from "proton-tsc/balance/target/atomicdata";
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): SchemasDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): TemplatesDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): OffersDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<Config>;
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
      withdrawAdmin(actor: Name, tokens: ExtendedAsset[], nfts: u64[], memo: string): void;
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
  export class BalanceDB extends _chain.MultiIndex<Balance> {
  }
  export class Balance implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): BalanceDB;
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
declare module 'proton-tsc/balance/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/balance/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc";
  export const RNG_CONTRACT: _chain.Name;
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/balance/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset, Symbol } from "proton-tsc/balance";
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AccountDB;
  }
  export class StatDB extends _chain.MultiIndex<Stat> {
  }
  export class Stat implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): StatDB;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;
  export class Transfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Issue implements _chain.Packer {
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Retire implements _chain.Packer {
      quantity: Asset;
      memo: string;
      constructor(quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Issue token
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendIssue(tokenContract: Name, issuer: Name, to: Name, quantity: Asset, memo: string): void;
  /**
   * Retire token
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendRetire(tokenContract: Name, retiree: Name, quantity: Asset, memo: string): void;
  /**
   * Send token from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferToken(tokenContract: Name, from: Name, to: Name, quantity: Asset, memo: string): void;
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
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
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
declare module 'proton-tsc/balance/target/transfer' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc";
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
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;

}
declare module 'proton-tsc/balance/target/utils' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/balance/atomicdata";
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
  export class SetMarketFee implements _chain.Packer {
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
  export function sendSetVersion(contract: Name, newVersion: string): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetMarketFee(contract: Name, collection_name: Name, market_fee: f64): void;
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
declare module 'proton-tsc/bls/bls.contract' {
  export {};

}
declare module 'proton-tsc/bls/bls.spec' {
  export {};

}
declare module 'proton-tsc/bls/g1' {
  /// <reference types="assembly" />
  import { U256 } from "proton-tsc/chain";
  /**
   * @title BN256G1 Curve Library
   * @dev Library providing arithmetic operations over G1 in bn256.
   * Provides additional methods like pairing and pairing_batch
   * Heavily influenced by https://github.com/PhilippSchindler/ethdkg
   * Calls to assembly are public and not external because assembly cannot be applied on calldata
   * @author Witnet Foundation
   */
  export class BN256G1 {
      GX: U256;
      GY: U256;
      AA: U256;
      BB: U256;
      PP: U256;
      NN: U256;
      LAST_MULTIPLE_OF_PP_LOWER_THAN_2_256: U256;
      isOnCurve(x: U256, y: U256): boolean;
      fromCompressed(_point: u8[]): U256[];
      hashToTryAndIncrement(_message: u8[]): U256[];
      deriveY(_yByte: u8, _x: U256): U256;
  }

}
declare module 'proton-tsc/bls/g2' {
  import { U256 } from "proton-tsc/chain";
  /**
   * @title Elliptic curve operations on twist points on bn256 (G2)
   * @dev Adaptation of https://github.com/musalbas/solidity-BN256G2 to 0.6.0
   */
  export class BN256G2 {
      /**
      * @notice Add two twist points
      * @param pt1xx Coefficient 1 of x on point 1
      * @param pt1xy Coefficient 2 of x on point 1
      * @param pt1yx Coefficient 1 of y on point 1
      * @param pt1yy Coefficient 2 of y on point 1
      * @param pt2xx Coefficient 1 of x on point 2
      * @param pt2xy Coefficient 2 of x on point 2
      * @param pt2yx Coefficient 1 of y on point 2
      * @param pt2yy Coefficient 2 of y on point 2
      * @return (pt3xx, pt3xy, pt3yx, pt3yy)
      */
      fecTwistAdd(pt1xx: U256, pt1xy: U256, pt1yx: U256, pt1yy: U256, pt2xx: U256, pt2xy: U256, pt2yx: U256, pt2yy: U256): U256[];
      /**
      * @notice Multiply a twist point by a scalar
      * @param s     Scalar to multiply by
      * @param pt1xx Coefficient 1 of x
      * @param pt1xy Coefficient 2 of x
      * @param pt1yx Coefficient 1 of y
      * @param pt1yy Coefficient 2 of y
      * @return (pt2xx, pt2xy, pt2yx, pt2yy)
      */
      ecTwistMul(s: U256, pt1xx: U256, pt1xy: U256, pt1yx: U256, pt1yy: U256): U256[];
      /**
      * @notice Get the field modulus
      * @return The field modulus
      */
      getFieldModulus(): U256;
      /**
      * @notice FQ2*FQ2 multiplication operation
      * @param xx First FQ2 operands first coordinate
      * @param xy First FQ2 operands second coordinate
      * @param yx Second FQ2 operands first coordinate
      * @param yy Second FQ2 operands second coordinate
      * @return [xx*yx-xy*yy, xx*yy+xy*yx]
      */
      _fq2mul(xx: U256, xy: U256, yx: U256, yy: U256): U256[];
      /**
      * @notice Fq2*k multiplication operation
      * @param xx FQ2 operands first coordinate
      * @param xy FQ2 operands second coordinate
      * @param k scalar to multiply with
      * @return [xx*k, xy*k]
      */
      _fq2muc(xx: U256, xy: U256, k: U256): U256[];
      /**
      * @notice FQ2+FQ2 addition operation
      * @param xx First FQ2 operands first coordinate
      * @param xy First FQ2 operands second coordinate
      * @param yx Second FQ2 operands first coordinate
      * @param yy Second FQ2 operands second coordinate
      * @return [xx+yx, xy+yy]f
      */
      _fq2add(xx: U256, xy: U256, yx: U256, yy: U256): U256[];
      /**
      * @notice FQ2-FQ2 substraction operation
      * @param xx First FQ2 operands first coordinate
      * @param xy First FQ2 operands second coordinate
      * @param yx Second FQ2 operands first coordinate
      * @param yy Second FQ2 operands second coordinate
      * @return [xx-yx, xy-yy]
      */
      _fq2sub(xx: U256, xy: U256, yx: U256, yy: U256): U256[];
      /**
      * @notice FQ2/FQ2 division operation
      * @param xx First FQ2 operands first coordinate
      * @param xy First FQ2 operands second coordinate
      * @param yx Second FQ2 operands first coordinate
      * @param yy Second FQ2 operands second coordinate
      * @return [xx, xy] * Inv([yx, yy])
      */
      _fq2div(xx: U256, xy: U256, yx: U256, yy: U256): U256[];
      /**
      * @notice 1/FQ2 inverse operation
      * @param x FQ2 operands first coordinate
      * @param y FQ2 operands second coordinate
      * @return Inv([xx, xy])
      */
      _fq2inv(x: U256, y: U256): U256[];
      /**
      * @notice Checks if FQ2 is on G2
      * @param xx First FQ2 operands first coordinate
      * @param xy First FQ2 operands second coordinate
      * @param yx Second FQ2 operands first coordinate
      * @param yy Second FQ2 operands second coordinate
      * @return True if the FQ2 is on G2
      */
      _isOnCurve(xx: U256, xy: U256, yx: U256, yy: U256): boolean;
      /**
      * @notice Calculates the modular inverse of a over n
      * @param a The operand to calcualte the inverse of
      * @param n The modulus
      * @return result Inv(a)modn
      **/
      _modInv(a: U256, n: U256): U256;
      /**
      * @notice Converts a point from jacobian to affine
      * @param pt1xx First point x real coordinate
      * @param pt1xy First point x imaginary coordinate
      * @param pt1yx First point y real coordinate
      * @param pt1yy First point y imaginary coordinate
      * @param pt1zx First point z real coordinate
      * @param pt1zy First point z imaginary coordinate
      * @return pt2xx (x real affine coordinate)
                pt2xy (x imaginary affine coordinate)
                pt2yx (y real affine coordinate)
                pt1zy (y imaginary affine coordinate)
      **/
      _fromJacobian(pt1xx: U256, pt1xy: U256, pt1yx: U256, pt1yy: U256, pt1zx: U256, pt1zy: U256): U256[];
      /**
      * @notice Adds two points in jacobian coordinates
      * @param pt1xx First point x real coordinate
      * @param pt1xy First point x imaginary coordinate
      * @param pt1yx First point y real coordinate
      * @param pt1yy First point y imaginary coordinate
      * @param pt1zx First point z real coordinate
      * @param pt1zy First point z imaginary coordinate
      * @param pt2xx Second point x real coordinate
      * @param pt2xy Second point x imaginary coordinate
      * @param pt2yx Second point y real coordinate
      * @param pt2yy Second point y imaginary coordinate
      * @param pt2zx Second point z real coordinate
      * @param pt2zy Second point z imaginary coordinate
      * @return pt3 = pt1+pt2 in jacobian
      **/
      ecTwistAddJacobian(pt1xx: U256, pt1xy: U256, pt1yx: U256, pt1yy: U256, pt1zx: U256, pt1zy: U256, pt2xx: U256, pt2xy: U256, pt2yx: U256, pt2yy: U256, pt2zx: U256, pt2zy: U256): U256[];
      /**
      * @notice Doubls a point in jacobian coordinates
      * @param pt1xx Point x real coordinate
      * @param pt1xy Point x imaginary coordinate
      * @param pt1yx Point y real coordinate
      * @param pt1yy Point y imaginary coordinate
      * @param pt1zx Point z real coordinate
      * @param pt1zy Point z imaginary coordinate
      * @return pt2xx, pt2xy, pt2yx, pt2yy, pt2zx, pt2zy the coordinates of pt2 = 2*pt1
      **/
      _ecTwistDoubleJacobian(pt1xx: U256, pt1xy: U256, pt1yx: U256, pt1yy: U256, pt1zx: U256, pt1zy: U256): U256[];
      /**
      * @notice Doubls a point in jacobian coordinates
      * @param d scalar to multiply the point with
      * @param pt1xx Point x real coordinate
      * @param pt1xy Point x imaginary coordinate
      * @param pt1yx Point y real coordinate
      * @param pt1yy Point y imaginary coordinate
      * @param pt1zx Point z real coordinate
      * @param pt1zy Point z imaginary coordinate
      * @return a point representing pt2 = d*pt1 in jacobian coordinates
      **/
      _ecTwistMulJacobian(d: U256, pt1xx: U256, pt1xy: U256, pt1yx: U256, pt1yy: U256, pt1zx: U256, pt1zy: U256): U256[];
  }

}
declare module 'proton-tsc/bls/lib' {
  /// <reference types="assembly" />
  import { U256 } from "proton-tsc/chain";
  export class EllipticCurve {
      U255_MAX_PLUS_1: U256;
      invMod(_x: U256, _pp: U256): U256;
      expMod(_base: U256, _exp: U256, _pp: U256): U256;
      toAffine(_x: U256, _y: U256, _z: U256, _pp: U256): U256[];
      deriveY(_prefix: u8, _x: U256, _aa: U256, _bb: U256, _pp: U256): U256;
      isOnCurve(_x: U256, _y: U256, _aa: U256, _bb: U256, _pp: U256): boolean;
      ecInv(_x: U256, _y: U256, _pp: U256): U256[];
      ecAdd(_x1: U256, _y1: U256, _x2: U256, _y2: U256, _aa: U256, _pp: U256): U256[];
      ecSub(_x1: U256, _y1: U256, _x2: U256, _y2: U256, _aa: U256, _pp: U256): U256[];
      ecMul(_k: U256, _x: U256, _y: U256, _aa: U256, _pp: U256): U256[];
      jacAdd(_x1: U256, _y1: U256, _z1: U256, _x2: U256, _y2: U256, _z2: U256, _pp: U256): U256[];
      jacDouble(_x: U256, _y: U256, _z: U256, _aa: U256, _pp: U256): U256[];
      jacMul(_d: U256, _x: U256, _y: U256, _z: U256, _aa: U256, _pp: U256): U256[];
  }

}
declare module 'proton-tsc/bls/math' {
  /// <reference types="assembly" />
  import { U256 } from "proton-tsc/chain";
  export function __umulq128(xl: u64, xh: u64, yl: u64, yh: u64): U256;
  export function __mulmod256(xl1: u64, xl2: u64, xh1: u64, xh2: u64, yl1: u64, yl2: u64, yh1: u64, yh2: u64, ml1: u64, ml2: u64, mh1: u64, mh2: u64): U256;
  export function __mod256(r1: u64, r2: u64, r3: u64, r4: u64, r5: u64, r6: u64, r7: u64, r8: u64, ml1: u64, ml2: u64, mh1: u64, mh2: u64): U256;
  export function __divs256(xl1: u64, xl2: u64, xh1: u64, xh2: u64, yl1: u64, yl2: u64, yh1: u64, yh2: u64): U256;
  export function __umuls256(xl1: u64, xl2: u64, xh1: u64, xh2: u64, yl1: u64, yl2: u64, yh1: u64, yh2: u64): U256;
  export function multiply(a: U256, b: U256): U256;
  export function divide(a: U256, b: U256): U256;
  export function mod(x: U256, m: U256): U256;
  export function mulmod(x: U256, y: U256, m: U256): U256;
  export function addmod(x: U256, y: U256, m: U256): U256;
  export function submod(a: U256, b: U256, n: U256): U256;
  export function basicExp(x: U256, y: boolean): U256;

}
declare module 'proton-tsc/bls/plonk' {
  export {};

}
declare module 'proton-tsc/bls/target/bls.contract' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/bls/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/chain' {
  export { U128, U256, I128 } from "as-chain";
  export { VarInt32, VarUint32, calcPackedVarUint32Length } from "as-chain";
  export { DBI64, PrimaryIterator } from "as-chain";
  export { IDX64 } from "as-chain";
  export { IDXF64 } from "as-chain";
  export { IDXF128 } from "as-chain";
  export { IDX128 } from "as-chain";
  export { IDX256 } from "as-chain";
  export { VariantValue } from "as-chain";
  export { Optional, OptionalNumber, OptionalString } from "as-chain";
  export { BinaryExtension } from "as-chain";
  export { assert, check, currentBlockNum, currentTimePoint, currentTime, currentTimeMs, currentTimeSec, isFeatureActivated, } from "as-chain";
  export { Microseconds, TimePoint, TimePointSec, BlockTimestamp } from "as-chain";
  export { prints, printui, print, printString, printArray, printHex, printi, printI128, printU128, printsf, printdf, printqf, printn, } from "as-chain";
  export { IDXDB, SecondaryType, SecondaryValue, SecondaryIterator, newSecondaryValue_u64, newSecondaryValue_U128, newSecondaryValue_U256, newSecondaryValue_f64, getSecondaryValue_u64, getSecondaryValue_U128, getSecondaryValue_U256, getSecondaryValue_f64, } from "as-chain";
  export { MultiIndex, MultiIndexValue, SAME_PAYER } from "as-chain";
  export { Contract, Table, InlineAction, ActionData, Variant } from "as-chain";
  export { getSender, readActionData, unpackActionData, actionDataSize, requireRecipient, requireAuth, hasAuth, requireAuth2, isAccount, publicationTime, currentReceiver, getCodeHash, GetCodeHashResult, } from "as-chain";
  export { Name, EMPTY_NAME } from "as-chain";
  export { Action, PermissionLevel } from "as-chain";
  export { Asset, ExtendedAsset, Symbol, SymbolCode, ExtendedSymbol, isValid } from "as-chain";
  export { sendDeferred, cancelDeferred, readTransaction, transactionSize, taposBlockNum, taposBlockPrefix, transactionExpiration, getAction, getContextFreeData, TransactionExtension, Transaction, } from "as-chain";
  export { Checksum160, Checksum256, Checksum512, ECCPublicKey, ECCUncompressedPublicKey, UserPresence, WebAuthNPublicKey, PublicKeyType, PublicKey, Signature, recoverKey, assertRecoverKey, k1Recover, ripemd160, sha1, sha256, sha512, sha3, keccak, blake2, assertRipemd160, assertSha1, assertSha256, assertSha512, assertSha3, assertKeccak, AltBn128G1, AltBn128G2, AltBn128Pair, bn128Add, bn128Mul, bn128Pair, modExp } from "as-chain";
  export { Packer, Encoder, Decoder, } from "as-chain";
  export { Utils } from "as-chain";

}
declare module 'proton-tsc/escrow/escrow.contract' {
  export {};

}
declare module 'proton-tsc/escrow/escrow.inline' {
  import { Name, Table } from "proton-tsc";
  import { Escrow } from "proton-tsc/escrow/escrow.tables";
  export namespace ESCROW_STATUS {
      const START = "start";
      const FILL = "fill";
      const CANCEL = "cancel";
  }
  export type ESCROW_STATUS = string;
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
  import { ExtendedAsset, Name, Table } from "proton-tsc";
  export class EscrowGlobal extends Table {
      escrowId: u64;
      constructor(escrowId?: u64);
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
  }

}
declare module 'proton-tsc/escrow' {
  export * from 'proton-tsc/escrow/escrow.contract';
  export * from 'proton-tsc/escrow/escrow.tables';
  export * from 'proton-tsc/escrow/escrow.inline';

}
declare module 'proton-tsc/escrow/target/allow.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, U128, ExtendedSymbol } from "proton-tsc/escrow";
  export class AllowGlobalsDB extends _chain.MultiIndex<AllowGlobals> {
  }
  export class AllowGlobals implements _chain.MultiIndexValue {
      isPaused: boolean;
      isActorStrict: boolean;
      isTokenStrict: boolean;
      isTokensEnabled: boolean;
      isNftsEnabled: boolean;
      isContractsEnabled: boolean;
      constructor(isPaused?: boolean, isActorStrict?: boolean, isTokenStrict?: boolean, isTokensEnabled?: boolean, isNftsEnabled?: boolean, isContractsEnabled?: boolean);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<AllowGlobals>;
  }
  export class AllowedActorDB extends _chain.MultiIndex<AllowedActor> {
  }
  export class AllowedActor implements _chain.MultiIndexValue {
      actor: Name;
      isAllowed: boolean;
      isBlocked: boolean;
      constructor(actor?: Name, isAllowed?: boolean, isBlocked?: boolean);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AllowedActorDB;
  }
  export class AllowedTokenDB extends _chain.MultiIndex<AllowedToken> {
      get byTokenDB(): _chain.IDX128;
      updateByToken(idxIt: _chain.SecondaryIterator, value: U128, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AllowedTokenDB;
  }

}
declare module 'proton-tsc/escrow/target/atomicassets.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, Symbol, Asset } from "proton-tsc/escrow";
  import { AtomicAttribute, AtomicFormat } from "proton-tsc/escrow/target/atomicdata";
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
  export class SetMarketFee implements _chain.Packer {
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
  /**
   * Send a transfer action to the contract with the given parameters
   * @param {Name} from - Name of the account that is sending the NFTs
   * @param {Name} to - Name of the account to transfer the NFTs to.
   * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
   * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
   */
  export function sendTransferNfts(from: Name, to: Name, asset_ids: u64[], memo: string): void;
  export function sendAdminCollectionEdit(contract: Name, collectionFormatExtension: AtomicFormat[]): void;
  export function sendSetVersion(contract: Name, newVersion: string): void;
  export function sendAddConfigToken(contract: Name, tokenContract: Name, tokenSymbol: Symbol): void;
  export function sendCreateColllection(contract: Name, author: Name, collection_name: Name, allow_notify: boolean, authorized_accounts: Name[], notify_accounts: Name[], market_fee: f64, data: AtomicAttribute[]): void;
  export function sendSetCollectionData(contract: Name, collection_name: Name, data: AtomicAttribute[]): void;
  export function sendAddCollectionAuth(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveCollectionAuth(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendAddNotifyAccount(contract: Name, collection_name: Name, account_to_add: Name): void;
  export function sendRemoveNotifyAccount(contract: Name, collection_name: Name, account_to_remove: Name): void;
  export function sendSetMarketFee(contract: Name, collection_name: Name, market_fee: f64): void;
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
  import { Name, ExtendedSymbol, Asset } from "proton-tsc/escrow";
  import { AtomicFormat } from "proton-tsc/escrow/target/atomicdata";
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): CollectionsDB;
  }
  export class SchemasDB extends _chain.MultiIndex<Schemas> {
  }
  export class Schemas implements _chain.MultiIndexValue {
      schema_name: Name;
      format: AtomicFormat[];
      constructor(schema_name?: Name, format?: AtomicFormat[]);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): SchemasDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): TemplatesDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AssetsDB;
  }
  export class OffersDB extends _chain.MultiIndex<Offers> {
      get by_senderDB(): _chain.IDX64;
      get by_recipientDB(): _chain.IDX64;
      updateBy_sender(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
      updateBy_recipient(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): OffersDB;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<Config>;
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
  export class BalanceDB extends _chain.MultiIndex<Balance> {
  }
  export class Balance implements _chain.MultiIndexValue {
      account: Name;
      tokens: ExtendedAsset[];
      nfts: u64[];
      constructor(account?: Name, tokens?: ExtendedAsset[], nfts?: u64[]);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): BalanceDB;
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
  export namespace ESCROW_STATUS {
      const START = "start";
      const FILL = "fill";
      const CANCEL = "cancel";
  }
  export type ESCROW_STATUS = string;
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
  import { ExtendedAsset, Name } from "proton-tsc/escrow";
  export class EscrowGlobalDB extends _chain.MultiIndex<EscrowGlobal> {
  }
  export class EscrowGlobal implements _chain.MultiIndexValue {
      escrowId: u64;
      constructor(escrowId?: u64);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): _chain.Singleton<EscrowGlobal>;
  }
  export class EscrowDB extends _chain.MultiIndex<Escrow> {
      get byFromDB(): _chain.IDX64;
      get byToDB(): _chain.IDX64;
      updateByFrom(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
      updateByTo(idxIt: _chain.SecondaryIterator, value: u64, payer: Name): void;
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): EscrowDB;
  }

}
declare module 'proton-tsc/escrow/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/escrow/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc";
  export const RNG_CONTRACT: _chain.Name;
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/escrow/target/token.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, ExtendedAsset, Asset, Symbol } from "proton-tsc/escrow";
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AccountDB;
  }
  export class StatDB extends _chain.MultiIndex<Stat> {
  }
  export class Stat implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): StatDB;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;
  export class Transfer implements _chain.Packer {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Issue implements _chain.Packer {
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(to?: Name, quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Retire implements _chain.Packer {
      quantity: Asset;
      memo: string;
      constructor(quantity?: Asset, memo?: string);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  /**
   * Issue token
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendIssue(tokenContract: Name, issuer: Name, to: Name, quantity: Asset, memo: string): void;
  /**
   * Retire token
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendRetire(tokenContract: Name, retiree: Name, quantity: Asset, memo: string): void;
  /**
   * Send token from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferToken(tokenContract: Name, from: Name, to: Name, quantity: Asset, memo: string): void;
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
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
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
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
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
declare module 'proton-tsc' {
  export * from 'proton-tsc/chain';
  export * from 'proton-tsc/modules';

}
declare module 'proton-tsc/modules/authority' {
  /// <reference types="assembly" />
  import { PermissionLevel, PublicKey, Table, Name } from "proton-tsc";
  export class KeyWeight extends Table {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
  }
  export class PermissionLevelWeight extends Table {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
  }
  export class WaitWeight extends Table {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
  }
  export class Authority extends Table {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
  }

}
declare module 'proton-tsc/modules' {
  export { TableStore, Singleton } from 'proton-tsc/modules/store';
  export { SafeMath } from 'proton-tsc/modules/safemath';
  export { getTransactionId } from 'proton-tsc/modules/txid';
  export { KeyWeight, PermissionLevelWeight, WaitWeight, Authority } from 'proton-tsc/modules/authority';
  export { printStorage } from 'proton-tsc/modules/vert';

}
declare module 'proton-tsc/modules/safemath' {
  export * from 'proton-tsc/modules/safemath/safemath';

}
declare module 'proton-tsc/modules/safemath/safemath' {
  /// <reference types="assembly" />
  import { U128 } from "proton-tsc";
  export class SafeMath {
      static add(x: u64, y: u64): u64;
      static sub(x: u64, y: u64): u64;
      static mul(_x: u64, _y: u64): U128;
      static div(x: u64, y: u64): u64;
  }

}
declare module 'proton-tsc/modules/safemath/safemath.spec' {
  export {};

}
declare module 'proton-tsc/modules/safemath/safemath.test' {
  export {};

}
declare module 'proton-tsc/modules/safemath/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc/modules";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/modules/safemath/target/rng.inline' {
  /// <reference types="assembly" />
  import { Name } from "proton-tsc/modules";
  export const RNG_CONTRACT: any;
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/modules/safemath/target/safemath.test' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/modules/store' {
  export * from 'proton-tsc/modules/store/store';
  export * from 'proton-tsc/modules/store/singleton';

}
declare module 'proton-tsc/modules/store/singleton' {
  /// <reference types="assembly" />
  import { MultiIndex, Name, Table } from "proton-tsc";
  export class Singleton<T extends Table> {
      key: u64;
      mi: MultiIndex<T>;
      constructor(contract: Name, scope?: Name);
      set(value: T, payer: Name): void;
      getOrNull(): T | null;
      get(): T;
      remove(): void;
  }

}
declare module 'proton-tsc/modules/store/store' {
  /// <reference types="assembly" />
  import { Name, U128, U256, Table } from "proton-tsc";
  export const NO_AVAILABLE_PRIMARY_KEY: number;
  export const UNSET_NEXT_PRIMARY_KEY: number;
  export class TableStore<T extends Table> {
      private mi;
      nextPrimaryKey: u64;
      constructor(contract: Name, scope?: Name);
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
      getBySecondaryU64(secondaryValue: u64, index: u8): T | null;
      nextBySecondaryU64(value: T, index: u8): T | null;
      previousBySecondaryU64(value: T, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {U128} secondaryValue - U128 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryU128(secondaryValue: U128, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {u256} secondaryValue - u256 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryU256(secondaryValue: U256, index: u8): T | null;
      /**
       * Given a secondary key, find the first table element that matches secondary value
       * @param {f64} secondaryValue - f64 - the secondary value to search for
       * @param {u8} index - The index to search in.
       * @returns The table element.
       */
      getBySecondaryF64(secondaryValue: f64, index: u8): T | null;
  }

}
declare module 'proton-tsc/modules/store/store.spec' {
  export {};

}
declare module 'proton-tsc/modules/store/store.test' {
  export {};

}
declare module 'proton-tsc/modules/store/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc/modules";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/modules/store/target/store.test' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/modules/txid' {
  import { Checksum256 } from "proton-tsc";
  export function getTransactionId(): Checksum256;

}
declare module 'proton-tsc/modules/txid/target/kv.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name, TableStore } from "proton-tsc";
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
declare module 'proton-tsc/modules/txid/target/txid.contract' {
  /// <reference types="assembly" />
  import { Name, Contract, Checksum256, TableStore } from 'proton-tsc';
  import { AccountKV } from 'proton-tsc/modules/txid/kv';
  export class TxIdContract extends Contract {
      kvsTable: TableStore<AccountKV>;
      getsizeandid(actor: Name): void;
      readaction(): void;
      getTxid(): Checksum256;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/modules/vert' {
  export function printStorage(): void;

}
declare module 'proton-tsc/oracles' {
  export * from 'proton-tsc/oracles/oracles.tables';
  export * from 'proton-tsc/oracles/oracles.inline';

}
declare module 'proton-tsc/oracles/oracles.inline' {
  import { Name } from "proton-tsc";
  export const ORACLES_CONTRACT: Name;

}
declare module 'proton-tsc/oracles/oracles.tables' {
  /// <reference types="assembly" />
  import { Name, Table, TimePoint } from "proton-tsc";
  export class DataVariant extends Table {
      private d_string;
      private d_uint64_t;
      private d_double;
      constructor(d_string?: string | null, d_uint64_t?: u64, d_double?: f64);
      get dataType(): string;
      get stringValue(): string;
      get u64Value(): u64;
      get f64Value(): f64;
  }
  export class ProviderPoint extends Table {
      provider: Name;
      time: TimePoint;
      data: DataVariant;
      constructor(provider?: Name, time?: TimePoint, data?: DataVariant);
  }
  export class ConfigSingle extends Table {
      key: string;
      value: u64;
      constructor(key?: string, value?: u64);
  }
  export class Feed extends Table {
      index: u64;
      name: string;
      description: string;
      aggregate_function: string;
      data_type: string;
      config: ConfigSingle[];
      providers: ProviderSingle[];
      constructor(index?: u64, name?: string, description?: string, aggregate_function?: string, data_type?: string, config?: ConfigSingle[], providers?: ProviderSingle[]);
      get primaryKey(): u64;
  }
  export class ProviderSingle extends Table {
      key: Name;
      value: TimePoint;
      constructor(key?: Name, value?: TimePoint);
  }
  export class Data extends Table {
      feed_index: u64;
      aggregate: DataVariant;
      points: ProviderPoint[];
      constructor(feed_index?: u64, aggregate?: DataVariant, points?: ProviderPoint[]);
      get primaryKey(): u64;
  }
  export class VoteSingle extends Table {
      key: Name;
      value: boolean;
      constructor(key?: Name, value?: boolean);
  }
  export class Msig extends Table {
      index: u64;
      proposer: Name;
      new_feed: Feed;
      votes: VoteSingle[];
      constructor(index?: u64, proposer?: Name, new_feed?: Feed, votes?: VoteSingle[]);
      get primaryKey(): u64;
  }

}
declare module 'proton-tsc/rng' {
  export * from 'proton-tsc/rng/rng.inline';
  export * from 'proton-tsc/rng/rng.utils';

}
declare module 'proton-tsc/rng/rng.inline' {
  /// <reference types="assembly" />
  import { Name } from "proton-tsc";
  export const RNG_CONTRACT: Name;
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

}
declare module 'proton-tsc/rng/rng.utils' {
  /// <reference types="assembly" />
  import { Checksum256 } from "proton-tsc";
  export function rngChecksumToU64(randomChecksum: Checksum256, maxValue: u64): u64;

}
declare module 'proton-tsc/rsa' {
  export * from 'proton-tsc/rsa/safemath';

}
declare module 'proton-tsc/rsa/rsa' {
  /// <reference types="assembly" />
  class RSAKey {
      n: null;
      e: i64;
      d: null;
      p: null;
      q: null;
      dmp1: null;
      dmq1: null;
      coeff: null;
      isPublic: boolean;
      isPrivate: boolean;
      setPublic(N: string, E: string): void;
      doPublic(x: any): any;
      verify(sMsg: string, hSig: string): boolean;
  }
  function RSASetPublic(N: any, E: any): void;

}
declare module 'proton-tsc/rsa/rsa2' {
  export {};

}
declare module 'proton-tsc/rsa/safemath' {
  /// <reference types="assembly" />
  import { u128 } from "as-bignum";
  export class SafeMath {
      static add(x: u64, y: u64): u64;
      static sub(x: u64, y: u64): u64;
      static mul(_x: u64, _y: u64): u128;
      static div(x: u64, y: u64): u64;
  }

}
declare module 'proton-tsc/rsa/safemath.spec' {
  export {};

}
declare module 'proton-tsc/rsa/safemath.test' {
  export {};

}
declare module 'proton-tsc/rsa/target/safemath.test' {
  /// <reference types="assembly" />
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/system/constants' {
  /// <reference types="assembly" />
  import { Name, Symbol } from "proton-tsc";
  export const SYSTEM_CONTRACT: Name;
  export const PROTON_USER_CONTRACT: Name;
  export const RAM_FEE_PRECISION: i64;
  export const XPR_CONTRACT: Name;
  export const XPR_SYMBOL: Symbol;

}
declare module 'proton-tsc/system' {
  export * from 'proton-tsc/system/modules';
  export * from 'proton-tsc/system/tables';
  export * from 'proton-tsc/system/constants';

}
declare module 'proton-tsc/system/modules' {
  export * from 'proton-tsc/system/modules/newaccount';
  export * from 'proton-tsc/system/modules/permissions';
  export * from 'proton-tsc/system/modules/ram';
  export * from 'proton-tsc/system/modules/resources';
  export * from 'proton-tsc/system/modules/voting';

}
declare module 'proton-tsc/system/modules/newaccount' {
  /// <reference types="assembly" />
  import { ActionData, Name, Authority } from "proton-tsc";
  export class NewAccount extends ActionData {
      creator: Name;
      name: Name;
      owner: Authority;
      active: Authority;
      constructor(creator?: Name, name?: Name, owner?: Authority, active?: Authority);
  }
  export function sendNewAccount(contract: Name, creator: Name, name: Name, owner: Authority, active: Authority): void;
  export function createNewAccount(contract: Name, creator: Name, name: Name, owner: Authority, active: Authority, ramBytes: u32): void;

}
declare module 'proton-tsc/system/modules/permissions' {
  import { Name, Authority } from "proton-tsc";
  export function sendUpdateAuth(contract: Name, account: Name, permission: string, parent: string, auth: Authority): void;
  export function sendDeleteAuth(contract: Name, account: Name, permission: string): void;
  export function sendLinkAuth(contract: Name, account: Name, code: Name, type: Name, requirement: Name): void;
  export function sendUnlinkAuth(contract: Name, account: Name, code: Name, type: Name): void;

}
declare module 'proton-tsc/system/modules/ram' {
  /// <reference types="assembly" />
  import { Name, ActionData, Asset, Table } from "proton-tsc";
  export class BuyRamBytes extends ActionData {
      payer: Name;
      receiver: Name;
      bytes: u32;
      constructor(payer?: Name, receiver?: Name, bytes?: u32);
  }
  export class BuyRam extends ActionData {
      payer: Name;
      receiver: Name;
      quantity: Asset;
      constructor(payer?: Name, receiver?: Name, quantity?: Asset);
  }
  export class SellRam extends ActionData {
      account: Name;
      bytes: i64;
      constructor(account?: Name, bytes?: i64);
  }
  export class GlobalRam extends Table {
      ram_price_per_byte: Asset;
      max_per_user_bytes: u64;
      ram_fee_percent: u16;
      total_ram: u64;
      total_xpr: u64;
      constructor(ram_price_per_byte?: Asset, max_per_user_bytes?: u64, ram_fee_percent?: u16, total_ram?: u64, total_xpr?: u64);
  }
  export function sendBuyRamBytes(contract: Name, payer: Name, receiver: Name, bytes: u32): void;
  export function sendBuyRam(contract: Name, payer: Name, receiver: Name, quantity: Asset): void;
  export function sendSellRam(contract: Name, owner: Name, bytes: i64): void;
  export function estimateBuyRamCost(bytes: u64): Asset;
  export function estimateBuyRamBytes(amount: u64): u64;

}
declare module 'proton-tsc/system/modules/resources' {
  import { Name } from "proton-tsc";
  export function sendNewAccRes(contract: Name, account: Name): void;

}
declare module 'proton-tsc/system/modules/voting' {
  import { Name } from "proton-tsc";
  export function sendVoteProducer(contract: Name, voter: Name, proxy: Name, producers: Name[]): void;

}
declare module 'proton-tsc/system/tables' {
  /// <reference types="assembly" />
  import { Table, BlockTimestamp, TimePoint, ActionData, Variant, Name, PublicKey, BinaryExtension, Asset, TimePointSec, OptionalNumber, KeyWeight } from "proton-tsc";
  export class BlockchainParameters extends Table {
      max_block_net_usage: u64;
      target_block_net_usage_pct: u32;
      max_transaction_net_usage: u32;
      base_per_transaction_net_usage: u32;
      net_usage_leeway: u32;
      context_free_discount_net_usage_num: u32;
      context_free_discount_net_usage_den: u32;
      max_block_cpu_usage: u32;
      target_block_cpu_usage_pct: u32;
      max_transaction_cpu_usage: u32;
      min_transaction_cpu_usage: u32;
      max_transaction_lifetime: u32;
      deferred_trx_expiration_window: u32;
      max_transaction_delay: u32;
      max_inline_action_size: u32;
      max_inline_action_depth: u32;
      max_authority_depth: u16;
      constructor(max_block_net_usage?: u64, target_block_net_usage_pct?: u32, max_transaction_net_usage?: u32, base_per_transaction_net_usage?: u32, net_usage_leeway?: u32, context_free_discount_net_usage_num?: u32, context_free_discount_net_usage_den?: u32, max_block_cpu_usage?: u32, target_block_cpu_usage_pct?: u32, max_transaction_cpu_usage?: u32, min_transaction_cpu_usage?: u32, max_transaction_lifetime?: u32, deferred_trx_expiration_window?: u32, max_transaction_delay?: u32, max_inline_action_size?: u32, max_inline_action_depth?: u32, max_authority_depth?: u16);
  }
  export class Global extends BlockchainParameters {
      max_ram_size: u64;
      total_ram_bytes_reserved: u64;
      total_ram_stake: i64;
      last_producer_schedule_update: BlockTimestamp;
      last_pervote_bucket_fill: TimePoint;
      pervote_bucket: i64;
      perblock_bucket: i64;
      total_unpaid_blocks: u32;
      total_activated_stake: i64;
      thresh_activated_stake_time: TimePoint;
      last_producer_schedule_size: u16;
      total_producer_vote_weight: f64;
      last_name_close: BlockTimestamp;
      constructor(max_ram_size?: u64, total_ram_bytes_reserved?: u64, total_ram_stake?: i64, last_producer_schedule_update?: BlockTimestamp, last_pervote_bucket_fill?: TimePoint, pervote_bucket?: i64, perblock_bucket?: i64, total_unpaid_blocks?: u32, total_activated_stake?: i64, thresh_activated_stake_time?: TimePoint, last_producer_schedule_size?: u16, total_producer_vote_weight?: f64, last_name_close?: BlockTimestamp);
      get free_ram(): u64;
  }
  export class Global2 extends Table {
      new_ram_per_block: u16;
      last_ram_increase: BlockTimestamp;
      last_block_num: BlockTimestamp;
      total_producer_votepay_share: f64;
      revision: u8;
      constructor(new_ram_per_block?: u16, last_ram_increase?: BlockTimestamp, last_block_num?: BlockTimestamp, total_producer_votepay_share?: f64, revision?: u8);
  }
  export class Global3 extends Table {
      last_vpay_state_update: TimePoint;
      total_vpay_share_change_rate: f64;
      constructor(last_vpay_state_update?: TimePoint, total_vpay_share_change_rate?: f64);
  }
  export class Global4 extends Table {
      continuous_rate: f64;
      inflation_pay_factor: i64;
      votepay_factor: i64;
      constructor(continuous_rate?: f64, inflation_pay_factor?: i64, votepay_factor?: i64);
  }
  class BlockSigningAuthorityV0 extends ActionData {
      threshold: u32;
      keys: KeyWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[]);
  }
  export class BlockSigningAuthority extends Variant {
      v0: BlockSigningAuthorityV0;
      static new<T>(value: T): BlockSigningAuthority;
  }
  export class ProducerInfo extends Table {
      owner: Name;
      total_votes: f64;
      producer_key: PublicKey;
      is_active: boolean;
      url: string;
      unpaid_blocks: u32;
      last_claim_time: TimePoint;
      location: u32;
      producer_authority: BinaryExtension<BlockSigningAuthority>;
      constructor(owner?: Name, total_votes?: f64, producer_key?: PublicKey, is_active?: boolean, url?: string, unpaid_blocks?: u32, last_claim_time?: TimePoint, location?: u32, producer_authority?: BinaryExtension<BlockSigningAuthority>);
      get primary(): u64;
      get by_votes(): f64;
      set by_votes(value: f64);
      get active(): bool;
      deactivate(): void;
  }
  export class ProducerInfo2 extends Table {
      owner: Name;
      total_votes: f64;
      producer_key: PublicKey;
      is_active: boolean;
      url: string;
      unpaid_blocks: u32;
      last_claim_time: TimePoint;
      location: u32;
      producer_authority: BinaryExtension<BlockSigningAuthority>;
      constructor(owner?: Name, total_votes?: f64, producer_key?: PublicKey, is_active?: boolean, url?: string, unpaid_blocks?: u32, last_claim_time?: TimePoint, location?: u32, producer_authority?: BinaryExtension<BlockSigningAuthority>);
      get primary(): u64;
  }
  export class VoterInfo extends Table {
      owner: Name;
      proxy: Name;
      producers: Name[];
      staked: i64;
      last_vote_weight: f64;
      proxied_vote_weight: f64;
      is_proxy: boolean;
      flags1: u32;
      reserved2: u32;
      reserved3: u32;
      constructor(owner?: Name, proxy?: Name, producers?: Name[], staked?: i64, last_vote_weight?: f64, proxied_vote_weight?: f64, is_proxy?: boolean, flags1?: u32, reserved2?: u32, reserved3?: u32);
      get primary(): u64;
  }
  export class UserResources extends Table {
      owner: Name;
      net_weight: Asset;
      cpu_weight: Asset;
      ram_bytes: i64;
      constructor(owner?: Name, net_weight?: Asset, cpu_weight?: Asset, ram_bytes?: i64);
      get primary(): u64;
      get is_empty(): bool;
  }
  export class DelegatedBandwidth extends Table {
      from: Name;
      to: Name;
      net_weight: Asset;
      cpu_weight: Asset;
      constructor(from?: Name, to?: Name, net_weight?: Asset, cpu_weight?: Asset);
      get primary(): u64;
      get is_empty(): bool;
  }
  export class Refunds extends Table {
      owner: Name;
      request_time: TimePointSec;
      net_amount: Asset;
      cpu_amount: Asset;
      constructor(owner?: Name, request_time?: TimePointSec, net_amount?: Asset, cpu_amount?: Asset);
      get primary(): u64;
      get is_empty(): bool;
  }
  export class DelegatedXpr extends Table {
      from: Name;
      to: Name;
      quantity: Asset;
      constructor(from?: Name, to?: Name, quantity?: Asset);
      get primary(): u64;
      get is_empty(): bool;
  }
  export class VotersXpr extends Table {
      owner: Name;
      staked: u64;
      isqualified: boolean;
      claimamount: u64;
      lastclaim: u64;
      startstake: OptionalNumber<u64>;
      startqualif: OptionalNumber<boolean>;
      constructor(owner?: Name, staked?: u64, isqualified?: boolean, claimamount?: u64, lastclaim?: u64, startstake?: OptionalNumber<u64>, startqualif?: OptionalNumber<boolean>);
      get primary(): u64;
      get is_empty(): bool;
  }
  export class XprRefundRequest extends Table {
      owner: Name;
      request_time: TimePointSec;
      quantity: Asset;
      constructor(owner?: Name, request_time?: TimePointSec, quantity?: Asset);
      get primary(): u64;
      get is_empty(): bool;
  }
  export class GlobalsXpr extends Table {
      max_bp_per_vote: u64;
      min_bp_reward: u64;
      unstake_period: u64;
      process_by: u64;
      process_interval: u64;
      voters_claim_interval: u64;
      spare1: u64;
      spare2: u64;
      constructor(max_bp_per_vote?: u64, min_bp_reward?: u64, unstake_period?: u64, process_by?: u64, process_interval?: u64, voters_claim_interval?: u64, spare1?: u64, spare2?: u64);
  }
  export class UsersRam extends Table {
      account: Name;
      ram: u64;
      quantity: Asset;
      ramlimit: u64;
      constructor(account?: Name, ram?: u64, quantity?: Asset, ramlimit?: u64);
      get primary(): u64;
  }
  export {};

}
declare module 'proton-tsc/test/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/test/target/test.contract' {
  /// <reference types="assembly" />
  import { Action, Contract } from "proton-tsc/test";
  export class ReturnValueContract extends Contract {
      auth(actions: Action[]): void;
      test(): u64;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/test/test.contract' {
  /// <reference types="assembly" />
  import { Action, Contract } from "proton-tsc";
  export class ReturnValueContract extends Contract {
      auth(actions: Action[]): void;
      test(): u64;
  }

}
declare module 'proton-tsc/test/test.spec' {
  export {};

}
declare module 'proton-tsc/token' {
  export * from 'proton-tsc/token/token.inline';

}
declare module 'proton-tsc/token/target' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { PermissionLevel, PublicKey, Name } from "proton-tsc";
  export class KeyWeight implements _chain.Packer {
      key: PublicKey;
      weight: u16;
      constructor(key?: PublicKey, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class PermissionLevelWeight implements _chain.Packer {
      permission: PermissionLevel;
      weight: u16;
      constructor(permission?: PermissionLevel, weight?: u16);
      static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight;
      toAuthority(): Authority;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class WaitWeight implements _chain.Packer {
      waitSec: u16;
      weight: u16;
      constructor(waitSec?: u16, weight?: u16);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }
  export class Authority implements _chain.Packer {
      threshold: u32;
      keys: KeyWeight[];
      accounts: PermissionLevelWeight[];
      waits: WaitWeight[];
      constructor(threshold?: u32, keys?: KeyWeight[], accounts?: PermissionLevelWeight[], waits?: WaitWeight[]);
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
  }

}
declare module 'proton-tsc/token/target/rng.inline' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Name } from "proton-tsc";
  export const RNG_CONTRACT: _chain.Name;
  export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void;

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
       * The opposite for issue action, if all validations succeed,
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
      private subBalance;
      private addBalance;
  }
  export function apply(receiver: u64, firstReceiver: u64, action: u64): void;

}
declare module 'proton-tsc/token/target/token.tables' {
  /// <reference types="assembly" />
  import * as _chain from "as-chain";
  import { Asset, Name } from "proton-tsc/token";
  /**
   * Tables
   */
  export class AccountDB extends _chain.MultiIndex<Account> {
  }
  export class Account implements _chain.MultiIndexValue {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): AccountDB;
  }
  export class StatDB extends _chain.MultiIndex<Stat> {
  }
  export class Stat implements _chain.MultiIndexValue {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
      pack(): u8[];
      unpack(data: u8[]): usize;
      getSize(): usize;
      static get tableName(): _chain.Name;
      static tableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getTableName(): _chain.Name;
      getTableIndexes(code: _chain.Name, scope: _chain.Name): _chain.IDXDB[];
      getPrimaryValue(): u64;
      getSecondaryValue(i: i32): _chain.SecondaryValue;
      setSecondaryValue(i: i32, value: _chain.SecondaryValue): void;
      static new(code: _chain.Name, scope?: _chain.Name): StatDB;
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
       * The opposite for issue action, if all validations succeed,
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
      private subBalance;
      private addBalance;
  }

}
declare module 'proton-tsc/token/token.inline' {
  /// <reference types="assembly" />
  import { Name, Table, ExtendedAsset, Asset, Symbol, ActionData } from "proton-tsc";
  /**
   * Tables
   */
  export class Account extends Table {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
  }
  export class Stat extends Table {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
  }
  /**
   * Helpers
   */
  export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset;
  export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset;
  export class Transfer extends ActionData {
      from: Name;
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(from?: Name, to?: Name, quantity?: Asset, memo?: string);
  }
  export class Issue extends ActionData {
      to: Name;
      quantity: Asset;
      memo: string;
      constructor(to?: Name, quantity?: Asset, memo?: string);
  }
  export class Retire extends ActionData {
      quantity: Asset;
      memo: string;
      constructor(quantity?: Asset, memo?: string);
  }
  /**
   * Issue token
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendIssue(tokenContract: Name, issuer: Name, to: Name, quantity: Asset, memo: string): void;
  /**
   * Retire token
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendRetire(tokenContract: Name, retiree: Name, quantity: Asset, memo: string): void;
  /**
   * Send token from one account to another
   * @param {Name} from - Name of the account to transfer tokens from.
   * @param {Name} to - The name of the account to transfer the tokens to.
   * @param {ExtendedAsset} quantity - Quantity
   * @param {string} memo - A string that is included in the transaction. This is optional.
   */
  export function sendTransferToken(tokenContract: Name, from: Name, to: Name, quantity: Asset, memo: string): void;
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
  import { Asset, Name, Table } from "proton-tsc";
  /**
   * Tables
   */
  export class Account extends Table {
      balance: Asset;
      constructor(balance?: Asset);
      get primary(): u64;
  }
  export class Stat extends Table {
      supply: Asset;
      max_supply: Asset;
      issuer: Name;
      constructor(supply?: Asset, max_supply?: Asset, issuer?: Name);
      get primary(): u64;
  }

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