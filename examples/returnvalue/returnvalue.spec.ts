import { expect } from "chai";
import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const returnvalueContract = blockchain.createContract('returnvalue', 'returnvalue/target/returnvalue.contract')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('returnvalue', () => {
  it('returnvalue', async () => { 
    await returnvalueContract.actions.returnvalue([]).send();
    expect(blockchain.actionTraces[0].returnValue).to.be.deep.eq(new Uint8Array([
      5, 0, 0, 0,
      0, 0, 0, 0
    ]))
  });
});