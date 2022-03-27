import { Name, check, action, contract, requireAuth, MultiIndex, Contract, nameToSuffix, hasAuth, isAccount, Singleton } from 'as-chain'
import { atomicassets, createcol, MAX_MARKET_FEE } from './atomicassets.constants';
import { Collections, Config } from './atomicassets.tables';
// import { serialize } from './atomicdata';
import { ATTRIBUTE_MAP_SINGLE, endAttribute, findAttribute } from './atomicdata';

@contract(atomicassets)
export class KvContract extends Contract {
    collectionsTable: MultiIndex<Collections> = Collections.getTable(this.receiver)
    configSingleton: Singleton<Config> = Config.getSingleton(this.receiver)

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
            check(isAccount(authorized_accounts[i]), `At least one account does not exist - ${authorized_accounts[i]}`)
            check(authorized_accounts.lastIndexOf(authorized_accounts[i]) == i, "You can't have duplicates in the authorized_accounts")
        }
        for (let i = 0; i < notify_accounts.length; i++) {
            check(isAccount(notify_accounts[i]), `At least one account does not exist - ${notify_accounts[i]}`)
            check(notify_accounts.lastIndexOf(notify_accounts[i]) == i, "You can't have duplicates in the notify_accounts")
        }

        check(0 <= market_fee && market_fee <= MAX_MARKET_FEE, `The market_fee must be between 0 and ${MAX_MARKET_FEE}`);
    
        this.check_name_length(data);
        
        const current_config = this.configSingleton.get();
    
        const newCollection = new Collections(
            collection_name,
            author,
            allow_notify,
            authorized_accounts,
            notify_accounts,
            market_fee,
            []
            // serialize(data, current_config.collection_format)
        )
        this.collectionsTable.store(newCollection, author)
    }

    /**
    * The "name" attribute is limited to 64 characters max for both assets and collections
    * This function checks that, if there exists an ATTRIBUTE with name: "name", the value of it
    * must be of length <= 64
    */
    check_name_length(data: ATTRIBUTE_MAP_SINGLE[]): void {
        const data_itr = findAttribute(data, "name");
        if (data_itr && data_itr != endAttribute(data)) {
            if (data_itr.isstring()) {
                check(data_itr.getstring().length <= 64, "Names (attribute with name: \"name\") can only be 64 characters max");
            }
        }
    }
}