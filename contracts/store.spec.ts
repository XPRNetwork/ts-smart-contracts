import { Blockchain } from "@jafri/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const storeTestContract = blockchain.createContract('storetest', 'contracts/target/store.test')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Store', () => {
  it('Runs tests', async () => { 
    await storeTestContract.actions.teststore([]).send()
  });
});