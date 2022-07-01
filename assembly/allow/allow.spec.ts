import { expect } from "chai";
import { Blockchain, protonAssert, expectToThrow } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const allowedContract = blockchain.createContract('allowed', 'assembly/allow/target/allow_test.contract')
const [researcher, malicious] = blockchain.createAccounts('researcher', 'malicious')

/* Helpers */
const getAllowGlobals = () => allowedContract.tables.allowglobals().getTableRows()
const getAllowedActors = () => allowedContract.tables.allowedactor().getTableRows()
const getAllowedTokens = () => allowedContract.tables.allowedtoken().getTableRows()
const makeGlobals = (isPaused: boolean, isActorStrict: boolean, isTokenStrict: boolean, isTokensEnabled: boolean, isNftsEnabled: boolean, isContractsEnabled: boolean) => ({ isPaused, isActorStrict, isTokenStrict, isTokensEnabled, isNftsEnabled, isContractsEnabled })

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Allowed', () => {

  describe('setglobals', () => {
    it('success isPaused', async () => {
      // Empty to start
      expect(getAllowGlobals()).to.be.deep.eq([])

      // Set isPaused to true
      await allowedContract.actions.setglobals(makeGlobals(true, false, false, true, true, true)).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([{
        isActorStrict: false,
        isTokenStrict: false,
        isNftsEnabled: true,
        isTokensEnabled: true,
        isContractsEnabled: true,
        isPaused: true,
      }])

      // Set isPaused to false
      await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([{
        isActorStrict: false,
        isTokenStrict: false,
        isNftsEnabled: true,
        isTokensEnabled: true,
        isContractsEnabled: true,
        isPaused: false,
      }])
    });

    it('success isActorStrict', async () => {
      // Empty to start
      expect(getAllowGlobals()).to.be.deep.eq([])

      // Set isActorStrict to true
      const glob1 = makeGlobals(false, true, false, true, true, true)
      await allowedContract.actions.setglobals(glob1).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([glob1])

      // Set isActorStrict to false
      const glob2 = makeGlobals(false, false, false, true, true, true)
      await allowedContract.actions.setglobals(glob2).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([glob2])
    });

    it('success isTokenStrict', async () => {
      // Empty to start
      expect(getAllowGlobals()).to.be.deep.eq([])

      // Set isTokenStrict to true
      await allowedContract.actions.setglobals(makeGlobals(false, false, true, true, true, true)).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([{
        isActorStrict: false,
        isTokenStrict: true,
        isPaused: false,
        isNftsEnabled: true,
        isTokensEnabled: true,
        isContractsEnabled: true,
      }])

      // Set isTokenStrict to false
      await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send('allowed@active')
      expect(getAllowGlobals()).to.be.deep.eq([{
        isActorStrict: false,
        isTokenStrict: false,
        isPaused: false,
        isNftsEnabled: true,
        isTokensEnabled: true,
        isContractsEnabled: true,
      }])
    });

    it('Authentication is required', async () => {
      await allowedContract.actions.setglobals(makeGlobals(true, false, false, true, true, true)).send('allowed@active')
      await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send();

      await expectToThrow(
        allowedContract.actions.setglobals(
          makeGlobals(true, false, false, true, true, true)
        ).send('malicious@active'),
        'missing required authority allowed'
      )
    });
  });

  describe('settoken', () => {
    it('success', async () => {
      expect(getAllowedTokens()).to.be.deep.eq([])

      await allowedContract.actions.settoken([{
        contract: 'xtokens',
        sym: '6,XUSDC'
      }, true, false]).send('allowed@active');

      expect(getAllowedTokens()).to.be.deep.eq([{
        index: 0,
        token: { contract: 'xtokens', sym: '6,XUSDC' },
        isAllowed: true,
        isBlocked: false
      }])

      await allowedContract.actions.settoken([{
        contract: 'xtokens',
        sym: '6,XUSDC'
      }, false, false]).send('allowed@active');

      expect(getAllowedTokens()).to.be.deep.eq([]);
    });

    it('success multiple set and unset', async () => {
      expect(getAllowedTokens()).to.be.deep.eq([])

      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, false]).send('allowed@active')
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '4,XPR' }, true, false]).send('allowed@active')
      await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDT' }, false, true]).send('allowed@active')
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

    it('Authentication is required', async () => {
      await allowedContract.actions.settoken([{
        contract: 'xtokens',
        sym: '6,XUSDC'
      }, true, false]).send('allowed@active');

      await allowedContract.actions.settoken([{
        contract: 'xtokens',
        sym: '6,XUSDC'
      }, false, false]).send();

      await expectToThrow(
        allowedContract.actions.settoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, true, false]).send('malicious@active'),
        'missing required authority allowed'
      );
    });

    it('Fail if both isAllowed and isBlocked set to true', async () => {
      await expectToThrow(
        allowedContract.actions.settoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, true, true]).send('allowed@active'),
        protonAssert('a token cannot be both allowed and blocked at the same time')
      );
    });

  });

  describe('setactor', () => {
    it('success', async () => {
      // isAllowed
      expect(getAllowedActors()).to.be.deep.eq([])
      await allowedContract.actions.setactor([researcher.name, true, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([{
        actor: researcher.name.toString(),
        isAllowed: true,
        isBlocked: false
      }])
      await allowedContract.actions.setactor([researcher.name, false, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([])

      // isBlocked
      expect(getAllowedActors()).to.be.deep.eq([])

      await allowedContract.actions.setactor([malicious.name, false, true]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([{
        actor: malicious.name.toString(),
        isAllowed: false,
        isBlocked: true
      }])
      await allowedContract.actions.setactor([malicious.name, false, false]).send('allowed@active')
      expect(getAllowedActors()).to.be.deep.eq([])
    });

    it('success set and unset multiple', async () => {
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

    it('Authentication is required', async () => {
      await allowedContract.actions.setactor([researcher.name, true, false]).send('allowed@active')

      await allowedContract.actions.setactor([researcher.name, true, false]).send()

      await expectToThrow(
        allowedContract.actions.setactor([malicious.name, true, false]).send('malicious@active'),
        'missing required authority allowed'
      );
    });

    it('Fail if both isAllowed and isBlocked set to true', async () => {
      await expectToThrow(
        allowedContract.actions.setactor([researcher.name, true, true]).send('allowed@active'),
        protonAssert('an actor cannot be both allowed and blocked at the same time')
      )
    });

    it('Fail if try to delete not existing actor', async () => {
      await expectToThrow(
        allowedContract.actions.setactor([researcher.name, false, false]).send('allowed@active'),
        protonAssert("Failed to 'remove' value as item does not exist, please use 'set' or 'store' to save value first")
      )
    });
  });

  describe('helpers', () => {
    it('Paused contract should fail', async () => {
      await allowedContract.actions.testpaused().send('allowed@active');

      await allowedContract.actions.setglobals(makeGlobals(true, false, false, true, true, true)).send('allowed@active')
      await expectToThrow(
        allowedContract.actions.testpaused().send('allowed@active'),
        protonAssert("Contract allowed is paused")
      )
    });

    describe('Actor check', () => {

      it('Not allowed actor should fail in strict contract', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, true, false, true, true, true)).send('allowed@active')

        await allowedContract.actions.setactor([researcher.name, true, false]).send()
        await allowedContract.actions.testactor([researcher.name, '']).send()

        await allowedContract.actions.setactor([researcher.name, false, false]).send()
        await expectToThrow(
          allowedContract.actions.testactor([researcher.name, '']).send(),
          protonAssert("Actor 'researcher' is not allowed to use contract 'allowed'")
        );
      });


      it('Not allowed actor should not fail in non-strict contract', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send('allowed@active')
        await allowedContract.actions.testactor([researcher.name, '']).send();
      });

      it('Blocked actor should fail in any contract', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send('allowed@active')
        await allowedContract.actions.setactor([researcher.name, false, true]).send();
        await expectToThrow(
          allowedContract.actions.testactor([researcher.name, '']).send(),
          protonAssert("Actor 'researcher' is not allowed to use contract 'allowed'")
        );

        await allowedContract.actions.setglobals(makeGlobals(false, true, false, true, true, true)).send('allowed@active')
        await allowedContract.actions.setactor([researcher.name, false, true]).send();
        await expectToThrow(
          allowedContract.actions.testactor([researcher.name, '']).send(),
          protonAssert("Actor 'researcher' is not allowed to use contract 'allowed'")
        );
      });

      it('Custom message for actor check should be displayed', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, true, false, true, true, true)).send('allowed@active')

        await expectToThrow(
          allowedContract.actions.testactor([researcher.name, 'hola']).send(),
          protonAssert("hola")
        );
      });
    });

    describe('Token check', () => {
      it('Not allowed token should fail in strict contract', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, false, true, true, true, true)).send('allowed@active')

        await allowedContract.actions.settoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, true, false]).send('allowed@active');

        await allowedContract.actions.testtoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, '']).send('allowed@active');

        await allowedContract.actions.settoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, false, false]).send('allowed@active');

        await expectToThrow(
          allowedContract.actions.testtoken([{
            contract: 'xtokens',
            sym: '6,XUSDC'
          }, '']).send(),
          protonAssert("Token '6,XUSDC@xtokens' is not allowed to use contract 'allowed'")
        );
      });

      it('Not allowed token should not fail in non-strict contract', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send('allowed@active')
        await allowedContract.actions.testtoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, '']).send();
      });

      it('Blocked token should fail in any contract', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, false, false, true, true, true)).send('allowed@active')
        await allowedContract.actions.settoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, false, true]).send('allowed@active');
        await expectToThrow(
          allowedContract.actions.testtoken([{
            contract: 'xtokens',
            sym: '6,XUSDC'
          }, '']).send(),
          protonAssert("Token '6,XUSDC@xtokens' is not allowed to use contract 'allowed'")
        );

        await allowedContract.actions.setglobals(makeGlobals(false, false, true, true, true, true)).send('allowed@active')
        await allowedContract.actions.settoken([{
          contract: 'xtokens',
          sym: '6,XUSDC'
        }, false, true]).send('allowed@active');
        await expectToThrow(
          allowedContract.actions.testtoken([{
            contract: 'xtokens',
            sym: '6,XUSDC'
          }, '']).send(),
          protonAssert("Token '6,XUSDC@xtokens' is not allowed to use contract 'allowed'")
        );
      });

      it('Custom message for token check should be displayed', async () => {
        await allowedContract.actions.setglobals(makeGlobals(false, false, true, true, true, true)).send('allowed@active')

        await expectToThrow(
          allowedContract.actions.testtoken([{
            contract: 'xtokens',
            sym: '6,XUSDC'
          }, 'hola']).send(),
          protonAssert("hola")
        );
      });
    });
  });
});