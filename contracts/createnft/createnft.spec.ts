import { Blockchain } from "@jafri/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create Contracts and accounts */
const atomicassetsContract = blockchain.createContract('atomicassets', 'contracts/external/atomicassets/atomicassets', true)
const createNftContract = blockchain.createContract('createnft', 'contracts/createnft/target/createnft.contract', true)

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()

  await atomicassetsContract.actions.init().send()
  await atomicassetsContract.actions.admincoledit([
    [
      { "name": "name", "type": "string" },
      { "name": "img", "type": "ipfs" },
      { "name": "description", "type": "string" },
      { "name": "url", "type": "string" }
    ]
  ]).send()
})

/* Tests */
describe('Atomicassets', () => {
  it('serialize and deserialize', async () => { 
    await createNftContract.actions.createcol([]).send('createnft@active')
    await createNftContract.actions.createschema([]).send('createnft@active')
    await createNftContract.actions.createtempl([]).send('createnft@active')
    await createNftContract.actions.mintasset([]).send('createnft@active')
    await createNftContract.actions.readnft([]).send('createnft@active')
    console.log(createNftContract.bc.console)
  });
});