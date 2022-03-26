import { Account } from "@jafri/vert"

export const createDummyNfts = async (atomicassetsContract: Account, author: Account, mintToEach: number, accountsToMintTo: Account[]) => {
    const authorStr = author.name.toString()
    const authorPerm = `${author.name}@active`
    
    await atomicassetsContract.actions.init().send()
    await atomicassetsContract.actions.admincoledit([
      [
        { "name": "name", "type": "string" },
        { "name": "img", "type": "ipfs" },
        { "name": "description", "type": "string" },
        { "name": "url", "type": "string" }
      ]
    ]).send()
    await atomicassetsContract.actions.createcol({
      author: authorStr,
      collection_name: authorStr,
      allow_notify: true,
      authorized_accounts: [authorStr],
      notify_accounts: [],
      market_fee: 0.01,
      data: []
    }).send(authorPerm)
    await atomicassetsContract.actions.createschema({
      authorized_creator: authorStr,
      collection_name: authorStr,
      schema_name: authorStr,
      schema_format: [
        { name: 'image', type: 'string' },
        { name: 'name', type: 'string' },
      ]
    }).send(authorPerm)
    await atomicassetsContract.actions.createtempl({
      authorized_creator: authorStr,
      collection_name: authorStr,
      schema_name: authorStr,
      transferable: true,
      burnable: true,
      max_supply: 100000,
      immutable_data: [
        { key: 'image', value: ['string', 'abc.png'] },
        { key: 'name', value: ['string', 'BULL'] },
      ]
    }).send(authorPerm)

    for (const accountToMintTo of accountsToMintTo) {
        for (let i = 0; i < mintToEach; i++) {
            await atomicassetsContract.actions.mintasset({
                authorized_minter: authorStr,
                collection_name: authorStr,
                schema_name: authorStr,
                template_id: 1,
                new_asset_owner: accountToMintTo.name.toString(),
                immutable_data: [],
                mutable_data: [],
                tokens_to_back: []
              }).send(authorPerm) 
        }
    }
}