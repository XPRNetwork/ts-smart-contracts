import { Name, Table, ExtendedAsset, PermissionLevel, Asset, Symbol, InlineAction, ActionData, TableStore, EMPTY_NAME } from ".."

/**
 * Tables
 */
@table("accounts", noabigen)
export class Account extends Table {
    constructor (
        public balance: Asset = new Asset()
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.balance.symbol.code();
    }
}

@table("stat", noabigen)
export class Stat extends Table {
    constructor (
       public supply: Asset = new Asset(),
       public max_supply: Asset =  new Asset(),
       public issuer: Name = EMPTY_NAME,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.supply.symbol.code();
    }
}

/**
 * Helpers
 */
export function getSupply(tokenContractAccount: Name, sym: Symbol): Asset {
    const statstable = new TableStore<Stat>(tokenContractAccount, new Name(sym.code()));
    const st = statstable.requireGet(sym.code(), "token with symbol does not exist");
    return st.supply;
}

export function getBalance(tokenContractAccount: Name, owner: Name, sym: Symbol): Asset {
    const acnts = new TableStore<Account>(tokenContractAccount, owner)
    const ac = acnts.requireGet(sym.code(), "no balance object found");
    return ac.balance;
}


@packer
export class Transfer extends ActionData {
    constructor (
        public from: Name = EMPTY_NAME,
        public to: Name = EMPTY_NAME,
        public quantity: Asset = new Asset(),
        public memo: string = "",
    ) {
        super();
    }
}

@packer
export class Issue extends ActionData {
    constructor (
        public to: Name = EMPTY_NAME,
        public quantity: Asset = new Asset(),
        public memo: string = "",
    ) {
        super();
    }
}

@packer
export class Retire extends ActionData {
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
    const ISSUE = new InlineAction<Issue>("issue")
    const action = ISSUE.act(tokenContract, new PermissionLevel(issuer))
    const actionParams = new Issue(to, quantity, memo)
    action.send(actionParams)
}

/**
 * Retire token
 * @param {ExtendedAsset} quantity - Quantity
 * @param {string} memo - A string that is included in the transaction. This is optional.
 */
 export function sendRetire(tokenContract: Name, retiree: Name, quantity: Asset, memo: string): void {
    const RETIRE = new InlineAction<Retire>("retire")
    const action = RETIRE.act(tokenContract, new PermissionLevel(retiree))
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
    const TRANSFER = new InlineAction<Transfer>("transfer")
    const action = TRANSFER.act(tokenContract, new PermissionLevel(from))
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