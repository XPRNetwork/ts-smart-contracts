import { Blockchain, mintTokens } from "@proton/vert"
import path from 'path'
import { Serializer } from '@greymass/eosio'
import { expect } from "chai"
/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const xtokensContract = blockchain.createContract('xtokens',  path.join(__dirname, '../../external/xtokens/xtokens'))
const forwarderContract = blockchain.createContract('forwarder', path.join(__dirname, 'target/forwarder.contract'))
const safeContract = blockchain.createContract('sf', path.join(__dirname, 'target/forwarder.contract'))

const [trader] = blockchain.createAccounts('trader')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await mintTokens(xtokensContract, 'XUSDC', 6, 1000000, 100000, [trader])
  await mintTokens(xtokensContract, 'XETH', 8, 1000000, 100000, [trader])
})

/* Tests */
describe('Forwarder', () => {
  it('Forwards properly', async () => { 
    await xtokensContract.actions.transfer([trader.name, forwarderContract.name, '1.000000 XUSDC', '']).send('trader@active');
    expect(Serializer.objectify(xtokensContract.bc.executionTraces as any)).to.be.deep.eq([
      {
        contract: 'xtokens',
        action: 'transfer',
        isInline: false,
        isNotification: false,
        firstReceiver: 'xtokens',
        sender: '',
        authorization: [ { actor: 'trader', permission: 'active' } ],
        data: {
          from: 'trader',
          to: 'forwarder',
          quantity: '1.000000 XUSDC',
          memo: ''
        },
        actionOrder: 0,
        executionOrder: 0
      },
      {
        contract: 'forwarder',
        action: 'transfer',
        isInline: false,
        isNotification: true,
        firstReceiver: 'xtokens',
        sender: '',
        authorization: [],
        data: {
          from: 'trader',
          to: 'forwarder',
          quantity: '1.000000 XUSDC',
          memo: ''
        },
        actionOrder: 0,
        executionOrder: 1
      },
      {
        contract: 'sf',
        action: 'transfer',
        isInline: false,
        isNotification: true,
        firstReceiver: 'xtokens',
        sender: '',
        authorization: [],
        data: {
          from: 'trader',
          to: 'forwarder',
          quantity: '1.000000 XUSDC',
          memo: ''
        },
        actionOrder: 0,
        executionOrder: 2
      }
    ])
  });
});