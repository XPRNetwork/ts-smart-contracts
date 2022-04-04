import { Name, IDXDB, PrimaryIterator, check, MultiIndex, MultiIndexValue, IDX128, U128, IDX256, U256, IDX64, IDXF64, IDXF128, Float128 } from "as-chain";

export const NO_AVAILABLE_PRIMARY_KEY = <u64>(-2) // Must be the smallest uint64_t value compared to all other tags
export const UNSET_NEXT_PRIMARY_KEY = <u64>(-1) // No table

const FAIL_STORE = "Failed to 'store' value as it already exists, please use 'set' or 'update' if you wish to update value"
const FAIL_UPDATE = "Failed to 'update' value as item does not exist, please use 'set' or 'store' to save value first"
const FAIL_REMOVE = "Failed to 'remove' value as item does not exist, please use 'set' or 'store' to save value first"
const FAIL_NEXT = "Failed to find 'next' value as current item does not exist"
const FAIL_PREVIOUS = "Failed to find 'previous' value as current item does not exist"
const FAIL_AVAILABLE_PRIMARY_KEY = "next primary key in table is at autoincrement limit"

export class TableStore<T extends MultiIndexValue> {
    private mi: MultiIndex<T>;
    nextPrimaryKey: u64 = UNSET_NEXT_PRIMARY_KEY;

    constructor(code: Name, scope: Name, table: Name, indexes: Array<IDXDB> = []) {
        this.mi = new MultiIndex<T>(code, scope, table, indexes)
    }

    /**
     * CRUD
     */
    set(value: T, payer: Name): void {
        const val = this.get(value.getPrimaryValue())
        if (val) {
            this.update(value, payer);
        } else {
            this.store(value, payer);
        }
    }

    store(value: T, payer: Name): void {
        const itr = this.mi.requireNotFind(value.getPrimaryValue(), FAIL_STORE)
        this.mi.store(value, payer)
        this.updateAvailablePrimaryKey(itr.primary)
    }

    update(value: T, payer: Name): void {
        const itr = this.mi.requireFind(value.getPrimaryValue(), FAIL_UPDATE)
        this.mi.update(itr, value, payer)
        this.updateAvailablePrimaryKey(itr.primary)
    }

    remove(value: T): void {
        const itr = this.mi.requireFind(value.getPrimaryValue(), FAIL_REMOVE)
        this.mi.removeEx(itr.primary)

        if (itr.primary == this.nextPrimaryKey - 1) {
            this.nextPrimaryKey = UNSET_NEXT_PRIMARY_KEY
        }
    }

    get(key: u64): T | null {
        return this.mi.getByKey(key)
    }

    requireGet(key: u64, errorMsg: string): T {
        const itr = this.mi.find(key)
        check(itr.isOk(), errorMsg)
        return this.mi.get(itr)
    }

    private getByItr(itr: PrimaryIterator): T | null {
        if (!itr.isOk()) {
            return null
        }
        return this.mi.get(itr)
    }

    /**
     * Search
     */
    exists(pk: u64): bool {
        const itr = this.mi.find(pk);
        return itr.isOk()
    }

    existsValue(value: T): bool {
        const primary = value.getPrimaryValue()
        return this.exists(primary)
    }

    next(value: T): T | null {
        const itr = this.mi.requireFind(value.getPrimaryValue(), FAIL_NEXT);
        return this.getByItr(this.mi.next(itr))
    }

    previous(value: T): T | null {
        const itr = this.mi.requireFind(value.getPrimaryValue(), FAIL_PREVIOUS);
        return this.getByItr(this.mi.previous(itr))
    }

    // Primary may be UNKNOWN_PRIMARY_KEY
    lowerBound(id: u64): T | null {
        return this.getByItr(this.mi.lowerBound(id))
    }

    upperBound(id: u64): T | null {
        return this.getByItr(this.mi.upperBound(id))
    }

    /**
     * Size utils
     */
    first(): T | null {
        return this.getByItr(this.mi.begin())
    }
    last(): T | null {
        const end = this.mi.end()
        return this.getByItr(this.mi.previous(end))
    }
    isEmpty(): bool {
        return this.mi.begin().i == this.mi.end().i
    }

    /**
     * Available primary index
     */
    availablePrimaryKey(): u64 {
        if (this.nextPrimaryKey == UNSET_NEXT_PRIMARY_KEY) {
            if (this.isEmpty()) {
                this.nextPrimaryKey = 0;
            } else {
                const end = this.mi.end();
                const itr = this.mi.previous(end)
                const pk = this.mi.get(itr).getPrimaryValue()
                if (pk >= NO_AVAILABLE_PRIMARY_KEY) {
                    this.nextPrimaryKey = NO_AVAILABLE_PRIMARY_KEY
                } else {
                    this.nextPrimaryKey = pk + 1
                }
            }
        }

        check(this.nextPrimaryKey < NO_AVAILABLE_PRIMARY_KEY, FAIL_AVAILABLE_PRIMARY_KEY)
        return this.nextPrimaryKey
    }

    private updateAvailablePrimaryKey(primary: u64): void {
        if (primary >= this.nextPrimaryKey) {
            this.nextPrimaryKey = (primary >= NO_AVAILABLE_PRIMARY_KEY) ? NO_AVAILABLE_PRIMARY_KEY : (primary + 1);
        }
    }

    /**
     * Secondary indexes
     */
    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {u64} secondaryValue - u64 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryIDX64(secondaryValue: u64, index: u8): T | null {
        const idx = <IDX64>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }

        const found = idx.findPrimary(secondaryIt.primary)
        if (found.value != secondaryValue) {
            return null
        }

        return this.get(secondaryIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {U128} secondaryValue - U128 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryIDX128(secondaryValue: U128, index: u8): T | null {
        const idx = <IDX128>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }

        const found = idx.findPrimary(secondaryIt.primary)
        if (found.value != secondaryValue) {
            return null
        }

        return this.get(secondaryIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {U256} secondaryValue - U256 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryIDX256(secondaryValue: U256, index: u8): T | null {
        const idx = <IDX256>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }

        const found = idx.findPrimary(secondaryIt.primary)
        if (found.value != secondaryValue) {
            return null
        }

        return this.get(secondaryIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {f64} secondaryValue - f64 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryIDXDouble(secondaryValue: f64, index: u8): T | null {
        const idx = <IDXF64>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }

        const found = idx.findPrimary(secondaryIt.primary)
        if (found.value != secondaryValue) {
            return null
        }

        return this.get(secondaryIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {Float128} secondaryValue - double - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryIDXLongDouble(secondaryValue: Float128, index: u8): T | null {
        const idx = <IDXF128>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }

        const found = idx.findPrimary(secondaryIt.primary)
        if (found.value != secondaryValue) {
            return null
        }

        return this.get(secondaryIt.primary)
    }
}