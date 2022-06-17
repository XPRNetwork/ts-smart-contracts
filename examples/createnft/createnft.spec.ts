import { Blockchain } from "@proton/vert"
import { expect } from "chai"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const atomicassetsContract = blockchain.createContract('atomicassets', '../external/atomicassets/atomicassets')
const createNftContract = blockchain.createContract('createnft', 'createnft/target/createnft.contract')

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
    await createNftContract.actions.setassetdata([]).send('createnft@active')
    await createNftContract.actions.readnft([]).send('createnft@active')

    expect(createNftContract.bc.console.trim()).to.be.deep.equal(`
            Collection: bullscollect
            Collection Data: Description = Collection for Bulls
            Template Data: Image = QmT35anF2vLjjfgCQXBXfXqGgXXj4rJrsjcXWYLm9HDfWL
            Asset Data: Health = 5
            Asset: 1099511627776
    `.trim())
  });
});