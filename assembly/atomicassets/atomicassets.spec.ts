import { expect } from "chai";
import { Blockchain, protonAssert, expectToThrow } from "@proton/vert"

/* Create Blockchain */
const blockchain = new Blockchain()

/* Create assembly and accounts */
const atomicassetsContract = blockchain.createContract('atomicassets', 'assembly/atomicassets/target/atomicassets.contract')
const [artist] = blockchain.createAccounts('artist')

/* Helpers */
const getCollections = () => atomicassetsContract.tables.collections().getTableRows()

/* Runs before each test */
beforeEach(async () => {
  blockchain.resetTables()
})

/* Tests */
describe('Atomicassets', () => {
  it('serialize and deserialize', async () => { 
    // Serialize
    await atomicassetsContract.actions.setcolformat({
      format: [

        { name: "int8", type: 'int8' },
        { name: "int16", type: 'int16' },
        { name: "int32", type: 'int32' },
        { name: "int64", type: 'int64' },
        
        { name: "uint8", type: 'uint8' },
        { name: "uint16", type: 'uint16' },
        { name: "uint32", type: 'uint32' },
        { name: "uint64", type: 'uint64' },
        
        { name: "float", type: 'float' },
        { name: "double", type: 'double' },
        { name: "string", type: 'string' },
        
        { name: "INT8_VEC", type: 'int8[]' },
        { name: "INT16_VEC", type: 'int16[]' },
        { name: "INT32_VEC", type: 'int32[]' },
        { name: "INT64_VEC", type: 'int64[]' },
        
        { name: "UINT8_VEC", type: 'uint8[]' },
        { name: "UINT16_VEC", type: 'uint16[]' },
        { name: "UINT32_VEC", type: 'uint32[]' },
        { name: "UINT64_VEC", type: 'uint64[]' },
        
        { name: "FLOAT_VEC", type: 'float[]' },
        { name: "DOUBLE_VEC", type: 'double[]' },
        { name: "STRING_VEC", type: 'string[]' },
      ]
    }).send('artist@active')

    const data = [
      { key: "int8", value: ['int8', -100] },
      { key: "int16", value: ['int16', -1000] },
      { key: "int32", value: ['int32', -10000] },
      { key: "int64", value: ['int64', -100000] },

      { key: "uint8", value: ['uint8', 200] },
      { key: "uint16", value: ['uint16', 2000] },
      { key: "uint32", value: ['uint32', 20000] },
      { key: "uint64", value: ['uint64', 30000] },

      { key: "float", value: ['float32', 123.456] },
      { key: "double", value: ['float64', 123456.7891011] },
      { key: "string", value: ['string', '123456.7891011'] },

      { key: "INT8_VEC", value: ['int8[]', [-1, -3, 1, 3]] },
      { key: "INT16_VEC", value: ['int16[]', [-2, -4, 2, 4]] },
      { key: "INT32_VEC", value: ['int32[]', [-3, -5, 3, 5]] },
      { key: "INT64_VEC", value: ['int64[]', [-4, -6, 4, 6]] },

      { key: "UINT8_VEC", value: ['bytes', [1, 3, 1, 3]] },
      { key: "UINT16_VEC", value: ['uint16[]', [1, 3, 1, 3]] },
      { key: "UINT32_VEC", value: ['uint32[]', [1, 3, 1, 3]] },
      { key: "UINT64_VEC", value: ['uint64[]', [1, 3, 1, 3]] },

      { key: "FLOAT_VEC", value: ['float32[]', [12.34567, 23.45678, 34.56789, 45.67891]] },
      { key: "DOUBLE_VEC", value: ['float64[]', [12.34567, 23.45678, 34.56789, 45.67891]] },
      { key: "STRING_VEC", value: ['string[]', ["1.1", "3.3", "1.1", "3.3"]] }
    ]

    await atomicassetsContract.actions.createcol({
      author: artist.name,
      collection_name: artist.name,
      allow_notify: true,
      authorized_accounts: [artist.name],
      notify_accounts: [],
      market_fee: 0.01,
      data: data
    }).send('artist@active')

    // Deserialize
    await atomicassetsContract.actions.deserialize1({
      collection_name: artist.name,
    }).send('artist@active')

    const expected = data.map(i => {
      const datum = i.value[1]
      if (Array.isArray(datum)) {
        return datum.map(x => x.toString()).join(',') + ' | '
      } else {
        return datum.toString() + ' | '
      }
    }).join('')

    expect(atomicassetsContract.bc.console).to.be.deep.eq(expected)
  });
});