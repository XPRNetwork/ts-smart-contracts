import fs from "fs";
import { expect } from "chai";
import { Name } from "@greymass/eosio";
import { Blockchain } from "@jafri/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const allowedContract = blockchain.createAccount({
  name: Name.from('allowed'),
  wasm: fs.readFileSync(`contracts/allow/target/allow.contract.wasm`),
  abi: fs.readFileSync(`contracts/allow/target/allow.contract.abi`, 'utf8')
})
const researcher = blockchain.createAccount('researcher')
const malicious = blockchain.createAccount('malicious')

/* Helpers */
const getPaused = () => allowedContract.tables.paused().getTableRows()
const getAllowedActors = () => allowedContract.tables.allowedactor().getTableRows()
const getAllowedTokens = () => allowedContract.tables.allowedtoken().getTableRows()

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Allowed', () => {
  describe('Check Authorizations', () => {
    it('setpaused: Only owner can call', async () => { 
      await allowedContract.actions.setpaused([true]).send('allowed@active')

      try {
        await allowedContract.actions.setpaused([true]).send('malicious@active')
      } catch (e) {
        expect(e.message).to.be.deep.eq('missing required authority allowed')
      }
    });

    it('allowactor: Only owner can call', async () => { 
      await allowedContract.actions.allowactor([researcher.name, true]).send('allowed@active')

      try {
        await allowedContract.actions.allowactor([researcher.name, true]).send('malicious@active')
      } catch (e) {
        expect(e.message).to.be.deep.eq('missing required authority allowed')
      }
    });

    it('blockactor: Only owner can call', async () => { 
      await allowedContract.actions.blockactor([malicious.name, true]).send('allowed@active')

      try {
        await allowedContract.actions.blockactor([malicious.name, true]).send('malicious@active')
      } catch (e) {
        expect(e.message).to.be.deep.eq('missing required authority allowed')
      }
    });

    it('allowtoken: Only owner can call', async () => { 
      await allowedContract.actions.allowtoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true]).send('allowed@active')

      try {
        await allowedContract.actions.allowtoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true]).send('malicious@active')
      } catch (e) {
        expect(e.message).to.be.deep.eq('missing required authority allowed')
      }
    });

    it('blocktoken: Only owner can call', async () => { 
      await allowedContract.actions.blocktoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true]).send('allowed@active')

      try {
        await allowedContract.actions.blocktoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true]).send('malicious@active')
      } catch (e) {
        expect(e.message).to.be.deep.eq('missing required authority allowed')
      }
    });
  })

  describe('Check Setting and Unsetting', () => {
    it('setpaused: Set and unset', async () => { 
      expect(getPaused()).to.be.deep.eq([])
      await allowedContract.actions.setpaused([true]).send('allowed@active')
      expect(getPaused()).to.be.deep.eq([{
        isAllowedActorStrict: false,
        isAllowedTokenStrict: false,
        isPaused: true,
      }])
      await allowedContract.actions.setpaused([false]).send('allowed@active')
      expect(getPaused()).to.be.deep.eq([{
        isAllowedActorStrict: false,
        isAllowedTokenStrict: false,
        isPaused: false,
      }])
    });

    it('allowtoken: Set and unset', async () => { 
      expect(getAllowedTokens()).to.be.deep.eq([])
      await allowedContract.actions.allowtoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true]).send('allowed@active')
      console.log(allowedContract.bc.console)
      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: true,
        isBlocked: false
      }])
      await allowedContract.actions.allowtoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([])
    });

    it('blocktoken: Set and unset', async () => { 
      expect(getAllowedTokens()).to.be.deep.eq([])
      await allowedContract.actions.blocktoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: false,
        isBlocked: true
      }])
      await allowedContract.actions.blocktoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([])
    });

    it('allowactor: Set and unset', async () => { 
      expect(getAllowedActors()).to.be.deep.eq([])
      await allowedContract.actions.allowactor([researcher.name, true]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([{ actor: researcher.name.toString(), isAllowed: true, isBlocked: false }])
      await allowedContract.actions.allowactor([researcher.name, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([])
    });

    it('blockactor: Set and unset', async () => { 
      expect(getAllowedActors()).to.be.deep.eq([])
      await allowedContract.actions.blockactor([malicious.name, true]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([{ actor: malicious.name.toString(), isAllowed: false, isBlocked: true }])
      await allowedContract.actions.blockactor([malicious.name, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([])
    });

    it('blockactor + allowactor: Set and unset', async () => { 
      expect(getAllowedActors()).to.be.deep.eq([])

      await allowedContract.actions.allowactor([researcher.name, true]).send('allowed@active')
      await allowedContract.actions.blockactor([malicious.name, true]).send('allowed@active')

      expect(getAllowedActors()).to.be.deep.eq([
        { actor: malicious.name.toString(), isAllowed: false, isBlocked: true },
        { actor: researcher.name.toString(), isAllowed: true, isBlocked: false }
      ])

      await allowedContract.actions.allowactor([malicious.name, true]).send('allowed@active')
      await allowedContract.actions.blockactor([researcher.name, true]).send('allowed@active')

      expect(getAllowedActors()).to.be.deep.eq([
        { actor: malicious.name.toString(), isAllowed: true, isBlocked: false },
        { actor: researcher.name.toString(), isAllowed: false, isBlocked: true },
      ])
    });
  })
});