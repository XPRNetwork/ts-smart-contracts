import { expect } from "chai";
import { Blockchain, eosio_assert, expectToThrow } from "@jafri/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const atomicassetsContract = blockchain.createContract('atomicassets', 'contracts/atomicassets/target/atomicassets.contract')
const [artist] = blockchain.createAccounts('artist')

/* Helpers */
const getCollections = () => atomicassetsContract.tables.collections().getTableRows()

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Atomicassets', () => {
  describe('Check Authorizations', () => {
    it('create col', async () => { 
      const authorStr = 'artist'
      await atomicassetsContract.actions.createcol({
        author: authorStr,
        collection_name: authorStr,
        allow_notify: true,
        authorized_accounts: [authorStr],
        notify_accounts: [],
        market_fee: 0.01,
        data: [['uint8', 0]]
      }).send('artist@active')
    });
  })
});