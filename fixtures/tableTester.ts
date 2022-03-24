import { Account, Blockchain } from "@jafri/vert"
import { Name, NameType } from "@greymass/eosio"
import { Fixtures } from "./fixture";
import fs from "fs"
import { expect } from "chai";

/* Create Contracts and accounts */
const createContract = (bc: Blockchain, name: NameType, folder: string, sendsInline = false) => bc.createAccount({
    name: Name.from(name),
    wasm: fs.readFileSync(`${folder}.wasm`),
    abi: fs.readFileSync(`${folder}.abi`, 'utf8'),
    sendsInline
});

export const processFixtures = (fixture: Fixtures) => {
    const blockchain = new Blockchain()

    const accounts: { [key: string]: Account } = {}
    for (const contract of fixture.contracts) {
        accounts[contract.name.toString()] = createContract(blockchain, contract.name, contract.path, contract.sendsInline)
    }
    for (const account of fixture.accounts) {
        accounts[account] = blockchain.createAccount(account)
    }

    beforeEach(async () => {
        for (const beforeEach of fixture.beforeEach) {
            if (beforeEach.helper === "resetTables") {
                blockchain.resetTables()
            }
        }
    })

    fixture.tests.forEach(test => describe(test.description, () => {
        test.cases.forEach(testCase => it(testCase.title, async () => {
            for (const action of testCase.actions) {
                const promise = accounts[action.contract].actions[action.action](action.data).send(action.authorization)
                if (!action.expectErrorMessage) {
                    await promise
                } else {
                    await promise
                        .then(() => { throw new Error(`Was expecting to fail with ${action.expectErrorMessage}`) })
                        .catch((e: any) => expect(e.message).to.be.deep.eq(action.expectErrorMessage))
                }
            }
        }))
    }))
}