import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const storeTestContract = blockchain.createContract('storetest', 'assembly/store/target/store.test')

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