import { Name, IDXDB, PrimaryIterator, check, MultiIndex, MultiIndexValue, IDX128, U128, IDX256, U256, IDX64, IDXF64, IDXF128, Float128, print } from "as-chain";

const noAvailablePrimaryKey = <u64>(-2) // Must be the smallest uint64_t value compared to all other tags
const unsetNextPrimaryKey = <u64>(-1) // No table

const FAIL_STORE = "Failed to 'store' value as it already exists, please use 'set' or 'update' if you wish to update value"
const FAIL_UPDATE = "Failed to 'update' value as item does not exist, please use 'set' or 'store' to save value first"
const FAIL_REMOVE = "Failed to 'remove' value as item does not exist, please use 'set' or 'store' to save value first"
const FAIL_NEXT = "Failed to find 'next' value as current item does not exist"
const FAIL_PREVIOUS = "Failed to find 'previous' value as current item does not exist"
const FAIL_AVAILABLE_PRIMARY_KEY = "next primary key in table is at autoincrement limit"

export class TableStore<T extends MultiIndexValue> {
    mi: MultiIndex<T>;
    nextPrimaryKey: u64 = unsetNextPrimaryKey;

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
        const it = this.requireNotFind(value, FAIL_STORE)
        this.mi.store(value, payer)
        this.updateAvailablePrimaryKey(it.primary)
    }

    update(value: T, payer: Name): void {
        const it = this.requireFind(value, FAIL_UPDATE)
        this.mi.update(it, value, payer)
        this.updateAvailablePrimaryKey(it.primary)
    }

    remove(value: T): void {
        const it = this.requireFind(value, FAIL_REMOVE)
        this.mi.removeEx(it.primary)
    }

    get(key: u64): T | null {
        return this.mi.getByKey(key)
    }

    requireGet(key: u64, errorMsg: string): T {
        const it = this.mi.find(key)
        check(it.isOk(), errorMsg)
        return this.mi.get(it)
    }

    getWithDefault(key: u64, defaultValue: T): T {
        const value = this.mi.getByKey(key)
        if (value) {
            return value
        } else {
            return defaultValue
        }
    }

    getByItr(itr: PrimaryIterator): T | null {
        return this.mi.getByKey(itr.primary)
    }

    /**
     * Search
     */
    find(value: T): PrimaryIterator {
        const primary = value.getPrimaryValue()
        return this.mi.find(primary);
    }

    requireFind(value: T, errorMsg: string): PrimaryIterator {
        const primary = value.getPrimaryValue()
        return this.mi.requireFind(primary, errorMsg);
    }

    requireNotFind(value: T, errorMsg: string): PrimaryIterator {
        const primary = value.getPrimaryValue()
        return this.mi.requireNotFind(primary, errorMsg);
    }

    next(value: T): T | null {
        const it = this.requireFind(value, FAIL_NEXT);
        return this.getByItr(this.mi.next(it))
    }

    previous(value: T): T | null {
        const it = this.requireFind(value, FAIL_PREVIOUS);
        return this.getByItr(this.mi.previous(it))
    }

    lowerBound(id: u64): T | null {
        return this.getByItr(this.mi.lowerBound(id))
    }

    upperBound(id: u64): T | null {
        return this.getByItr(this.mi.upperBound(id))
    }

    begin(): T | null {
        return this.getByItr(this.mi.begin())
    }

    end(): T | null {
        return this.getByItr(this.mi.end())
    }

    /**
     * Available primary index
     */
    availablePrimaryKey(): u64 {
        if (this.nextPrimaryKey == unsetNextPrimaryKey) {
            if (this.mi.begin().i == this.mi.end().i) {
                this.nextPrimaryKey = 0;
            } else {
                const end = this.mi.end();
                const itr = this.mi.previous(end)
                const pk = this.mi.get(itr).getPrimaryValue()
                if (pk >= noAvailablePrimaryKey) {
                    this.nextPrimaryKey = noAvailablePrimaryKey
                } else {
                    this.nextPrimaryKey = pk + 1
                }
            }
        }

        check(this.nextPrimaryKey < noAvailablePrimaryKey, FAIL_AVAILABLE_PRIMARY_KEY)
        return this.nextPrimaryKey
    }

    updateAvailablePrimaryKey(primary: u64): void {
        if (primary >= this.nextPrimaryKey) {
            this.nextPrimaryKey = (primary >= noAvailablePrimaryKey) ? noAvailablePrimaryKey : (primary + 1);
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
    getBySecondaryIDXFloat(secondaryValue: f64, index: u8): T | null {
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
    getBySecondaryIDXDouble(secondaryValue: Float128, index: u8): T | null {
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