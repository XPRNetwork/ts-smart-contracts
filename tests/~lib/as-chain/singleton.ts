import { MultiIndex, MultiIndexValue } from "./mi";
import { Name } from "./name";

export class Singleton<T extends MultiIndexValue> {
    key: u64;
    mi: MultiIndex<T>;
    constructor(code: Name, scope: Name, table: Name) {
        this.key = table.N;
        this.mi = new MultiIndex<T>(code, scope, table);
    }

    set(value: T, payer: Name): void {
        let it = this.mi.find(this.key);
        if (it.isOk()) {
            this.mi.update(it, value, payer);
        } else {
            this.mi.store(value, payer);
        }
    }

    getOrNull(): T | null {
        let it = this.mi.find(this.key);
        if (it.isOk()) {
            return this.mi.get(it);
        }
        return null;
        // return instantiate<T>();
    }

    get(): T {
        let it = this.mi.find(this.key);
        if (it.isOk()) {
            return this.mi.get(it);
        }
        return instantiate<T>();
    }

    remove(): void {
        let it = this.mi.find(this.key);
        if (it.isOk()) {
            this.mi.remove(it);
        }
    }
}

// func NewSingletonDB(code, scope, table chain.Name, unpacker ...Unpacker) *SingletonDB;
// func (t *SingletonDB) Set(data DBValue, payer chain.Name);
// func (t *SingletonDB) Get() interface{};
// func (t *SingletonDB) Remove();