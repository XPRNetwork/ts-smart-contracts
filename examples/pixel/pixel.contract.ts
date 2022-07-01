import { Name, Table, check, requireAuth, TableStore, ExtendedAsset, Utils, Asset, unpackActionData } from 'proton-tsc'
import { BalanceContract } from 'proton-tsc/balance';
import { estimateBuyRamCost, sendBuyRamBytes } from 'proton-tsc/system/modules/ram';
import { XPR_SYMBOL, XPR_CONTRACT } from 'proton-tsc/system/constants';
import { Transfer } from 'proton-tsc/token';

const MULTIPLIER: f64 = 1.5
const PIXEL_ROW_BYTES: u8 = 136

@table("pixels")
export class Pixels extends Table {
    constructor (
        public id: u32 = 0,
        public owner: Name = new Name(),
        public price: u64 = 0,
        public color: u8[] = []
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return <u64>(this.id);
    }
}

@contract
export class PixelContract extends BalanceContract {
    pixelsTable: TableStore<Pixels> = new TableStore<Pixels>(this.receiver)

    // Runs as final action after every action
    finalize(): void {
        if (this.receiver != this.firstReceiver) {
            let t = unpackActionData<Transfer>()

            // Skip
            if (this.skipDepositFrom(t.from)) {
                return
            }

            const memoArr = t.memo.split(',') // [pixelId, pixelColor]
            this.buyPixel(t.from, U32.parseInt(memoArr[0]), memoArr[1])
        }
    }

    buyPixel(
        newOwner: Name,
        pixelId: u32,
        pixelColor: string
    ): void {
        // Authorization
        requireAuth(newOwner)

        // Check
        check(pixelId < 1000000, "Max pixel ID is 999999")
        check(pixelColor.length == 6, "Pixel color must be 6 character hex")

        // Get pixel
        let pixel = this.pixelsTable.get(pixelId)

        // Determine price
        const newPriceAmount = pixel
            ? <u64>(Math.ceil(<f64>pixel.price * MULTIPLIER))
            : estimateBuyRamCost(PIXEL_ROW_BYTES).amount
        const newPriceQuantity = new ExtendedAsset(new Asset(newPriceAmount, XPR_SYMBOL), XPR_CONTRACT)

        // Charge amount
        this.substractBalance(newOwner, [newPriceQuantity], [])
        if (pixel) {
            this.addBalance(pixel.owner, [newPriceQuantity], [], this.contract)
        } else {
            sendBuyRamBytes(this.contract, this.contract, this.contract, PIXEL_ROW_BYTES)
        }
        
        // Save pixel
        const newPixel = new Pixels(pixelId, newOwner, newPriceAmount, Utils.hexToBytes(pixelColor))
        this.pixelsTable.set(newPixel, this.contract)
    }
}