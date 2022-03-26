import { expect } from "chai";
import { Blockchain, eosio_assert } from "@jafri/vert"
import { createContract, expectToThrow, createAccounts, createDummyNfts, mintTokens } from "../../utils";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const balanceContract = createContract(blockchain, 'balance', 'contracts/balance/target/balance.contract', true)
const xtokensContract = createContract(blockchain, 'xtokens', 'contracts/external/xtokens/xtokens')
const eosioTokenContract = createContract(blockchain, 'eosio.token', 'contracts/eosio.token/target/eosio.token.contract')
const atomicassetsContract = createContract(blockchain, 'atomicassets', 'contracts/external/atomicassets/atomicassets', true)
const [collector, trader, artist] = createAccounts(blockchain, 'collector', 'trader', 'artist')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await mintTokens(xtokensContract, 'XUSDC', 6, 1000000, 100000, [trader, collector])
  await mintTokens(xtokensContract, 'XETH', 8, 1000000, 100000, [trader, collector])
  await mintTokens(eosioTokenContract, 'XPR', 4, 1000000, 100000, [trader, collector])

  await createDummyNfts(atomicassetsContract, artist, 3, [trader, collector])
})

/* Helpers */
const getBalanceRows = () => balanceContract.tables.accounts().getTableRows()

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
      await balanceContract.actions.setglobals([true, false, false]).send()
      await expectToThrow(
        xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active'),
        eosio_assert('Contract balance is paused')
      )
    });

    it('isPaused: Incoming NFT deposits do not work (transfer)', async () => {
      await balanceContract.actions.setglobals([true, false, false]).send()
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await expectToThrow(
        atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id], 'deposit']).send('collector@active'),
        eosio_assert('Contract balance is paused')
      )
    });

    it('isPaused: Withdrawals do not work (withdraw)', async () => {
      await balanceContract.actions.setglobals([true, false, false]).send()
      await expectToThrow(
        balanceContract.actions.withdraw(['trader', [{ quantity: '1000.000000 XUSDC', contract: 'xtokens' }], []]).send('trader@active'),
        eosio_assert('Contract balance is paused')
      )
    });
  })

  describe('Add Balance', () => {
    it('1 token from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'trader',
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

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'trader',
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

    it('3 tokens from 2 contracts with 2 owners', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.00000000 XETH', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await xtokensContract.actions.transfer(['collector', 'balance', '100.000000 XUSDC', 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'balance', '100.00000000 XETH', 'deposit']).send('collector@active')
      await eosioTokenContract.actions.transfer(['collector', 'balance', '0.3333 XPR', 'deposit']).send('collector@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
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
        name: 'trader',
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
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id], 'deposit']).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: [assets[0].asset_id]
      }])
    });

    it('2 NFTs from 1 owner', async () => { 
      const assets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      await atomicassetsContract.actions.transfer(['collector', 'balance', [assets[0].asset_id, assets[1].asset_id], 'deposit']).send('collector@active')
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: [assets[0].asset_id, assets[1].asset_id]
      }])
    });

    it('6 NFTs from 2 owners', async () => { 
      const collectorAssets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      const collectorAssetIds = collectorAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([collector.name, 'balance', collectorAssetIds, 'deposit']).send('collector@active')
      
      const traderAssets = atomicassetsContract.tables.assets(trader.toBigInt()).getTableRows()
      const traderAssetIds = traderAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([trader.name, 'balance', traderAssetIds, 'deposit']).send('trader@active')
      
      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: collectorAssetIds
      }, {
        name: 'trader',
        tokens: [],
        nfts: traderAssetIds
      }])
    });
  })

  describe('Withdraw Balance', () => {
    it('1 token from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [{ quantity: '1000.000000 XUSDC', contract: 'xtokens' }], []]).send('trader@active')
      expect(getBalanceRows()).to.be.deep.equal([])
    });

    it('2 tokens from 1 contract with 1 owner', async () => { 
      await xtokensContract.actions.transfer(['trader', 'balance', '1000.000000 XUSDC', 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'balance', '3.3333 XPR', 'deposit']).send('trader@active')

      await balanceContract.actions.withdraw(['trader', [
        { quantity: '500.000000 XUSDC', contract: xtokensContract.name },
        { quantity: '2.0000 XPR', contract: eosioTokenContract.name }
      ], []]).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'trader',
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

    it('3 tokens from 2 contracts with 2 owners', async () => { 
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

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
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
        name: 'trader',
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
        name: 'collector',
        tokens: [],
        nfts: [assets[1].asset_id]
      }])
    });

    it('6 NFTs from 2 owners', async () => { 
      const collectorAssets = atomicassetsContract.tables.assets(collector.toBigInt()).getTableRows()
      const collectorAssetIds = collectorAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([collector.name, 'balance', collectorAssetIds, 'deposit']).send('collector@active')
      await balanceContract.actions.withdraw(['collector', [], [collectorAssetIds[0]]]).send('collector@active')

      const traderAssets = atomicassetsContract.tables.assets(trader.toBigInt()).getTableRows()
      const traderAssetIds = traderAssets.map((_: any) => _.asset_id)
      await atomicassetsContract.actions.transfer([trader.name, 'balance', traderAssetIds, 'deposit']).send('trader@active')
      await balanceContract.actions.withdraw(['trader', [], [traderAssetIds[0]]]).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        name: 'collector',
        tokens: [],
        nfts: collectorAssetIds.slice(1)
      }, {
        name: 'trader',
        tokens: [],
        nfts: traderAssetIds.slice(1)
      }])
    });
  })
});