import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const storeTestContract = blockchain.createContract('storetest', 'assembly/modules/store/target/store.test')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Store', () => {
  it('Runs tests', async () => { 
    await storeTestContract.actions.store([]).send()
    await storeTestContract.actions.storescope([]).send()
    await storeTestContract.actions.getprimary([]).send()
    await storeTestContract.actions.getsecondary([]).send()
    await storeTestContract.actions.itrstorage([]).send()
  });
});