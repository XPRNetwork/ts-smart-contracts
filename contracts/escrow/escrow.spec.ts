import { expect } from "chai";
import { Blockchain } from "@jafri/vert"
import { createContract } from "../../utils/createContract";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const escrowContract = createContract(blockchain, 'escrow', 'contracts/escrow/target/escrow.contract', true)
const xtokensContract = createContract(blockchain, 'xtokens', 'contracts/external/xtokens/xtokens')
const eosioTokenContract = createContract(blockchain, 'eosio.token', 'contracts/eosio.token/target/eosio.token.contract')
const atomicassetsContract = createContract(blockchain, 'atomicassets', 'contracts/external/atomicassets/atomicassets', true)
const collector = blockchain.createAccount('collector')
const trader = blockchain.createAccount('trader')
blockchain.createAccount('artist')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

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
const getEscrowRows = () => escrowContract.tables.escrows().getTableRows()

/* Tests */
describe('Escrow', () => {
  describe('Start Escrow', () => {
    it('Start 1 escrow', async () => { 
      const collectorNfts = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      const traderNfts = atomicassetsContract.tables.assets(trader.toBigInt()).getTableRows()

      await atomicassetsContract.actions.transfer(['collector', 'escrow', [collectorNfts[0].asset_id], 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'escrow', '100.000000 XUSDC', 'deposit']).send('collector@active')
      
      const escrow = {
        from: 'collector',
        to: 'trader',
        fromTokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
        fromNfts: [collectorNfts[0].asset_id],
        toTokens: [{ quantity: '10.0000 XPR', contract: 'eosio.token' }],
        toNfts: [traderNfts[0].asset_id],
        expiry: 3600
      }
      
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      expect(getEscrowRows()).to.be.deep.equal([{
        id: 0,
        ...escrow
      }])
    });
  })
});