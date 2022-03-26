import { expect } from "chai";
import { Account, Blockchain, eosio_assert } from "@jafri/vert"
import { createAccounts, createContract, expectToThrow, createDummyNfts } from "../../utils";
import { TimePointSec } from "@greymass/eosio";

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const escrowContract = createContract(blockchain, 'escrow', 'contracts/escrow/target/escrow.contract', true)
const xtokensContract = createContract(blockchain, 'xtokens', 'contracts/external/xtokens/xtokens')
const eosioTokenContract = createContract(blockchain, 'eosio.token', 'contracts/eosio.token/target/eosio.token.contract')
const atomicassetsContract = createContract(blockchain, 'atomicassets', 'contracts/external/atomicassets/atomicassets', true)
const [collector, trader, artist] = createAccounts(blockchain, 'collector', 'trader', 'artist')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await xtokensContract.actions.create([xtokensContract.name, '1000000.000000 XUSDC']).send()
  await xtokensContract.actions.issue([xtokensContract.name, '1000000.000000 XUSDC', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'trader', '100000.000000 XUSDC', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'collector', '100000.000000 XUSDC', '']).send()

  await xtokensContract.actions.create([xtokensContract.name, '1000000.00000000 XETH']).send()
  await xtokensContract.actions.issue([xtokensContract.name, '1000000.00000000 XETH', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'trader', '100000.00000000 XETH', '']).send()
  await xtokensContract.actions.transfer([xtokensContract.name, 'collector', '100000.00000000 XETH', '']).send()

  await eosioTokenContract.actions.create([eosioTokenContract.name, '1000000.0000 XPR']).send()
  await eosioTokenContract.actions.issue([eosioTokenContract.name, '1000000.0000 XPR', '']).send()
  await eosioTokenContract.actions.transfer([eosioTokenContract.name, 'trader', '100000.0000 XPR', '']).send()
  await eosioTokenContract.actions.transfer([eosioTokenContract.name, 'collector', '100000.0000 XPR', '']).send()

  await createDummyNfts(atomicassetsContract, artist, 3, [trader, collector])
})

/* Helpers */
const getEscrowGlobal = () => escrowContract.tables.escrowglobal().getTableRows()
const getEscrowRows = () => escrowContract.tables.escrows().getTableRows()
const getNfts = (account: Account) => atomicassetsContract.tables.assets(account.toBigInt()).getTableRows()

/* Tests */
describe('Escrow', () => {
  const generateSingleEscrowDeposit = async () => {
    const escrow = {
      from: 'collector',
      to: 'trader',
      fromTokens: [{ quantity: '100.000000 XUSDC', contract: 'xtokens' }],
      fromNfts: [getNfts(collector)[0].asset_id],
      toTokens: [{ quantity: '10.0000 XPR', contract: 'eosio.token' }],
      toNfts: [getNfts(trader)[0].asset_id],
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
      let escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      escrow = await generateSingleEscrowDeposit()
      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('escrow@active'),
        'missing required authority collector'
      )
    });

    it('Fails if contract is paused', async () => {
      const escrow = await generateSingleEscrowDeposit()

      await escrowContract.actions.setglobals([true, false, false]).send()
      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('collector@active'),
        eosio_assert('Contract escrow is paused')
      )
    });

    it('Fails if to account is invalid', async () => {
      const startAndCancelEscrow = async (escrowId: number, to: string, ) => {
        const escrow = await generateSingleEscrowDeposit()
        escrow.to = to
        await escrowContract.actions.startescrow(escrow).send('collector@active')
        await escrowContract.actions.cancelescrow(['collector', escrowId]).send('collector@active')
      }

      // Specific
      await startAndCancelEscrow(0, 'trader')

      // Open to anyone
      await startAndCancelEscrow(1, '')

      // Non-existant account
      await expectToThrow(
        startAndCancelEscrow(2, 'notexist'),
        eosio_assert('to must be empty or a valid account')
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

      // Expiry in future
      await startAndCancelEscrow(0, 10, 11)

      // Expiry is now
      await expectToThrow(
        startAndCancelEscrow(1, 10, 10),
        eosio_assert('expiry must be in future')
      )

      // Expiry in past
      await expectToThrow(
        startAndCancelEscrow(1, 10, 9),
        eosio_assert('expiry must be in future')
      )
    });

    it('Fail if Tokens and NFTs length invalid', async () => {
      // Empty from side
      let escrow = await generateSingleEscrowDeposit()
      escrow.fromNfts = []
      escrow.fromTokens = []
      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('collector@active'),
        eosio_assert('must escrow atleast one token or NFT on from side')
      )

      // Empty from to side
      escrow = await generateSingleEscrowDeposit()
      escrow.toNfts = []
      escrow.toTokens = []
      await expectToThrow(
        escrowContract.actions.startescrow(escrow).send('collector@active'),
        eosio_assert('must escrow atleast one token or NFT on to side')
      )
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

    it('Fails if contract is paused', async () => {
      const escrow = await generateSingleEscrowDeposit()
      await escrowContract.actions.startescrow(escrow).send('collector@active')

      await escrowContract.actions.setglobals([true, false, false]).send()
      await expectToThrow(
        escrowContract.actions.fillescrow(['trader', 0]).send('trader@active'),
        eosio_assert('Contract escrow is paused')
      )
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

      await escrowContract.actions.setglobals([true, false, false]).send()
      await expectToThrow(
        escrowContract.actions.cancelescrow(['trader', 0]).send('trader@active'),
        eosio_assert('Contract escrow is paused')
      )
    });
  })
});