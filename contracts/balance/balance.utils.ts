import { check, ExtendedAsset, packer, Table } from "as-chain"
import { Account } from "./balance.tables";

/**
 * Find the index of an extended asset in an array of extended assets
 * @param {ExtendedAsset[]} tokens - The list of tokens to search through.
 * @param {ExtendedAsset} token - ExtendedAsset
 * @returns The index of the token in the array of tokens.
 */
export function findIndexOfExtendedAsset (tokens: ExtendedAsset[], token: ExtendedAsset): i32 {
    let tokenIndex = -1
    for (let j = 0; j < tokens.length; j++) {
        if (tokens[j].getExtendedSymbol() == token.getExtendedSymbol()) {
            tokenIndex = j
            break;
        }
    }
    return tokenIndex
}

/**
 * The function takes in an account and a list of nfts to remove from the account's balance.
 * @param {Account} account - Account
 * @param {u64[]} nftsToRemove - u64[]
 */
export function substractNfts(account: Account, nftsToRemove: u64[]): void {
    for (let i = 0; i < nftsToRemove.length; i++) {
        const nftToRemoveIndex = account.nfts.indexOf(nftsToRemove[i])
        check(nftToRemoveIndex != -1, `NFT ${nftsToRemove[i]} not found in balance of ${account.name}`)
        account.nfts.splice(nftToRemoveIndex, 1)
    }
}

/**
 * Add the given nfts to the account's nfts.
 * @param {Account} account - Account - The account to add the NFTs to.
 * @param {u64[]} nftsToAdd - u64[]
 */
export function addNfts(account: Account, nftsToAdd: u64[]): void {
    account.nfts = account.nfts.concat(nftsToAdd)
}

/**
 * It finds the index of the token in the array of tokens, 
 * and then it substracts the balance of the user.
 * @param {ExtendedAsset[]} tokens - The list of tokens that the user has.
 * @param {ExtendedAsset} sub - The asset to be subtracted from the user's balance.
 */
export function substractToken (tokens: ExtendedAsset[], sub: ExtendedAsset): void {
    // Validation
    check(sub.quantity.isValid(), "valid quantity");
    check(sub.quantity.amount > 0, "sub quantity must be positive");
    
    // Find index of token
    const tokenIndex = findIndexOfExtendedAsset(tokens, sub)
    check(tokenIndex != -1, "no balance found for user to reduce balance")

    // Substract Balance
    const currentBalance = tokens[tokenIndex]
    check(currentBalance >= sub, "user balance too low")
    tokens[tokenIndex] = ExtendedAsset.sub(tokens[tokenIndex], sub)

    // Delete if zero
    if (tokens[tokenIndex].quantity.amount == 0) {
        tokens.splice(tokenIndex, 1)
    }
}

/**
 * It subtracts the tokens from the account.
 * @param {Account} account - Account
 * @param {ExtendedAsset[]} tokensToSubtract - An array of ExtendedAsset objects.
 */
export function substractTokens(account: Account, tokensToSubtract: ExtendedAsset[]):  void {
    for (let i = 0; i < tokensToSubtract.length; i++) {
        substractToken(account.tokens, tokensToSubtract[i])
    } 
}

/**
 * If the token does not exist, add it. If the token exists, update the balance
 * @param {ExtendedAsset[]} tokens - The list of tokens that the user owns.
 * @param {ExtendedAsset} add - ExtendedAsset
 */
export function addToken(tokens: ExtendedAsset[], add: ExtendedAsset): void {
    // Validation
    check(add.quantity.isValid(), "valid quantity");
    check(add.quantity.amount > 0, "add quantity must be positive");
    
    // Find index of token
    const tokenIndex = findIndexOfExtendedAsset(tokens, add)

    // If token does not exist, add it
    if (tokenIndex == -1) {
        tokens.push(add)
    }
    // If token exists, update balance
    else {
        tokens[tokenIndex] = ExtendedAsset.add(tokens[tokenIndex], add)
    }
}

/**
 * It adds the tokens to the account's tokens array.
 * @param {Account} account - The account to add the tokens to.
 * @param {ExtendedAsset[]} tokensToAdd - An array of ExtendedAsset objects.
 */
export function addTokens(account: Account, tokensToAdd: ExtendedAsset[]): void {
    for (let i = 0; i < tokensToAdd.length; i++) {
        addToken(account.tokens, tokensToAdd[i])
    } 
}

// Operations
export namespace OPERATION {
    export const ADD = 'add';
    export const SUB = 'sub';
}
export type OPERATION = string;

// Include
@packer
class utils extends Table { constructor() { super(); } }