import { expect } from "chai";
import { Blockchain } from "@proton/vert"
import { TimePointSec } from "@greymass/eosio";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const timeContract = blockchain.createContract('time', 'time/target/time.contract')

/* Runs before each test */
beforeEach(async () => blockchain.resetTables())

/* Tests */
describe('Time', () => {
  it('Block Time and Number', async () => { 
    await timeContract.actions.blocknum([]).send()
    expect(blockchain.console).to.equal(`0`)

    blockchain.addBlocks(5)

    await timeContract.actions.blocknum([]).send()
    expect(blockchain.console).to.equal(`5`)

    await timeContract.actions.time([]).send()
    expect(blockchain.console).to.equal(`2500000|2500|2`)

    blockchain.addTime(TimePointSec.from(100))

    await timeContract.actions.blocknum([]).send()
    expect(blockchain.console).to.equal(`205`)

    await timeContract.actions.time([]).send()
    expect(blockchain.console).to.equal(`102500000|102500|102`)

    blockchain.subtractTime(TimePointSec.from(50))

    await timeContract.actions.blocknum([]).send()
    expect(blockchain.console).to.equal(`105`)

    await timeContract.actions.time([]).send()
    expect(blockchain.console).to.equal(`52500000|52500|52`)
  });
});