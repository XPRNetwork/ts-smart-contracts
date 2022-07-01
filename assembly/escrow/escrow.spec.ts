import { expect } from "chai";
import { Account, Blockchain, protonAssert, expectToThrow, createDummyNfts, mintTokens, nameToBigInt, symbolCodeToBigInt } from "@proton/vert"
import { TimePointSec, Name, Asset } from "@greymass/eosio";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const escrowContract = blockchain.createContract('escrow', 'assembly/escrow/target/escrow.contract')
const atomicassetsContract = blockchain.createContract('atomicassets', 'external/atomicassets/atomicassets')
const xtokensContract = blockchain.createContract('xtokens', 'external/xtokens/xtokens')
const eosioTokenContract = blockchain.createContract('eosio.token', 'assembly/token/target/token.contract')
const [collector, trader, artist] = blockchain.createAccounts('collector', 'trader', 'artist')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await mintTokens(xtokensContract, 'XUSDC', 6, 1000000, 100000, [trader, collector])
  await mintTokens(xtokensContract, 'XETH', 8, 1000000, 100000, [trader, collector])
  await mintTokens(eosioTokenContract, 'XPR', 4, 1000000, 100000, [trader, collector])

  await createDummyNfts(atomicassetsContract, artist, 3, [trader, collector])
})

/* Helpers */
const getBalanceRows = () => escrowContract.tables.balances().getTableRows()
const getEscrowGlobal = () => escrowContract.tables.escrowglobal().getTableRows()
const getEscrowRows = () => escrowContract.tables.escrows().getTableRows()
const getAccount = (contract: Account, accountName: string, symcode: string) => {
  const accountBigInt = nameToBigInt(Name.from(accountName));
  const symcodeBigInt = symbolCodeToBigInt(Asset.SymbolCode.from(symcode));
  return contract.tables.accounts(accountBigInt).getTableRow(symcodeBigInt)
}
const getNftAssetIds = (account: Account) => atomicassetsContract.tables.assets(account.toBigInt()).getTableRows().map((_: any) => _.asset_id)
const getXUSDCBalance = (accountName: string) => getAccount(xtokensContract, accountName, 'XUSDC')
const getXETHBalance = (accountName: string) => getAccount(xtokensContract, accountName, 'XETH')
const getXPRBalance = (accountName: string) => getAccount(eosioTokenContract, accountName, 'XPR')

/* Tests */
describe('Escrow', () => {
  const generateSingleEscrowDeposit = async () => {
    const escrow = {
      from: 'collector',
      to: 'trader',
      fromTokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
      fromNfts: [getNftAssetIds(collector)[0]],
      toTokens: [{ quantity: '10.0000 XPR', contract: 'eosio.token' }],
      toNfts: [getNftAssetIds(trader)[0]],
      expiry: 3600
    }
    await atomicassetsContract.actions.transfer(['collector', 'escrow', [escrow.fromNfts[0]], 'deposit']).send('collector@active')
    await xtokensContract.actions.transfer(['collector', 'escrow', escrow.fromTokens[0].quantity, 'deposit']).send('collector@active')
    await atomicassetsContract.actions.transfer(['trader', 'escrow', [escrow.toNfts[0]], 'deposit']).send('trader@active')
    await eosioTokenContract.actions.transfer(['trader', 'escrow', escrow.toTokens[0].quantity, 'deposit']).send('trader@active')
    return escrow
  }

  describe('Start Escrow (startescrow)', () => {
    it('Fails if called with non-actor', async () => {
      // Valid
      let escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      // Invalid
      escrow = await generateSingleEscrowDeposit()
      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('escrow@active'),
        'missing required authority collector'
      )
    });

    it('Fails if contract is paused', async () => {
      // Valid
      let escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active'),

        // Invalid
        escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.setglobals([true, false, false, true, true, true]).send()
      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('collector@active'),
        protonAssert('Contract escrow is paused')
      )
    });

    it("Fails if 'to' account is invalid", async () => {
      const startAndCancelEscrow = async (escrowId: number, to: string) => {
        const escrow = await generateSingleEscrowDeposit()
        escrow.to = to
        await escrowContract.actions.startescrow(escrow).send('collector@active')
        await escrowContract.actions.cancelescrow(['collector', escrowId]).send('collector@active')
      }

      // Valid -> open to anyone
      await startAndCancelEscrow(0, '')

      // Valid -> Specific account
      await startAndCancelEscrow(1, 'trader')

      // Invalid -> Non-existant account
      await expectToThrow(
        startAndCancelEscrow(2, 'notexist'),
        protonAssert('to must be empty or a valid account')
      )
    });

    it('Fails if expiry is invalid', async () => {
      const startAndCancelEscrow = async (escrowId: number, currentTime: number, expiry: number) => {
        blockchain.setTime(TimePointSec.from(currentTime))

        const escrow = await generateSingleEscrowDeposit()
        escrow.expiry = expiry
        await escrowContract.actions.startescrow(escrow).send('collector@active')
        await escrowContract.actions.cancelescrow(['collector', escrowId]).send('collector@active')
      }

      // Valid -> Expiry in future
      await startAndCancelEscrow(0, 10, 11)

      // Invalid -> Expiry is now
      await expectToThrow(
        startAndCancelEscrow(1, 10, 10),
        protonAssert('expiry must be in future')
      )

      // Invalid -> Expiry in past
      await expectToThrow(
        startAndCancelEscrow(1, 10, 9),
        protonAssert('expiry must be in future')
      )
    });

    it('Fail if Tokens and NFTs length invalid', async () => {
      // Empty 'from' side
      let escrow = await generateSingleEscrowDeposit()
      escrow.fromNfts = []
      escrow.fromTokens = []
      escrow.toNfts = []
      escrow.toTokens = []

      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('collector@active'),
        protonAssert('must escrow atleast one token or NFT on a side')
      )
    });

    it('Substracts balance for starting escrow', async () => {
      // Empty 'from' side
      const escrow = await generateSingleEscrowDeposit()
      expect(getBalanceRows()).to.be.deep.equal([
        {
          account: escrow.from,
          tokens: escrow.fromTokens,
          nfts: escrow.fromNfts
        },
        {
          account: escrow.to,
          tokens: escrow.toTokens,
          nfts: escrow.toNfts
        }
      ])

      await escrowContract.actions.startescrow(escrow).send('collector@active')

      expect(getBalanceRows()).to.be.deep.equal([{
        account: escrow.to,
        tokens: escrow.toTokens,
        nfts: escrow.toNfts
      }])
    });

    it('Increments escrowId globals with every new escrow', async () => {
      expect(getEscrowGlobal()).to.be.deep.equal([])

      for (let i = 1; i < 4; i++) {
        const escrow = await generateSingleEscrowDeposit()
        await escrowContract.actions.startescrow(escrow).send('collector@active')
        expect(getEscrowGlobal()).to.be.deep.equal([{ escrowId: i }])
      }
    });

    it('Saves 1 escrow to table', async () => {
      const escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      expect(getEscrowRows()).to.be.deep.equal([{
        id: 0,
        ...escrow
      }])
    });
  })

  describe('Fill Escrow (fillescrow)', () => {
    it('Fails if called with non-actor', async () => {
      let escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await escrowContract.actions.fillescrow(['trader', 0]).send('trader@active')

      escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await expectToThrow(
        escrowContract.actions.fillescrow(['trader', 0]).send('collector@active'),
        'missing required authority trader'
      )
    });

    it('Fails if contract expired', async () => {
      const startFillAndCancelEscrow = async (escrowId: number, currentTime: number) => {
        blockchain.setTime(TimePointSec.from(1))
        const escrow = await generateSingleEscrowDeposit()
        escrow.expiry = 10
        await escrowContract.actions.startescrow(escrow).send('collector@active')
        blockchain.setTime(TimePointSec.from(currentTime))
        await escrowContract.actions.fillescrow(['trader', escrowId]).send('trader@active')
      }

      // Valid -> Escrow expires in future
      await startFillAndCancelEscrow(0, 9);

      // Valid -> Escrow expires exactly at the moment
      await startFillAndCancelEscrow(1, 10);

      // Invalid -> Escrow already expired
      await expectToThrow(
        startFillAndCancelEscrow(2, 11),
        protonAssert('escrow expired')
      );
    });

    it('Fails if contract is paused', async () => {
      const escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      await escrowContract.actions.setglobals([true, false, false, true, true, true]).send()
      await expectToThrow(
        escrowContract.actions.fillescrow(['trader', 0]).send('trader@active'),
        protonAssert('Contract escrow is paused')
      )
    });

    it('Fails if escrow ID not found', async () => {
      const escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await expectToThrow(
        escrowContract.actions.fillescrow(['trader', 1]).send('trader@active'),
        protonAssert('no escrow with ID 1 found.')
      )
    });

    it("Fails if 'to' does not match specific", async () => {
      const startFillAndCancelEscrow = async (escrowId: number, to: string) => {
        const escrow = await generateSingleEscrowDeposit()
        escrow.to = to
        await escrowContract.actions.startescrow(escrow).send('collector@active')
        await escrowContract.actions.fillescrow(['trader', escrowId]).send('trader@active')
      }

      // Valid -> open to anyone
      await startFillAndCancelEscrow(0, '')

      // Valid -> Specific account
      await startFillAndCancelEscrow(1, 'trader')

      // Invalid -> Mismatch specific account
      await expectToThrow(
        startFillAndCancelEscrow(2, 'artist'),
        protonAssert('only artist can fill this escrow')
      )
    });

    it('Substracts balance for filling escrow', async () => {
      const fromNftsDeposit = getNftAssetIds(collector).slice(0, 2)
      const toNftsDeposit = getNftAssetIds(trader).slice(0, 2)

      const escrow = {
        from: 'collector',
        to: 'trader',
        fromTokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
        fromNfts: [fromNftsDeposit[0]],
        toTokens: [{ quantity: '10.0000 XPR', contract: 'eosio.token' }],
        toNfts: [toNftsDeposit[0]],
        expiry: 3600
      }

      await atomicassetsContract.actions.transfer(['collector', 'escrow', fromNftsDeposit, 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'escrow', '200.000000 XUSDC', 'deposit']).send('collector@active')
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      expect(getBalanceRows()).to.be.deep.equal([
        {
          account: escrow.from,
          tokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
          nfts: [fromNftsDeposit[1]]
        }
      ])

      await atomicassetsContract.actions.transfer(['trader', 'escrow', toNftsDeposit, 'deposit']).send('trader@active')
      await eosioTokenContract.actions.transfer(['trader', 'escrow', '20.0000 XPR', 'deposit']).send('trader@active')
      await escrowContract.actions.fillescrow(['trader', 0]).send('trader@active')

      expect(getBalanceRows()).to.be.deep.equal([
        {
          account: escrow.from,
          tokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
          nfts: [fromNftsDeposit[1]]
        },
        {
          account: escrow.to,
          tokens: [{ quantity: '10.0000 XPR', contract: 'eosio.token' }],
          nfts: [toNftsDeposit[1]]
        }
      ])
    });
  })

  describe('Cancel Escrow (cancelescrow)', () => {
    it('Fails if called with non-actor', async () => {
      let escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await escrowContract.actions.cancelescrow(['trader', 0]).send('trader@active')

      escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await expectToThrow(
        escrowContract.actions.cancelescrow(['trader', 0]).send('collector@active'),
        'missing required authority trader'
      )
    });

    it('Fails if contract is paused', async () => {
      const escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      await escrowContract.actions.setglobals([true, false, false, true, true, true]).send()
      await expectToThrow(
        escrowContract.actions.cancelescrow(['trader', 0]).send('trader@active'),
        protonAssert('Contract escrow is paused')
      )
    });

    it('Fails if escrow ID not found', async () => {
      const escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await expectToThrow(
        escrowContract.actions.cancelescrow(['trader', 1]).send('trader@active'),
        protonAssert('no escrow with ID 1 found.')
      )
    });

    it("Fails if called by not 'from' or 'to'", async () => {
      // Valid -> By to
      let escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await escrowContract.actions.cancelescrow(['trader', 0]).send('trader@active')

      // Valid -> By from
      escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await escrowContract.actions.cancelescrow(['collector', 1]).send('collector@active')

      // Invalid
      escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')
      await expectToThrow(
        escrowContract.actions.cancelescrow(['artist', 2]).send('artist@active'),
        protonAssert('missing required authority of collector or trader')
      )
    });

    it("Refunds to 'from'", async () => {
      const fromNfts = getNftAssetIds(collector)
      const escrow = {
        from: 'collector',
        to: 'trader',
        fromTokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
        fromNfts: [fromNfts[0]],
        toTokens: [{ quantity: '10.0000 XPR', contract: 'eosio.token' }],
        toNfts: [getNftAssetIds(trader)[0]],
        expiry: 3600
      }
      await atomicassetsContract.actions.transfer(['collector', 'escrow', [escrow.fromNfts[0]], 'deposit']).send('collector@active')
      await xtokensContract.actions.transfer(['collector', 'escrow', escrow.fromTokens[0].quantity, 'deposit']).send('collector@active')

      await escrowContract.actions.startescrow(escrow).send('collector@active')
      expect(getXUSDCBalance('collector')).to.be.deep.eq({ balance: '99900.000000 XUSDC' })

      await escrowContract.actions.cancelescrow(['trader', 0]).send('trader@active')
      expect(getXUSDCBalance('collector')).to.be.deep.eq({ balance: '100000.000000 XUSDC' })

      expect(getBalanceRows()).to.be.deep.equal([])
      expect(getEscrowRows()).to.be.deep.equal([])
      expect(getNftAssetIds(collector)).to.be.deep.equal(fromNfts)
    });
  })

  describe('Log Escrow (logescrow)', () => {
    it('Fails if called by other than owner', async () => {
      const escrow = await generateSingleEscrowDeposit()
      const action = escrowContract.actions.logescrow([{ ...escrow, id: 0 }, "start"])
      await action.send('escrow@active')
      await expectToThrow(
        action.send('collector@active'),
        'missing required authority escrow'
      )
    });
  })
});