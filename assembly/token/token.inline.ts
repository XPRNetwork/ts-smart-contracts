import { ActionWrapper, Name, ExtendedAsset, PermissionLevel, Asset, InlineAction } from ".."

// Actions
export const transfer = ActionWrapper.fromString("transfer")

@packer
export class Transfer extends InlineAction {
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
export class Issue extends InlineAction {
    constructor (
        public to: Name = new Name(),
        public quantity: Asset = new Asset(),
        public memo: string = "",
    ) {
        super();
    }
}

@packer
export class Retire extends InlineAction {
    constructor (
        public quantity: Asset = new Asset(),
        public memo: string = "",
    ) {
        super();
    }
}

/**
 * Issue token
 * @param {Name} to - The name of the account to transfer the tokens to.
 * @param {ExtendedAsset} quantity - Quantity
 * @param {string} memo - A string that is included in the transaction. This is optional.
 */
export function sendIssue(tokenContract: Name, issuer: Name, to: Name, quantity: Asset, memo: string): void {
    const action = transfer.act(tokenContract, new PermissionLevel(issuer))
    const actionParams = new Issue(to, quantity, memo)
    action.send(actionParams)
}

/**
 * Retire token
 * @param {ExtendedAsset} quantity - Quantity
 * @param {string} memo - A string that is included in the transaction. This is optional.
 */
 export function sendRetire(tokenContract: Name, retiree: Name, quantity: Asset, memo: string): void {
    const action = transfer.act(tokenContract, new PermissionLevel(retiree))
    const actionParams = new Retire(quantity, memo)
    action.send(actionParams)
}

/**
 * Send token from one account to another
 * @param {Name} from - Name of the account to transfer tokens from.
 * @param {Name} to - The name of the account to transfer the tokens to.
 * @param {ExtendedAsset} quantity - Quantity
 * @param {string} memo - A string that is included in the transaction. This is optional.
 */
export function sendTransferToken(tokenContract: Name, from: Name, to: Name, quantity: Asset, memo: string): void {
    const action = transfer.act(tokenContract, new PermissionLevel(from))
    const actionParams = new Transfer(from, to, quantity, memo)
    action.send(actionParams)
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
        sendTransferToken(tokens[i].contract, from, to, tokens[i].quantity, memo)
    }
}