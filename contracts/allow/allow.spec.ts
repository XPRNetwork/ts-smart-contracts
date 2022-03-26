import fs from "fs";
import { expect } from "chai";
import { Name } from "@greymass/eosio";
import { Blockchain, eosio_assert } from "@jafri/vert"
import { expectToThrow } from "../../utils/expectToThrow";

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
const getAllowGlobals = () => allowedContract.tables.allowglobals().getTableRows()
const getAllowedActors = () => allowedContract.tables.allowedactor().getTableRows()
const getAllowedTokens = () => allowedContract.tables.allowedtoken().getTableRows()
const makeGlobals = (isPaused: boolean, isActorStrict: boolean, isTokenStrict: boolean) => ({ isPaused, isActorStrict, isTokenStrict })

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Allowed', () => {
  describe('Check Authorizations', () => {
    it('setGlobals: Only owner can call', async () => { 
      await allowedContract.actions.setglobals(makeGlobals(true, false, false)).send('allowed@active')

      await expectToThrow(
        allowedContract.actions.setglobals(makeGlobals(true, false, false)).send('malicious@active'),
        'missing required authority allowed'
      )

      await allowedContract.actions.setglobals(makeGlobals(false, true, false)).send('allowed@active')

      await expectToThrow(
        allowedContract.actions.setglobals(makeGlobals(false, true, false)).send('malicious@active'),
        'missing required authority allowed'
      )

      await allowedContract.actions.setglobals(makeGlobals(false, false, true)).send('allowed@active')

      await expectToThrow(
        allowedContract.actions.setglobals(makeGlobals(false, false, true)).send('malicious@active'),
        'missing required authority allowed'
      )
    });

    it('setactor: Only owner can call', async () => { 
      await allowedContract.actions.setactor([researcher.name, true, false]).send('allowed@active')

      await expectToThrow(
        allowedContract.actions.setactor([researcher.name, true, false]).send('malicious@active'),
        'missing required authority allowed'
      )

      await allowedContract.actions.setactor([researcher.name, false, true]).send('allowed@active')

      await expectToThrow(
        allowedContract.actions.setactor([researcher.name, false, true]).send('malicious@active'),
        'missing required authority allowed'
      )
    });

    it('settoken: Only owner can call', async () => { 
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, false]).send('allowed@active')
      await expectToThrow(
        allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, false]).send('malicious@active'),
        'missing required authority allowed'
      )

      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false, true]).send('allowed@active')
      await expectToThrow(
        allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false, true]).send('malicious@active'),
        'missing required authority allowed'
      )
    });
  })

  describe('Check Setting and Unsetting', () => {
    it('setglobals: Set and unset', async () => { 
      expect(getAllowGlobals()).to.be.deep.eq([])
      await allowedContract.actions.setglobals(makeGlobals(true, true, true)).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([{
        isActorStrict: true,
        isTokenStrict: true,
        isPaused: true,
      }])
      await allowedContract.actions.setglobals(makeGlobals(false, false, false)).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([{
        isActorStrict: false,
        isTokenStrict: false,
        isPaused: false,
      }])
    });

    it('settoken: Fail if set both to true', async () => { 
      await expectToThrow(
        allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, true]).send('allowed@active'),
        eosio_assert('a token cannot be both allowed and blocked at the same time')
      )
    });

    it('settoken: Single set and unset', async () => { 
      // isAllowed
      expect(getAllowedTokens()).to.be.deep.eq([])
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: true,
        isBlocked: false
      }])
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([])

      // isBlocked
      expect(getAllowedTokens()).to.be.deep.eq([])
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false, true]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: false,
        isBlocked: true
      }])
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([])
    });

    it('settoken: Try setting both to empty', async () => { 
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, false, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([])
    });

    it('settoken: Multiple set and unset', async () => { 
      expect(getAllowedTokens()).to.be.deep.eq([])

      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, false]).send('allowed@active')
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '4,XPR' }, true, false]).send('allowed@active')
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDT' }, false, true]).send('allowed@active')
      await allowedContract.actions.settoken([{ contract: 'eosio.token', sym: '4,EOS' }, false, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: true,
        isBlocked: false
      }, {
        index: 1,
        token: { contract: 'xtokens', sym: '4,XPR' },
        isAllowed: true,
        isBlocked: false
      }, {
        index: 2,
        token: { contract: 'xtokens', sym: '6,XUSDT' },
        isAllowed: false,
        isBlocked: true
      }])

      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDT' }, true, false]).send('allowed@active')
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '4,XPR' }, false, false]).send('allowed@active')
      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: true,
        isBlocked: false
      }, {
        index: 2,
        token: { contract: 'xtokens', sym: '6,XUSDT' },
        isAllowed: true,
        isBlocked: false
      }])
    });

    it('setactor: Fail if set both to true', async () => { 
      await expectToThrow(
        allowedContract.actions.setactor([researcher.name, true, true]).send('allowed@active'),
        eosio_assert('an actor cannot be both allowed and blocked at the same time')
      )
    });

    it('setactor: Set and unset', async () => { 
      // isAllowed
      expect(getAllowedActors()).to.be.deep.eq([])
      await allowedContract.actions.setactor([researcher.name, true, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([{ actor: researcher.name.toString(), isAllowed: true, isBlocked: false }])
      await allowedContract.actions.setactor([researcher.name, false, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([])

      // isBlocked
      expect(getAllowedActors()).to.be.deep.eq([])
      await allowedContract.actions.setactor([malicious.name, false, true]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([{ actor: malicious.name.toString(), isAllowed: false, isBlocked: true }])
      await allowedContract.actions.setactor([malicious.name, false, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([])
    });

    it('setactor: Set and unset multiple', async () => { 
      expect(getAllowedActors()).to.be.deep.eq([])

      await allowedContract.actions.setactor([malicious.name, true, false]).send('allowed@active')
      await allowedContract.actions.setactor([researcher.name, false, true]).send('allowed@active')

      expect(getAllowedActors()).to.be.deep.eq([
        { actor: malicious.name.toString(), isAllowed: true, isBlocked: false },
        { actor: researcher.name.toString(), isAllowed: false, isBlocked: true },
      ])

      await allowedContract.actions.setactor([malicious.name, false, false]).send('allowed@active')
      await allowedContract.actions.setactor([researcher.name, false, false]).send('allowed@active')

      expect(getAllowedActors()).to.be.deep.eq([])
    });
  })
});