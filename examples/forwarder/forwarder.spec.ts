import { Blockchain, mintTokens } from "@proton/vert"
import path from 'path'

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
console.log(path.join(__dirname, 'forwarder'))
const xtokensContract = blockchain.createContract('xtokens',  path.join(__dirname, '../../external/xtokens/xtokens'))
const forwarderContract = blockchain.createContract('forwarder', path.join(__dirname, 'forwarder'))
const safeContract = blockchain.createContract('sf', path.join(__dirname, 'forwarder'))

const [trader] = blockchain.createAccounts('trader')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await mintTokens(xtokensContract, 'XUSDC', 6, 1000000, 100000, [trader])
  await mintTokens(xtokensContract, 'XETH', 8, 1000000, 100000, [trader])
})

/* Tests */
describe('Forwarder', () => {
  it('Tries', async () => { 
    await xtokensContract.actions.transfer([trader.name, forwarderContract.name, '1.000000 XUSDC', '']).send('trader@active')
  });
});