import { Blockchain, protonAssert, expectToThrow } from "@proton/vert"
import { expect } from "chai"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const safemathContract = blockchain.createContract('safemath', 'assembly/modules/safemath/target/safemath.test')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Store', () => {
  it('Add', async () => {
    // Valid
    await safemathContract.actions.add([40, 50]).send()
    expect(safemathContract.bc.console).to.be.equal("90")

    // Invalid
    expectToThrow(
      safemathContract.actions.add(["10000000000000000000", "10000000000000000000"]).send(),
      protonAssert('SafeMath Add Overflow')
    )
  });

  it('Sub', async () => {
    // Valid
    await safemathContract.actions.sub([50, 40]).send()
    expect(safemathContract.bc.console).to.be.equal("10")

    // Invalid
    expectToThrow(
      safemathContract.actions.sub(["10000000000000000000", "10000000000000000001"]).send(),
      protonAssert('SafeMath Sub Overflow')
    )
  });

  it('Mul', async () => {
    // Valid
    await safemathContract.actions.mul([50, 40]).send()
    expect(safemathContract.bc.console).to.be.equal("2000")

    // Invalid
    expectToThrow(
      safemathContract.actions.mul(["10000000000000000000", "10000000000000000001"]).send(),
      protonAssert('SafeMath Mul Overflow')
    )
  });

  it('Div', async () => {
    // Valid
    await safemathContract.actions.div([200, 40]).send()
    expect(safemathContract.bc.console).to.be.equal("5")

    // Invalid
    expectToThrow(
      safemathContract.actions.div(["10000000000000000000", "0"]).send(),
      protonAssert('SafeMath Div Overflow')
    )
  });
});