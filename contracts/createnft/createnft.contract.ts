import { Name, Contract, Asset, check, print } from 'as-chain'
import { ATOMIC_ATTRIBUTE, ATTRIBUTE_MAP_SINGLE, deserialize, FORMAT } from '../atomicassets/atomicdata';
import { sendCreateColllection, sendCreateTemplate, sendMintAsset, sendCreateSchema, ATOMICASSETS_CONTRACT } from '../atomicassets/atomicassets.inline';
import { Assets, Collections, Config, Schemas, Templates } from '../atomicassets/atomicassets.tables';

@contract("createnft")
class CreateNftContract extends Contract {
    contract: Name = this.receiver
    
    @action("createcol")
    createcol(): void {
        const author = Name.fromString("createnft")
        const collectionName = Name.fromString("bullscollect") // must be 12 char
        const allowNotify = true
        const authorizedAccounts = [author]
        const notifyAccounts: Name[] = []
        const marketFee = 0.02
        const data = [
            // Only these 4 are supported for collections
            new ATTRIBUTE_MAP_SINGLE("name", ATOMIC_ATTRIBUTE.new<string>("Bulls Collection")),
            new ATTRIBUTE_MAP_SINGLE("img", ATOMIC_ATTRIBUTE.new<string>("QmT35anF2vLjjfgCQXBXfXqGgXXj4rJrsjcXWYLm9HDfWL")),
            new ATTRIBUTE_MAP_SINGLE("description", ATOMIC_ATTRIBUTE.new<string>("Collection for Bulls")),
            new ATTRIBUTE_MAP_SINGLE("url", ATOMIC_ATTRIBUTE.new<string>("https://bulls.com")),
        ]

        // Sends inline action
        sendCreateColllection(this.contract, author, collectionName, allowNotify, authorizedAccounts, notifyAccounts, marketFee, data)
    }

    @action("createschema")
    createschema(): void {
        const authorizedCreator = Name.fromString("createnft")
        const collectionName = Name.fromString("bullscollect")
        const schemaName = Name.fromString("bullsschema1")
        const schemaFormat = [
            // LHS is name, RHS is type. 
            new FORMAT("series", "uint16"),
            new FORMAT("image", "string"),
            new FORMAT("name", "string"),
        ]
        sendCreateSchema(this.contract, authorizedCreator, collectionName, schemaName, schemaFormat)
    }

    @action("createtempl")
    createtempl(): void {
        const authorizedCreator = Name.fromString("createnft")
        const collectionName = Name.fromString("bullscollect")
        const schemaName = Name.fromString("bullsschema1")
        const transferable = true
        const burnable = true
        const maxSupply = 100
        const immutableData = [
            // Match schema from createschema
            new ATTRIBUTE_MAP_SINGLE("series", ATOMIC_ATTRIBUTE.new<u16>(1)),
            new ATTRIBUTE_MAP_SINGLE("image", ATOMIC_ATTRIBUTE.new<string>("QmT35anF2vLjjfgCQXBXfXqGgXXj4rJrsjcXWYLm9HDfWL")),
            new ATTRIBUTE_MAP_SINGLE("name", ATOMIC_ATTRIBUTE.new<string>("Dullahan"))
        ]
        sendCreateTemplate(this.contract, authorizedCreator, collectionName, schemaName, transferable, burnable, maxSupply, immutableData)
    }

    @action("mintasset")
    mintasset(): void {
        const authorizedMinter: Name = Name.fromString("createnft")
        const collectionName = Name.fromString("bullscollect")
        const schemaName = Name.fromString("bullsschema1")
        const templateId = 1 // hard coded since we only created 1 template, but replace it with actual template ID
        const newAssetOwner = authorizedMinter
        const immutableData: ATTRIBUTE_MAP_SINGLE[] = []
        const mutableData: ATTRIBUTE_MAP_SINGLE[] = []
        const tokensToBack: Asset[] = []
        sendMintAsset(this.contract, authorizedMinter, collectionName, schemaName, templateId, newAssetOwner, immutableData, mutableData, tokensToBack)
    }


    @action("readnft")
    readnft(): void {
        const owner = Name.fromString("createnft")
        const collectionName = Name.fromString("bullscollect")
        const schemaName = Name.fromString("bullsschema1")
        const templateId = 1

        // Tables
        const configSingleton = Config.getSingleton(ATOMICASSETS_CONTRACT)
        const collectionTable = Collections.getTable(ATOMICASSETS_CONTRACT)
        const schemaTable = Schemas.getTable(ATOMICASSETS_CONTRACT, collectionName)
        const templateTable = Templates.getTable(ATOMICASSETS_CONTRACT, collectionName)
        const assetTable = Assets.getTable(ATOMICASSETS_CONTRACT, owner)

        // Get by name
        const config = configSingleton.get()
        const collection = collectionTable.requireGet(collectionName.N, "collection not found")
        const schema = schemaTable.requireGet(schemaName.N, "schema not found")
        const template = templateTable.requireGet(templateId, "template not found")

        // Get first asset
        const asset = assetTable.first()
        if (asset == null) {
            check(false, "asset not found")
            return
        }

        // Deserialize data
        const collectionData = deserialize(collection.serialized_data, config.collection_format)
        const templateData = deserialize(template.immutable_serialized_data, schema.format)

        // Print output
        print(`
            Collection: ${collection.collection_name}
            Collection Data: Description = ${collectionData[2].value.get<string>()}
            Template Data: Image = ${templateData[1].value.get<string>()}
            Asset: ${asset.asset_id}
        `)
    }
}
