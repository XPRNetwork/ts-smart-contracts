import { expect } from "chai";
import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const cryptoContract = blockchain.createContract('crypto', 'crypto/target/crypto.contract')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Tests Crypto', () => {
  it('sha3', async () => { 
    await cryptoContract.actions.sha3([]).send()
  });

  it('keccak', async () => { 
    await cryptoContract.actions.keccak([]).send()
  });

  it('blake2', async () => { 
    await cryptoContract.actions.blake2([]).send()
  });
});