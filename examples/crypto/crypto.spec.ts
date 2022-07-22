import { expect } from "chai";
import { Blockchain, expectToThrow, protonAssert } from "@proton/vert"
import { PrivateKey, UInt32, Bytes, Action, Name, PermissionLevel, Serializer } from "@greymass/eosio";

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
  it('recoverKey', async () => {
    const privKey = PrivateKey.fromString("PVT_K1_abKogC9A8KvgfrWYPJVQT3NSFyHbZ4cVZw2LUtMk1gFP87AQ1")
  
    const abi = {
      structs: [
        {name: 'noop', base: '', fields: []},
        {
          name: "Action",
          base: "",
          fields: [
            { "name": "account", "type": "name" },
            { "name": "name", "type": "name" },
            { "name": "authorization", "type": "PermissionLevel[]" },
            { "name": "data", "type": "bytes" }
          ]
        },
        {
          name: "PermissionLevel",
          base: "",
          fields: [
            { "name": "actor", "type": "name" },
            { "name": "permission", "type": "name" }
          ]
        },
      ],
      actions: [
        { name: 'noop', type: 'noop', ricardian_contract: '' },
      ],
    }

    const action = Action.from({
      account: Name.from("test"),
      authorization: [PermissionLevel.from("test@active")],
      name: "noop",
      data: {}
    }, abi)

    const actions = [action]

    const message = Serializer.encode({
      abi: abi,
      type: "Action[]",
      object: actions,
    }).array;

    const sig = privKey.signMessage(message)

    await cryptoContract.actions.recoverkey([actions, sig]).send()
  })
  it('k1recover', async () => { 
    await cryptoContract.actions.k1recover1([]).send()
    await cryptoContract.actions.k1recover2([]).send()
    await expectToThrow(
      cryptoContract.actions.k1recover3([]).send(),
      protonAssert("bad signature")
    )
    await expectToThrow(
      cryptoContract.actions.k1recover4([]).send(),
      protonAssert("bad assign length")
    )
  });

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