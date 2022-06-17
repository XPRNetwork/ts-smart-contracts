import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const oraclesContract = blockchain.createContract('oracles', 'node_modules/proton-tsc/external/oracles/oracles')

const testContract = blockchain.createContract('test', 'oracles/target/oracles.contract')
blockchain.createAccounts('account1', 'account2', 'account3')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await oraclesContract.actions.setfeed(['oracles', undefined, 'Oracle 1', 'Oracle 1 Description', 'median', 'double', 
  [ { "key": "data_same_provider_limit", "value": 10 }, { "key": "data_window_size", "value": 210 }, { "key": "min_provider_wait_sec", "value": 0 } ]	
  , ['oracles']]).send()
  await oraclesContract.actions.feed(['oracles', 0, { d_double: 4.444 }]).send()
})

/* Tests */
describe('Test', () => {

  it('Test', async () => { 
    await testContract.actions.test([]).send('account1@active')
  });
});