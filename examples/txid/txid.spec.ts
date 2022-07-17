import { expect } from "chai";
import { Blockchain } from "@proton/vert"
import { Transaction, PermissionLevel, Serializer } from "@greymass/eosio";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const txidContract = blockchain.createContract('txid', 'txid/target/txid.contract')
const [account1] = blockchain.createAccounts('account1', 'account2', 'account3')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('TX ID', () => {
  it('getsizeandid', async () => { 
    const tx = Transaction.from({
      actions: [
        {
          account: txidContract.name,
          name: 'getsizeandid',
          data: Serializer.encode({
            abi: txidContract.abi,
            type: 'getsizeandid',
            object: {
              actor: account1.name
            },
          }).array,
          
          authorization: [PermissionLevel.from({
            actor: account1.name,
            permission: 'active'
          })]
        }
      ],
      expiration: 0,
      ref_block_num: 0,
      ref_block_prefix: 0
    })

    await blockchain.applyTransaction(tx)
    expect(tx.id.toString()).to.equal('97a17076c5a609d5c158eee58b0bbb6acdaca3bc9daee9ae04ac235195838879')
    expect(txidContract.tables.kvs().getTableRows()).to.be.deep.equal([
      {
        account: 'account1',
        values: [
          { key: 'tx_size', value: '58' },
          { key: 'tx_id', value: tx.id.toString() },
        ]
      }
    ])
  });

  it('read action data', async () => { 
    const tx = Transaction.from({
      actions: [
        {
          account: txidContract.name,
          name: 'getsizeandid',
          data: Serializer.encode({
            abi: txidContract.abi,
            type: 'getsizeandid',
            object: {
              actor: account1.name
            },
          }).array,
          
          authorization: [PermissionLevel.from({
            actor: account1.name,
            permission: 'active'
          })]
        },
        {
          account: txidContract.name,
          name: 'readaction',
          data: Serializer.encode({
            abi: txidContract.abi,
            type: 'readaction',
            object: {},
          }).array,

          authorization: [PermissionLevel.from({
            actor: account1.name,
            permission: 'active'
          })]
        }
      ],
      expiration: 0,
      ref_block_num: 0,
      ref_block_prefix: 0
    })

    await blockchain.applyTransaction(tx)

    expect(tx.id.toString()).to.equal('31eae54a95fbbef0e1c99f9867efd9a6bc8de6d6fdf34633600e9259081a93c0')
    expect(txidContract.tables.kvs().getTableRows()).to.be.deep.equal([
      {
        account: 'account1',
        values: [
          { key: 'tx_size', value: '92' },
          { key: 'tx_id', value: '31eae54a95fbbef0e1c99f9867efd9a6bc8de6d6fdf34633600e9259081a93c0' },
          { key: 'action_size', value: '42' },
        ]
      }
    ])
  });

  it('protocol feature', async () => { 
    await txidContract.actions.protofeature([]).send()
  })

});