import { Name, IDXDB, check, MultiIndex, IDX128, U128, IDX256, U256, IDX64, IDXF64, Table } from "../..";

export const NO_AVAILABLE_PRIMARY_KEY = <u64>(-2) // Must be the smallest uint64_t value compared to all other tags
export const UNSET_NEXT_PRIMARY_KEY = <u64>(-1) // No table

const FAIL_STORE = "Failed to 'store' value as it already exists, please use 'set' or 'update' if you wish to update value"
const FAIL_UPDATE = "Failed to 'update' value as item does not exist, please use 'set' or 'store' to save value first"
const FAIL_REMOVE = "Failed to 'remove' value as item does not exist, please use 'set' or 'store' to save value first"
const FAIL_NEXT = "Failed to find 'next' value as current item does not exist"
const FAIL_PREVIOUS = "Failed to find 'previous' value as current item does not exist"
const FAIL_AVAILABLE_PRIMARY_KEY = "next primary key in table is at autoincrement limit"

export class TableStore<T extends Table> {
    private mi: MultiIndex<T>;
    nextPrimaryKey: u64 = UNSET_NEXT_PRIMARY_KEY;

    constructor(
        contract: Name,
        scope: Name = contract
    ) {
        const obj = instantiate<T>()
        const tableName = obj.getTableName()
        const indexes: IDXDB[] = obj.getTableIndexes(contract, scope)
        this.mi = new MultiIndex<T>(contract, scope, tableName, indexes)
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
        const primary = value.getPrimaryValue()
        this.mi.requireNotFind(primary, FAIL_STORE)
        this.mi.store(value, payer)

        if (primary >= this.nextPrimaryKey) {
            this.nextPrimaryKey = (primary >= NO_AVAILABLE_PRIMARY_KEY) ? NO_AVAILABLE_PRIMARY_KEY : (primary + 1);
        }
    }

    update(value: T, payer: Name): void {
        const primary = value.getPrimaryValue()
        const itr = this.mi.requireFind(primary, FAIL_UPDATE)
        this.mi.update(itr, value, payer)
    }

    remove(value: T): void {
        const primary = value.getPrimaryValue()
        this.mi.requireFind(primary, FAIL_REMOVE)
        this.mi.removeEx(primary)

        if (primary == this.nextPrimaryKey - 1) {
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
        return this.mi.next(itr).getValue()
    }

    previous(value: T): T | null {
        const itr = this.mi.requireFind(value.getPrimaryValue(), FAIL_PREVIOUS);
        return this.mi.previous(itr).getValue()
    }

    // Primary may be UNKNOWN_PRIMARY_KEY
    lowerBound(id: u64): T | null {
        return this.mi.lowerBound(id).getValue()
    }

    upperBound(id: u64): T | null {
        return this.mi.upperBound(id).getValue()
    }

    /**
     * Size utils
     */
    first(): T | null {
        return this.mi.begin().getValue()
    }
    last(): T | null {
        const end = this.mi.end()
        return this.mi.previous(end).getValue()
    }
    isEmpty(): bool {
        return this.mi.begin().i == this.mi.end().i
    }

    /**
     * Available primary index
     */
    get availablePrimaryKey (): u64 {
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

    /**
     * Secondary indexes
     */
    
    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {u64} secondaryValue - u64 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryU64(secondaryValue: u64, index: u8): T | null {
        // Find index
        const idx = <IDX64>this.mi.idxdbs[index]

        // Find by secondary value in index
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }

        // Check that it exists in the index
        return this.get(secondaryIt.primary)
    }

    nextBySecondaryU64(value: T, index: u8): T | null {
        const idx = <IDX64>this.mi.idxdbs[index]

        const currentIt = idx.findPrimaryEx(value.getPrimaryValue());
        if (!currentIt.i.isOk()) {
            return null
        }

        const nextIt = idx.next(currentIt.i);
        if (!nextIt.isOk()) {
            return null
        }

        return this.get(nextIt.primary)
    }

    previousBySecondaryU64(value: T, index: u8): T | null {
        const idx = <IDX64>this.mi.idxdbs[index]

        const currentIt = idx.findPrimaryEx(value.getPrimaryValue());
        if (!currentIt.i.isOk()) {
            return null
        }

        const nextIt = idx.previous(currentIt.i);
        if (!nextIt.isOk()) {
            return null
        }

        return this.get(nextIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {U128} secondaryValue - U128 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryU128(secondaryValue: U128, index: u8): T | null {
        const idx = <IDX128>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }
        return this.get(secondaryIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {u256} secondaryValue - u256 - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element.
     */
    getBySecondaryU256(secondaryValue: U256, index: u8): T | null {
        const idx = <IDX256>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
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
    getBySecondaryF64(secondaryValue: f64, index: u8): T | null {
        const idx = <IDXF64>this.mi.idxdbs[index]
        const secondaryIt = idx.find(secondaryValue);
        if (!secondaryIt.isOk()) {
            return null
        }
        return this.get(secondaryIt.primary)
    }

    /**
     * Given a secondary key, find the first table element that matches secondary value
     * @param {Float128} secondaryValue - double - the secondary value to search for
     * @param {u8} index - The index to search in.
     * @returns The table element..
     */
    // getSecondaryF128(secondaryValue: Float128, index: u8): T | null {
    //     const idx = <IDXF128>this.mi.idxdbs[index]
    //     const secondaryIt = idx.find(secondaryValue);
    //     if (!secondaryIt.isOk()) {
    //         return null
    //     }
    //     return this.get(secondaryIt.primary)
    // }
}