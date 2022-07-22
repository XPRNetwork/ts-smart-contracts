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
    expect(blockchain.console).to.eq("775ea3ecf1b32d724884990a241a83d1b89a10b4bf49f530ad9f065bfea81341")
  });
});