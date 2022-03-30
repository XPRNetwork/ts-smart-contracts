import { Name, Asset, Table, ExtendedAsset, PermissionLevel } from "as-chain"
import { atomicassets, transfer } from "./balance.constants";

/* This is a class that represents a transfer of token */
@packer
export class TokenTransfer extends Table {
    constructor (
        public from: Name = new Name(),
        public to: Name = new Name(),
        public quantity: Asset = new Asset(),
        public memo: string = "",
    ) {
        super();
    }
}

@packer
/* This is a class that represents a transfer of NFTs */
export class NftTransfer extends Table {
    constructor (
        public from: Name = new Name(),
        public to: Name = new Name(),
        public asset_ids: u64[] = [],
        public memo: string = "",
    ) {
        super();
    }
}

/**
 * Send tokens from one account to another
 * @param {Name} from - Name of the account to transfer tokens from.
 * @param {Name} to - The name of the account to transfer the tokens to.
 * @param {ExtendedAsset[]} tokens - An array of ExtendedAsset objects.
 * @param {string} memo - A string that is included in the transaction. This is optional.
 */
export function sendTransferTokens(from: Name, to: Name, tokens: ExtendedAsset[], memo: string): void {
    for (let i = 0; i < tokens.length; i++) {
        const action = transfer.act(tokens[i].contract, new PermissionLevel(from))
        const actionParams = new TokenTransfer(from, to, tokens[i].quantity, memo)
        action.send(actionParams)
    }
}

/**
 * Send a transfer action to the contract with the given parameters
 * @param {Name} from - Name of the account that is sending the NFTs
 * @param {Name} to - Name of the account to transfer the NFTs to.
 * @param {u64[]} nfts - An array of u64s representing the NFTs to transfer.
 * @param {string} memo - A string that will be stored in the blockchain as the memo for this transfer.
 */
export function sendTransferNfts(from: Name, to: Name, nfts: u64[], memo: string): void {
    if (nfts.length > 0) {
        const action = transfer.act(atomicassets, new PermissionLevel(from))
        const actionParams = new NftTransfer(from, to, nfts, memo)
        action.send(actionParams)
    }
}