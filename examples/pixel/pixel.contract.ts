import { Name, Table, check, ExtendedSymbol, Symbol, requireAuth, TableStore, ExtendedAsset, Utils } from 'proton-tsc'
import { BalanceContract } from 'proton-tsc/balance';
import { sendBuyRamBytes } from 'proton-tsc/system';

const MULTIPLIER: f64 = 1.5
const INITIAL_PRICE: u64 = 2992
const TOKEN = new ExtendedSymbol(new Symbol("XPR", 4), Name.fromString("eosio.token"))

@table("pixels")
export class Pixels extends Table {
    constructor (
        public id: u64 = 0,
        public owner: Name = new Name(),
        public price: u64 = INITIAL_PRICE,
        public color: u8[] = []
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.id;
    }
}

@contract
export class PixelContract extends BalanceContract {
    pixelsTable: TableStore<Pixels> = new TableStore<Pixels>(this.receiver)

    @action("buypixel")
    buypixel(
        newOwner: Name,
        pixelId: u64,
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
            : INITIAL_PRICE
        const newPriceQuantity = ExtendedAsset.fromInteger(newPriceAmount, TOKEN)

        // Charge amount
        this.substractBalance(newOwner, [newPriceQuantity], [])
        if (pixel) {
            this.addBalance(pixel.owner, [newPriceQuantity], [])
        } else {
            sendBuyRamBytes(this.contract, this.contract, this.contract, 136)
        }
        
        // Save pixel
        const newPixel = new Pixels(pixelId, newOwner, newPriceAmount, Utils.hexToBytes(pixelColor))
        this.pixelsTable.set(newPixel, this.contract)
    }
}