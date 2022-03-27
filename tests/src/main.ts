import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { Blockchain, createContract, createAccounts, readWasm, VM, readAbi } from "@jafri/vert"
import { SetSourceMapURLRelativeTo, GetSourceMapURL } from './sourceMap'
import { Name } from '@greymass/eosio'

/* Create Blockchain */
const blockchain = new Blockchain()

/* It creates a contract and two accounts. */
/* Create Contracts and accounts */

const main = async () => {
  let bytes = await readWasm('contracts/allow/allow.contract.wasm')
  bytes = SetSourceMapURLRelativeTo(bytes, window.location.href + 'contracts/allow/');
  console.log(GetSourceMapURL(bytes))

  const allowedContract = blockchain.createAccount({
    name: Name.from('allowed'),
    wasm: bytes,
    abi: await readAbi(`contracts/allow/allow.contract.abi`),
  });

  allowedContract.vm = new VM(bytes, blockchain)
  await allowedContract.vm.ready
  console.log(allowedContract.actions)
  await allowedContract.actions.settoken([{ contract: 'xtokens', sym: '6,XUSDC' }, true, false]).send('allowed@active', true)
}

main()