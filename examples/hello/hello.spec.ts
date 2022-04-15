import { expect } from "chai";
import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const helloContract = blockchain.createContract('hello', 'hello/target/hello.contract')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Hello', () => {
  it('Says Hello', async () => { 
    await helloContract.actions.say(['hello']).send()
    expect(helloContract.bc.console).to.be.eq('hello')
  });
});