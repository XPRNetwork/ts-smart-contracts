import { Name, check, requireAuth, Contract, hasAuth, isAccount, Singleton, print, TableStore } from ".."
import { Collections, Config } from './atomicassets.tables';
import { AtomicAttribute, serialize, AtomicFormat, deserialize } from './atomicdata';
import { check_name_length } from './checkformat';
import { MAX_MARKET_FEE } from "./atomicassets.constants";

@contract
class AtomicAssetsContract extends Contract {
    collectionsTable: TableStore<Collections> = new TableStore<Collections>(this.receiver)
    configSingleton: Singleton<Config> = new Singleton<Config>(this.receiver)

    @action("setcolformat")
    colformat(
        format: AtomicFormat[]
    ): void {
        const config = this.configSingleton.get()
        config.collection_format = format
        this.configSingleton.set(config, this.receiver)
    }

    @action("createcol")
    createcol(
        author: Name,
        collection_name: Name,
        allow_notify: boolean,
        authorized_accounts: Name[],
        notify_accounts: Name[],
        market_fee: f64,
        data: AtomicAttribute[]
    ): void {
        requireAuth(author)

        const collection_name_suffix = collection_name.suffix()
        
        if (isAccount(collection_name)) {
            check(hasAuth(collection_name), "When the collection has the name of an existing account, its authorization is required");
        } else {
            if (collection_name_suffix != collection_name) {
                check(hasAuth(collection_name_suffix), "When the collection name has a suffix, the suffix authorization is required");
            } else {
                check(collection_name.toString().length == 12, "Without special authorization, collection names must be 12 characters long");
            }
        }
        
        check(!this.collectionsTable.exists(collection_name.N), "A collection with this name already exists")
    
        check(allow_notify || notify_accounts.length == 0, "Can't add notify_accounts if allow_notify is false");
    
        for (let i = 0; i < authorized_accounts.length; i++) {
            check(isAccount(authorized_accounts[i]), `At least one account does not exist - ${authorized_accounts[i]} | `)
            check(authorized_accounts.lastIndexOf(authorized_accounts[i]) == i, "You can't have duplicates in the authorized_accounts")
        }
        for (let i = 0; i < notify_accounts.length; i++) {
            check(isAccount(notify_accounts[i]), `At least one account does not exist - ${notify_accounts[i]} | `)
            check(notify_accounts.lastIndexOf(notify_accounts[i]) == i, "You can't have duplicates in the notify_accounts")
        }

        check(0 <= market_fee && market_fee <= MAX_MARKET_FEE, `The market_fee must be between 0 and ${MAX_MARKET_FEE} | `);
    
        check_name_length(data);
        
        const current_config = this.configSingleton.get();
    
        const newCollection = new Collections(
            collection_name,
            author,
            allow_notify,
            authorized_accounts,
            notify_accounts,
            market_fee,
            serialize(data, current_config.collection_format)
        )
        this.collectionsTable.store(newCollection, author)
    }


    @action("deserialize1")
    deserialize1(
        collection_name: Name
    ): void {
        const collection = this.collectionsTable.requireGet(collection_name.N, "collection not found")
        const current_config = this.configSingleton.get();
        const attr = deserialize(collection.serialized_data, current_config.collection_format)

        for (let i = 0; i < attr.length; i++) {
            if (attr[i].value.is<i8>()) {
                print(`${attr[i].value.get<i8>()} | `)
            } else if (attr[i].value.is<i16>()) {
                print(`${attr[i].value.get<i16>()} | `)
            } else if (attr[i].value.is<i32>()) {
                print(`${attr[i].value.get<i32>()} | `)
            } else if (attr[i].value.is<i64>()) {
                print(`${attr[i].value.get<i64>()} | `)
            } else if (attr[i].value.is<u8>()) {
                print(`${attr[i].value.get<u8>()} | `)
            } else if (attr[i].value.is<u16>()) {
                print(`${attr[i].value.get<u16>()} | `)
            } else if (attr[i].value.is<u32>()) {
                print(`${attr[i].value.get<u32>()} | `)
            } else if (attr[i].value.is<u64>()) {
                print(`${attr[i].value.get<u64>()} | `)
            } else if (attr[i].value.is<f32>()) {
                print(`${attr[i].value.get<f32>().toString().slice(0, 7)} | `)
            } else if (attr[i].value.is<f64>()) {
                print(`${attr[i].value.get<f64>().toString().slice(0, 14)} | `)
            } else if (attr[i].value.is<string>()) {
                print(`${attr[i].value.get<string>().toString()} | `)
            } else if (attr[i].value.is<i8[]>()) {
                print(`${attr[i].value.get<i8[]>()} | `)
            } else if (attr[i].value.is<i16[]>()) {
                print(`${attr[i].value.get<i16[]>()} | `)
            } else if (attr[i].value.is<i32[]>()) {
                print(`${attr[i].value.get<i32[]>()} | `)
            } else if (attr[i].value.is<i64[]>()) {
                print(`${attr[i].value.get<i64[]>()} | `)
            } else if (attr[i].value.is<u8[]>()) {
                print(`${attr[i].value.get<u8[]>()} | `)
            } else if (attr[i].value.is<u16[]>()) {
                print(`${attr[i].value.get<u16[]>()} | `)
            } else if (attr[i].value.is<u32[]>()) {
                print(`${attr[i].value.get<u32[]>()} | `)
            } else if (attr[i].value.is<u64[]>()) {
                print(`${attr[i].value.get<u64[]>()} | `)
            } else if (attr[i].value.is<f32[]>()) {
                print(`${attr[i].value.get<f32[]>().map<string>((i: f32) => (i + 0.000002).toString().slice(0, 8)).join(',')} | `)
            } else if (attr[i].value.is<f64[]>()) {
                print(`${attr[i].value.get<f64[]>().map<string>((i: f64) => (i + 0.000002).toString().slice(0, 8)).join(',')} | `)
            } else if (attr[i].value.is<string[]>()) {
                print(`${attr[i].value.get<string[]>()} | `)
            } else {
                check(false, "type not found?")
            }
        }
    }
}
