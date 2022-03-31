import { Name, check, requireAuth, MultiIndex, Contract, nameToSuffix, hasAuth, isAccount, Singleton, print } from 'as-chain'
import { atomicassets, createcol, deserialize1, MAX_MARKET_FEE, setcolformat } from './atomicassets.constants';
import { Collections, Config } from './atomicassets.tables';
import { ATTRIBUTE_MAP_SINGLE, serialize, FORMAT, deserialize } from './atomicdata';
import { check_name_length } from './checkformat';

@contract(atomicassets)
class KvContract extends Contract {
    collectionsTable: MultiIndex<Collections> = Collections.getTable(this.receiver)
    configSingleton: Singleton<Config> = Config.getSingleton(this.receiver)

    @action(setcolformat)
    colformat(
        format: FORMAT[]
    ): void {
        const config = this.configSingleton.get()
        config.collection_format = format
        this.configSingleton.set(config, this.receiver)
    }

    @action(createcol)
    createcol(
        author: Name,
        collection_name: Name,
        allow_notify: boolean,
        authorized_accounts: Name[],
        notify_accounts: Name[],
        market_fee: f64,
        data: ATTRIBUTE_MAP_SINGLE[]
    ): void {
        requireAuth(author)

        const collection_name_suffix = nameToSuffix(collection_name)
        
        if (isAccount(collection_name)) {
            check(hasAuth(collection_name), "When the collection has the name of an existing account, its authorization is required");
        } else {
            if (collection_name_suffix != collection_name) {
                check(hasAuth(collection_name_suffix), "When the collection name has a suffix, the suffix authorization is required");
            } else {
                check(collection_name.toString().length == 12, "Without special authorization, collection names must be 12 characters long");
            }
        }
        
        check(!this.collectionsTable.find(collection_name.N).isOk(), "A collection with this name already exists");
    
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


    @action(deserialize1)
    deserialize1(
        collection_name: Name
    ): void {
        const collectionItr = this.collectionsTable.requireFind(collection_name.N, "collection not found")
        const collection = this.collectionsTable.get(collectionItr)

        const current_config = this.configSingleton.get();
        const attr = deserialize(collection.serialized_data, current_config.collection_format)

        for (let i = 0; i < attr.length; i++) {
            if (attr[i].value.isi8()) {
                print(`${attr[i].value.geti8()} | `)
            } else if (attr[i].value.isi16()) {
                print(`${attr[i].value.geti16()} | `)
            } else if (attr[i].value.isi32()) {
                print(`${attr[i].value.geti32()} | `)
            } else if (attr[i].value.isi64()) {
                print(`${attr[i].value.geti64()} | `)
            } else if (attr[i].value.isu8()) {
                print(`${attr[i].value.getu8()} | `)
            } else if (attr[i].value.isu16()) {
                print(`${attr[i].value.getu16()} | `)
            } else if (attr[i].value.isu32()) {
                print(`${attr[i].value.getu32()} | `)
            } else if (attr[i].value.isu64()) {
                print(`${attr[i].value.getu64()} | `)
            } else if (attr[i].value.isfloat()) {
                print(`${attr[i].value.getfloat().toString().slice(0, 7)} | `)
            } else if (attr[i].value.isdouble()) {
                print(`${attr[i].value.getdouble().toString().slice(0, 14)} | `)
            } else if (attr[i].value.isstring()) {
                print(`${attr[i].value.getstring().toString()} | `)
            } else if (attr[i].value.isINT8_VEC()) {
                print(`${attr[i].value.getINT8_VEC()} | `)
            } else if (attr[i].value.isINT16_VEC()) {
                print(`${attr[i].value.getINT16_VEC()} | `)
            } else if (attr[i].value.isINT32_VEC()) {
                print(`${attr[i].value.getINT32_VEC()} | `)
            } else if (attr[i].value.isINT64_VEC()) {
                print(`${attr[i].value.getINT64_VEC()} | `)
            } else if (attr[i].value.isUINT8_VEC()) {
                print(`${attr[i].value.getUINT8_VEC()} | `)
            } else if (attr[i].value.isUINT16_VEC()) {
                print(`${attr[i].value.getUINT16_VEC()} | `)
            } else if (attr[i].value.isUINT32_VEC()) {
                print(`${attr[i].value.getUINT32_VEC()} | `)
            } else if (attr[i].value.isUINT64_VEC()) {
                print(`${attr[i].value.getUINT64_VEC()} | `)
            } else if (attr[i].value.isFLOAT_VEC()) {
                print(`${attr[i].value.getFLOAT_VEC().map<string>((i: f32) => (i + 0.000002).toString().slice(0, 8)).join(',')} | `)
            } else if (attr[i].value.isDOUBLE_VEC()) {
                print(`${attr[i].value.getDOUBLE_VEC().map<string>((i: f64) => (i + 0.000002).toString().slice(0, 8)).join(',')} | `)
            } else if (attr[i].value.isSTRING_VEC()) {
                print(`${attr[i].value.getSTRING_VEC()} | `)
            }
        }
    }
}