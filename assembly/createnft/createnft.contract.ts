import { Name, Contract, Asset, check, print } from ".."
import { AtomicValue, AtomicAttribute, deserialize, AtomicFormat } from '../atomicassets/atomicdata';
import { sendCreateColllection, sendCreateTemplate, sendMintAsset, sendCreateSchema, ATOMICASSETS_CONTRACT, sendSetAssetData } from '../atomicassets/atomicassets.inline';
import { Assets, Collections, Config, Schemas, Templates } from '../atomicassets/atomicassets.tables';

@contract
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
            new AtomicAttribute("name", AtomicValue.new<string>("Bulls Collection")),
            new AtomicAttribute("img", AtomicValue.new<string>("QmT35anF2vLjjfgCQXBXfXqGgXXj4rJrsjcXWYLm9HDfWL")),
            new AtomicAttribute("description", AtomicValue.new<string>("Collection for Bulls")),
            new AtomicAttribute("url", AtomicValue.new<string>("https://bulls.com")),
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
            new AtomicFormat("series", "uint16"),
            new AtomicFormat("image", "string"),
            new AtomicFormat("name", "string"),
            new AtomicFormat("health", "uint64"),
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
            new AtomicAttribute("series", AtomicValue.new<u16>(1)),
            new AtomicAttribute("image", AtomicValue.new<string>("QmT35anF2vLjjfgCQXBXfXqGgXXj4rJrsjcXWYLm9HDfWL")),
            new AtomicAttribute("name", AtomicValue.new<string>("Dullahan"))
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
        const immutableData: AtomicAttribute[] = []
        const mutableData: AtomicAttribute[] = [
            new AtomicAttribute("health", AtomicValue.new<u64>(10))
        ]
        const tokensToBack: Asset[] = []
        sendMintAsset(this.contract, authorizedMinter, collectionName, schemaName, templateId, newAssetOwner, immutableData, mutableData, tokensToBack)
    }

    @action("setassetdata")
    setassetdata(): void {
        const author = Name.fromString("createnft")
        const owner = Name.fromString("createnft")
        const assetTable = Assets.getTable(ATOMICASSETS_CONTRACT, owner)
        const asset = assetTable.first()
        if (asset == null) {
            check(false, "asset not found")
            return
        }

        sendSetAssetData(this.contract, author, owner, asset.asset_id, [
            new AtomicAttribute("health", AtomicValue.new<u64>(5))
        ])
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
        const assetData = deserialize(asset.mutable_serialized_data, schema.format)

        // Print output
        print(`
            Collection: ${collection.collection_name}
            Collection Data: Description = ${collectionData[2].value.get<string>()}
            Template Data: Image = ${templateData[1].value.get<string>()}
            Asset Data: Health = ${assetData[0].value.get<u64>()}
            Asset: ${asset.asset_id}
        `)
    }
}
