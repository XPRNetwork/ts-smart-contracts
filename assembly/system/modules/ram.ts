import { Name, PermissionLevel, ActionData, InlineAction, Asset, Table, Singleton, EMPTY_NAME } from "../..";
import { RAM_FEE_PRECISION, SYSTEM_CONTRACT, XPR_SYMBOL } from "../constants";

const BUYRAMBYTES_ACTION = new InlineAction<BuyRamBytes>("buyrambytes")
const BUYRAM_ACTION = new InlineAction<BuyRam>("buyram")
const SELLRAM_ACTION = new InlineAction<SellRam>("sellram")

@packer
export class BuyRamBytes extends ActionData {
    constructor (
        public payer: Name = EMPTY_NAME,
        public receiver: Name = EMPTY_NAME,
        public bytes: u32 = 0,
    ) {
        super();
    }
}

@packer
export class BuyRam extends ActionData {
    constructor (
        public payer: Name = EMPTY_NAME,
        public receiver: Name = EMPTY_NAME,
        public quantity: Asset = new Asset(),
    ) {
        super();
    }
}

@packer
export class SellRam extends ActionData {
    constructor (
        public account: Name = EMPTY_NAME,
        public bytes: i64 = 0,
    ) {
        super();
    }
}

@table("globalram", singleton, noabigen)
export class GlobalRam extends Table {
    constructor (  
        public ram_price_per_byte: Asset = new Asset(200, XPR_SYMBOL),
        public max_per_user_bytes: u64 = 3 * 1024 * 1024,
        public ram_fee_percent: u16 = 1000,
        public total_ram: u64 = 0,
        public total_xpr: u64 = 0,
    ) {
        super();
    }
}


//------------------ Actions -------------------------------//
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

//------------------ Helpers -------------------------------//
export function estimateBuyRamCost(bytes: u64): Asset {
    const globalRamSingleton = new Singleton<GlobalRam>(SYSTEM_CONTRACT)
    const globalRam = globalRamSingleton.get()

    const cost: u64 = globalRam.ram_price_per_byte.amount * bytes;
    const fee_percentage: f64 = (<f64>(globalRam.ram_fee_percent) / <f64>(RAM_FEE_PRECISION)) / 100;
    const costwfee: i64 = <i64>(<f64>(cost) / (1.0 - fee_percentage));

    return new Asset(costwfee, XPR_SYMBOL)
}

export function estimateBuyRamBytes(amount: u64): u64 {
    const globalRamSingleton = new Singleton<GlobalRam>(SYSTEM_CONTRACT)
    const globalRam = globalRamSingleton.get()

    const fee: u64 = <u64>(<f64>(amount) * ((<f64>(globalRam.ram_fee_percent) / <f64>(RAM_FEE_PRECISION)) / 100))
    const quant_after_fee: u64 = amount - fee
    const bytes_out: u64 = quant_after_fee / globalRam.ram_price_per_byte.amount;

    return bytes_out
}
