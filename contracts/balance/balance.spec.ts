import fs from "fs";
import { expect } from "chai";
import { Name, NameType } from "@greymass/eosio";
import { Blockchain } from "@jafri/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const createContract = (name: NameType, folder: string, sendsInline = false) => blockchain.createAccount({
  name: Name.from(name),
  wasm: fs.readFileSync(`${folder}.wasm`),
  abi: fs.readFileSync(`${folder}.abi`, 'utf8'),
  sendsInline
});

const balanceContract = createContract('balance', 'contracts/balance/target/balance.contract', true)
const xtokensContract = createContract('xtokens', 'external/xtokens/xtokens')
const eosioTokenContract = createContract('eosio.token', 'contracts/eosio.token/target/eosio.token.contract')
const atomicassetsContract = createContract('atomicassets', 'external/atomicassets/atomicassets', true)
const collector = blockchain.createAccount('collector')
const trader = blockchain.createAccount('trader')
blockchain.createAccount('artist')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetStore()

  await xtokensContract.actions.create([xtokensContract.name, '1000000.000000 XUSDC']).send()
  await xtokensContract.actions.issue([xtokensContract.name, '1000000.000000 XUSDC', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'trader', '100000.000000 XUSDC', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'collector', '100000.000000 XUSDC', '']).send()

  await xtokensContract.actions.create([xtokensContract.name, '1000000.00000000 XETH']).send()
  await xtokensContract.actions.issue([xtokensContract.name, '1000000.00000000 XETH', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'trader', '100000.00000000 XETH', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'collector', '100000.00000000 XETH', '']).send()

  await eosioTokenContract.actions.create([eosioTokenContract.name, '1000000.0000 XPR']).send()
  await eosioTokenContract.actions.issue([eosioTokenContract.name, '1000000.0000 XPR', '']).send()
  await eosioTokenContract.actions.transfer([eosioTokenContract.name, 'trader', '100000.0000 XPR', '']).send()
  await eosioTokenContract.actions.transfer([eosioTokenContract.name, 'collector', '100000.0000 XPR', '']).send()

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
    author: 'artist',
    collection_name: 'artist',
    allow_notify: true,
    authorized_accounts: ['artist'],
    notify_accounts: [],
    market_fee: 0.01,
    data: []
  }).send('artist@active')
  await atomicassetsContract.actions.createschema({
    authorized_creator: 'artist',
    collection_name: 'artist',
    schema_name: 'artist',
    schema_format: [
      { name: 'image', type: 'string' },
      { name: 'name', type: 'string' },
    ]
  }).send('artist@active')
  await atomicassetsContract.actions.createtempl({
    authorized_creator: 'artist',
    collection_name: 'artist',
    schema_name: 'artist',
    transferable: true,
    burnable: true,
    max_supply: 100,
    immutable_data: [
      { key: 'image', value: ['string', 'abc.png'] },
      { key: 'name', value: ['string', 'BULL'] },
    ]
  }).send('artist@active')

  for (let i = 0; i < 6; i++) {
    await atomicassetsContract.actions.mintasset({
      authorized_minter: 'artist',
      collection_name: 'artist',
      schema_name: 'artist',
      template_id: 1,
      new_asset_owner: i % 2 === 0 ? 'trader' : 'collector',
      immutable_data: [],
      mutable_data: [],
      tokens_to_back: []
    }).send('artist@active')
  }
})

/* Helpers */
const getBalanceRows = () => balanceContract.tables.accounts().getTableRows()

/* Tests */
describe('Balance', () => {
  describe('Add Balance', () => {
    it('1 token from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '1000.000000 XUSDC'
        }],
        nfts: []
      }])
    });

    it('2 tokens from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '1000.000000 XUSDC'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '3.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('3 tokens from 2 contracts with 2 owners', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.00000000 XETH', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await xtokensContract.actions.transfer(['collector', 'balance', '100.000000 XUSDC', 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'balance', '100.00000000 XETH', 'deposit']).send('collector@active')
      await eosioTokenContract.actions.transfer(['collector', 'balance', '0.3333 XPR', 'deposit']).send('collector@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '100.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '100.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '0.3333 XPR'
        }],
        nfts: []
      }, {
        name: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '1000.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '1000.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '3.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('1 NFT from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id], 'deposit']).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: [assets[0].asset_id]
      }])
    });

    it('2 NFTs from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id, assets[1].asset_id], 'deposit']).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: [assets[0].asset_id, assets[1].asset_id]
      }])
    });

    it('6 NFTs from 2 owners', async () => { 
      const collectorAssets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      const collectorAssetIds = collectorAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([collector.name, 'balance', collectorAssetIds, 'deposit']).send('collector@active')
      
      const traderAssets = atomicassetsContract.tables.assets(trader.toBigInt()).getTableRows()
      const traderAssetIds = traderAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([trader.name, 'balance', traderAssetIds, 'deposit']).send('trader@active')
      
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: collectorAssetIds
      }, {
        name: 'trader',
        tokens: [],
        nfts: traderAssetIds
      }])
    });
  })

  describe('Withdraw Balance', () => {
    it('1 token from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [{ quantity: '1000.000000 XUSDC', contract: 'xtokens' }], []]).send('trader@active')
      expect(getBalanceRows()).to.be.deep.equal([])
    });

    it('2 tokens from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await balanceContract.actions.withdraw(['trader', [
        { quantity: '500.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '2.0000 XPR', contract: eosioTokenContract.name }
      ], []]).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '500.000000 XUSDC'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '1.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('3 tokens from 2 contracts with 2 owners', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.00000000 XETH', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await xtokensContract.actions.transfer(['collector', 'balance', '100.000000 XUSDC', 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'balance', '100.00000000 XETH', 'deposit']).send('collector@active')
      await eosioTokenContract.actions.transfer(['collector', 'balance', '0.3333 XPR', 'deposit']).send('collector@active')

      await balanceContract.actions.withdraw(['trader', [
        { quantity: '500.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '500.00000000 XETH', contract: xtokensContract.name },
        { quantity: '2.0000 XPR', contract: eosioTokenContract.name }
      ], []]).send('trader@active')

      await balanceContract.actions.withdraw(['collector', [
        { quantity: '50.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '50.00000000 XETH', contract: xtokensContract.name },
        { quantity: '0.2000 XPR', contract: eosioTokenContract.name }
      ], []]).send('collector@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '50.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '50.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '0.1333 XPR'
        }],
        nfts: []
      }, {
        name: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '500.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '500.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '1.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('1 NFT from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id], 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], [assets[0].asset_id]]).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([])
    });

    it('2 NFTs from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id, assets[1].asset_id], 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], [assets[0].asset_id]]).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: [assets[1].asset_id]
      }])
    });

    it('6 NFTs from 2 owners', async () => { 
      const collectorAssets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      const collectorAssetIds = collectorAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([collector.name, 'balance', collectorAssetIds, 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], [collectorAssetIds[0]]]).send('collector@active')

      const traderAssets = atomicassetsContract.tables.assets(trader.toBigInt()).getTableRows()
      const traderAssetIds = traderAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([trader.name, 'balance', traderAssetIds, 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [], [traderAssetIds[0]]]).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: collectorAssetIds.slice(1)
      }, {
        name: 'trader',
        tokens: [],
        nfts: traderAssetIds.slice(1)
      }])
    });
  })
});