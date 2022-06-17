import { expect } from "chai";
import { Blockchain, expectToThrow } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const kvContract = blockchain.createContract('kv', 'kv/target/kv.contract')
blockchain.createAccounts('account1', 'account2', 'account3')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Helpers */
const getKvRows = () => kvContract.tables.kvs().getTableRows()
const objectToKv = (obj: object) => Object.entries(obj).map(([k, v]) => ({ key: k, value: v }))

/* Tests */
describe('Balance', () => {
  describe('Check Authorizations', () => {
    it('updatevalues: Only actor can call', async () => { 
      await kvContract.actions.updatevalues(['account1', objectToKv({ telegram: '@proton' })]).send('account1@active')

      await expectToThrow(
        kvContract.actions.updatevalues(['account1', objectToKv({ telegram: '@proton' })]).send('kv@active'),
        'missing required authority account1'
      )
    });

    it('removekeys: Only actor can call', async () => { 
      await kvContract.actions.updatevalues(['account1', objectToKv({ telegram: '@proton' })]).send('account1@active')

      await expectToThrow(
        kvContract.actions.removekeys(['account1', objectToKv({ telegram: '@proton' })]).send('kv@active'),
        'missing required authority account1'
      )
    });
  })

  describe('Add and remove Values', () => {
    it('Add and remove 1 value from 1 actor', async () => { 
      const values = objectToKv({ telegram: '@proton' })
      await kvContract.actions.updatevalues(['account1', values]).send('account1@active')
      expect(getKvRows()).to.be.deep.equal([{
        account: 'account1',
        values: values
      }])

      await kvContract.actions.removekeys(['account1', values.map(_ => _.key)]).send('account1@active')
      expect(getKvRows()).to.be.deep.equal([])
    });

    it('Add and remove 3 values from 1 actor', async () => { 
      const values = objectToKv({ telegram: '@proton', discord: '#proton', twitter: '@protonxpr' })
      await kvContract.actions.updatevalues(['account1', values]).send('account1@active')
      expect(getKvRows()).to.be.deep.equal([{
        account: 'account1',
        values: values
      }])

      await kvContract.actions.removekeys(['account1', ['telegram']]).send('account1@active')
      expect(getKvRows()).to.be.deep.equal([{
        account: 'account1',
        values: values.filter(_ => _.key !== 'telegram')
      }])

      await kvContract.actions.removekeys(['account1', values.map(_ => _.key)]).send('account1@active')
      expect(getKvRows()).to.be.deep.equal([])
    });

    it('Add 3 values from 3 actors', async () => { 
      const values1 = objectToKv({ telegram: '@proton', discord: '#proton', twitter: '@protonxpr' })
      const values2 = objectToKv({ telegram: '@metal', discord: '#metal', twitter: '@metalpays' })
      const values3 = objectToKv({ telegram: '@loan', discord: '#loan', twitter: '@loanproton' })

      await kvContract.actions.updatevalues(['account1', values1]).send('account1@active')
      await kvContract.actions.updatevalues(['account2', values2]).send('account2@active')
      await kvContract.actions.updatevalues(['account3', values3]).send('account3@active')
      expect(getKvRows()).to.be.deep.equal([
        {
          account: 'account1',
          values: values1
        },
        {
          account: 'account2',
          values: values2
        },
        {
          account: 'account3',
          values: values3
        }
      ])

      await kvContract.actions.removekeys(['account1', ['telegram']]).send('account1@active')
      await kvContract.actions.removekeys(['account2', values2.map(_ => _.key)]).send('account2@active')
      await kvContract.actions.removekeys(['account3', ['twitter']]).send('account3@active')
      expect(getKvRows()).to.be.deep.equal([
        {
          account: 'account1',
          values: values1.filter(_ => _.key !== 'telegram')
        },
        {
          account: 'account3',
          values: values3.filter(_ => _.key !== 'twitter')
        }
      ])

      await kvContract.actions.removekeys(['account1', values1.map(_ => _.key)]).send('account1@active')
      await kvContract.actions.removekeys(['account3', values3.map(_ => _.key)]).send('account3@active')
      expect(getKvRows()).to.be.deep.equal([])
    });
  })
});