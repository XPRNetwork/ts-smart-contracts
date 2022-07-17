import { expect } from "chai";
import { Blockchain } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const authContract = blockchain.createContract('auth', 'auth/target/auth.contract')
const [account1] = blockchain.createAccounts('account1', 'account2', 'account3')

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Auth', () => {
  it('requireauth', async () => { 
    await authContract.actions.requireauth([account1.name]).send(account1.name.toString())
  });

  it('codehash', async () => { 
    await authContract.actions.codehash([]).send()
    expect(blockchain.console).to.eq("5b5211dfbcb378555bf06d551c3af0570a483c79268c59175f99711fe2833cee")
  });
});