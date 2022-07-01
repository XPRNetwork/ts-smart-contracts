import { expect } from "chai";
import { Blockchain, protonAssert, expectToThrow, createDummyNfts, mintTokens, Account, nameToBigInt, symbolCodeToBigInt } from "@proton/vert"
import { Asset, Name } from '@greymass/eosio'

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const balanceContract = blockchain.createContract('balance', 'assembly/balance/target/balance.contract')
const xtokensContract = blockchain.createContract('xtokens', 'external/xtokens/xtokens')
const eosioTokenContract = blockchain.createContract('eosio.token', 'assembly/token/target/token.contract')
const atomicassetsContract = blockchain.createContract('atomicassets', 'external/atomicassets/atomicassets')
const [collector, trader, artist] = blockchain.createAccounts('collector', 'trader', 'artist')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await mintTokens(xtokensContract, 'XUSDC', 6, 1000000, 100000, [trader, collector])
  await mintTokens(xtokensContract, 'XETH', 8, 1000000, 100000, [trader, collector])
  await mintTokens(eosioTokenContract, 'XPR', 4, 1000000, 100000, [trader, collector])

  await createDummyNfts(atomicassetsContract, artist, 5, [trader, collector])
})

/* Helpers */
const getBalanceRows = () => balanceContract.tables.balances().getTableRows()
const getAccount = (contract: Account, accountName: string, symcode: string) => {
  const accountBigInt = nameToBigInt(Name.from(accountName));
  const symcodeBigInt = symbolCodeToBigInt(Asset.SymbolCode.from(symcode));
  return contract.tables.accounts(accountBigInt).getTableRow(symcodeBigInt)
}
const getXUSDCBalance = (accountName: string) => getAccount(xtokensContract, accountName, 'XUSDC')
const getXETHBalance = (accountName: string) => getAccount(xtokensContract, accountName, 'XETH')
const getXPRBalance = (accountName: string) => getAccount(eosioTokenContract, accountName, 'XPR')
const getNftAssetIds = (account: Account) => atomicassetsContract.tables.assets(account.toBigInt()).getTableRows().map((_: any) => _.asset_id)


/* Tests */
describe('Balance', () => {
  describe('Check Authorizations', () => {
    it('withdraw: Only actor can call', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }], []]).send('trader@active')

      await expectToThrow(
        balanceContract.actions.withdraw(['trader', [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }], []]).send(),
        'missing required authority trader'
      )
    });
  })

  describe('Paused', () => {
    it('isPaused: Incoming token deposits do not work (transfer)', async () => {
      await balanceContract.actions.setglobals([true, false, false, true, true, true]).send()
      await expectToThrow(
        xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active'),
        protonAssert('Contract balance is paused')
      )
    });

    it('isPaused: Incoming NFT deposits do not work (transfer)', async () => {
      await balanceContract.actions.setglobals([true, false, false, true, true, true]).send()
      const nfts = getNftAssetIds(collector)
      await expectToThrow(
        atomicassetsContract.actions.transfer(['collector', 'balance', nfts.slice(0, 1), 'deposit']).send('collector@active'),
        protonAssert('Contract balance is paused')
      )
    });

    it('isPaused: Withdrawals do not work (withdraw)', async () => {
      await balanceContract.actions.setglobals([true, false, false, true, true, true]).send()
      await expectToThrow(
        balanceContract.actions.withdraw(['trader', [{ quantity: '1000.000000 XUSDC', contract: 'xtokens' }], []]).send('trader@active'),
        protonAssert('Contract balance is paused')
      )
    });
  })

  describe('Add Balance', () => {
    it('1 token from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')

      expect(getXUSDCBalance('trader')).to.be.deep.eq({ balance: '99000.000000 XUSDC' })
      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '1000.000000 XUSDC'
        }],
        nfts: []
      }])
    });

    it('2 tokens from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      expect(getXUSDCBalance('trader')).to.be.deep.eq({ balance: '99000.000000 XUSDC' })
      expect(getXPRBalance('trader')).to.be.deep.eq({ balance: '99996.6667 XPR' })
      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '1000.000000 XUSDC'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '3.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('3 tokens from 2 assembly with 2 owners', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.00000000 XETH', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      expect(getXUSDCBalance('trader')).to.be.deep.eq({ balance: '99000.000000 XUSDC' })
      expect(getXETHBalance('trader')).to.be.deep.eq({ balance: '99000.00000000 XETH' })
      expect(getXPRBalance('trader')).to.be.deep.eq({ balance: '99996.6667 XPR' })

      await xtokensContract.actions.transfer(['collector', 'balance', '100.000000 XUSDC', 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'balance', '100.00000000 XETH', 'deposit']).send('collector@active')
      await eosioTokenContract.actions.transfer(['collector', 'balance', '0.3333 XPR', 'deposit']).send('collector@active')

      expect(getXUSDCBalance('collector')).to.be.deep.eq({ balance: '99900.000000 XUSDC' })
      expect(getXETHBalance('collector')).to.be.deep.eq({ balance: '99900.00000000 XETH' })
      expect(getXPRBalance('collector')).to.be.deep.eq({ balance: '99999.6667 XPR' })

      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '100.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '100.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '0.3333 XPR'
        }],
        nfts: []
      }, {
        account: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '1000.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '1000.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '3.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('1 NFT from 1 owner', async () => { 
      const preNfts = getNftAssetIds(collector)
      await atomicassetsContract.actions.transfer(['collector', 'balance', preNfts.slice(0, 1), 'deposit']).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [],
        nfts: preNfts.slice(0, 1)
      }])

      const postNfts = getNftAssetIds(collector)
      expect(postNfts).to.be.deep.equal(preNfts.slice(1))
    });

    it('2 NFTs from 1 owner', async () => { 
      const preNfts = getNftAssetIds(collector)
      await atomicassetsContract.actions.transfer(['collector', 'balance', preNfts.slice(0, 2), 'deposit']).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [],
        nfts: preNfts.slice(0, 2)
      }])

      const postNfts = getNftAssetIds(collector)
      expect(postNfts).to.be.deep.equal(preNfts.slice(2))
    });

    it('6 NFTs from 2 owners', async () => { 
      const collectorNfts = getNftAssetIds(collector)
      await atomicassetsContract.actions.transfer([collector.name, 'balance', collectorNfts, 'deposit']).send('collector@active')
      
      const traderNfts = getNftAssetIds(trader)
      await atomicassetsContract.actions.transfer([trader.name, 'balance', traderNfts, 'deposit']).send('trader@active')
      
      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [],
        nfts: collectorNfts
      }, {
        account: 'trader',
        tokens: [],
        nfts: traderNfts
      }])

      expect(getNftAssetIds(collector)).to.be.deep.equal([])
      expect(getNftAssetIds(trader)).to.be.deep.equal([])
    });
  })

  describe('Withdraw Balance', () => {
    it('1 token from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [{ quantity: '1000.000000 XUSDC', contract: 'xtokens' }], []]).send('trader@active')
      expect(getBalanceRows()).to.be.deep.equal([])
      expect(getXUSDCBalance('trader')).to.be.deep.eq({ balance: '100000.000000 XUSDC' })
    });

    it('2 tokens from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await balanceContract.actions.withdraw(['trader', [
        { quantity: '500.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '2.0000 XPR', contract: eosioTokenContract.name }
      ], []]).send('trader@active')

      expect(getXUSDCBalance('trader')).to.be.deep.eq({ balance: '99500.000000 XUSDC' })
      expect(getXPRBalance('trader')).to.be.deep.eq({ balance: '99998.6667 XPR' })

      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '500.000000 XUSDC'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '1.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('3 tokens from 2 assembly with 2 owners', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.00000000 XETH', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await xtokensContract.actions.transfer(['collector', 'balance', '100.000000 XUSDC', 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'balance', '100.00000000 XETH', 'deposit']).send('collector@active')
      await eosioTokenContract.actions.transfer(['collector', 'balance', '0.3333 XPR', 'deposit']).send('collector@active')

      await balanceContract.actions.withdraw(['trader', [
        { quantity: '500.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '500.00000000 XETH', contract: xtokensContract.name },
        { quantity: '2.0000 XPR', contract: eosioTokenContract.name }
      ], []]).send('trader@active')

      await balanceContract.actions.withdraw(['collector', [
        { quantity: '50.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '50.00000000 XETH', contract: xtokensContract.name },
        { quantity: '0.2000 XPR', contract: eosioTokenContract.name }
      ], []]).send('collector@active')

      expect(getXUSDCBalance('trader')).to.be.deep.eq({ balance: '99500.000000 XUSDC' })
      expect(getXETHBalance('trader')).to.be.deep.eq({ balance: '99500.00000000 XETH' })
      expect(getXPRBalance('trader')).to.be.deep.eq({ balance: '99998.6667 XPR' })

      expect(getXUSDCBalance('collector')).to.be.deep.eq({ balance: '99950.000000 XUSDC' })
      expect(getXETHBalance('collector')).to.be.deep.eq({ balance: '99950.00000000 XETH' })
      expect(getXPRBalance('collector')).to.be.deep.eq({ balance: '99999.8667 XPR' })

      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '50.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '50.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '0.1333 XPR'
        }],
        nfts: []
      }, {
        account: 'trader',
        tokens: [{
          contract: xtokensContract.name.toString(),
          quantity: '500.000000 XUSDC'
        }, {
          contract: xtokensContract.name.toString(),
          quantity: '500.00000000 XETH'
        }, {
          contract: eosioTokenContract.name.toString(),
          quantity: '1.3333 XPR'
        }],
        nfts: []
      }])
    });

    it('1 NFT from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id], 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], [assets[0].asset_id]]).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([])
    });

    it('2 NFTs from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id, assets[1].asset_id], 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], [assets[0].asset_id]]).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [],
        nfts: [assets[1].asset_id]
      }])
    });

    it('6 NFTs from 2 owners', async () => { 
      const collectorNfts = getNftAssetIds(collector)
      await atomicassetsContract.actions.transfer([collector.name, 'balance', collectorNfts, 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], collectorNfts.slice(0, 1)]).send('collector@active')

      const traderNfts = getNftAssetIds(trader)
      await atomicassetsContract.actions.transfer([trader.name, 'balance', traderNfts, 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [], traderNfts.slice(0, 1)]).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        account: 'collector',
        tokens: [],
        nfts: collectorNfts.slice(1)
      }, {
        account: 'trader',
        tokens: [],
        nfts: traderNfts.slice(1)
      }])
    });
  })
});