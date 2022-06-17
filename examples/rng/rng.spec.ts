import { expect } from "chai";
import { Blockchain } from "@proton/vert"
import { pubKeyData, sign } from "../../external/rng/utils";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const rngContract = blockchain.createContract('rng', '../external/rng/rng')
const receiverContract = blockchain.createContract('receiver', 'rng/target/rng.contract')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

describe('rng', () => {
  beforeEach(async () => {
    blockchain.resetTables();

    // Set rng key (done automatically on Proton)
    await rngContract.actions.setsigpubkey(pubKeyData).send('rng@active')
  });

  it("Workflow", async () => {
    // Call getrandom on your contract to create RNG job
    const request = {
      customerId: 1,
      account: receiverContract.name,
      signingValue: "13017239558691620510",
    }
    await receiverContract.actions.getrandom(request).send('receiver@active')
    expect(receiverContract.tables['results']().getTableRows()).to.be.deep.eq(
      [{
        customerId: 1,
        account: 'receiver',
        randomValue: 0
      }]
    );

    // Fulfill RNG request (done automatically on Proton)
    const setData = {
      job_id: 0,
      random_value: sign(request.signingValue)
    }
    await rngContract.actions.setrand(setData).send('rng@active')
    expect(receiverContract.tables['results']().getTableRows()).to.be.deep.eq(
      [{
        customerId: 1,
        account: 'receiver',
        randomValue: 76 // Testing is deterministic, but would be random in production
      }]
    );
  });
});
