import { expect } from "chai";
import { Blockchain, expectToThrow, protonAssert } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const cryptoContract = blockchain.createContract('crypto', 'crypto/target/crypto.contract')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Tests Crypto', () => {
  it('sha3', async () => { 
    await cryptoContract.actions.sha3([]).send()
  });

  it('keccak', async () => { 
    await cryptoContract.actions.keccak([]).send()
  });

  it('blake2', async () => { 
    await cryptoContract.actions.blake2([]).send()
  });

  it('bnadd', async () => { 
    await cryptoContract.actions.bnadd1([]).send()

    await expectToThrow(
      cryptoContract.actions.bnadd2([]).send(),
      protonAssert("bn128Add error")
    )

    await expectToThrow(
      cryptoContract.actions.bnadd3([]).send(),
      protonAssert("bn128Add error")
    )
  });

  it('bnmul', async () => { 
    await cryptoContract.actions.bnmul1([]).send()

    await expectToThrow(
      cryptoContract.actions.bnmul2([]).send(),
      protonAssert("bn128Mul error")
    )

    await expectToThrow(
      cryptoContract.actions.bnmul3([]).send(),
      protonAssert("bn128Mul error")
    )
  });

  it('bnpair', async () => { 
    await cryptoContract.actions.bnpair1([]).send()

    await expectToThrow(
      cryptoContract.actions.bnpair2([]).send(),
      protonAssert("bn128Pair error")
    )

    await expectToThrow(
      cryptoContract.actions.bnpair3([]).send(),
      protonAssert("bn128Pair error")
    )
  });

  it('modexp', async () => { 
    await cryptoContract.actions.modexp1([]).send()

    await expectToThrow(
      cryptoContract.actions.modexp2([]).send(),
      protonAssert("modExp error")
    )
  });
});