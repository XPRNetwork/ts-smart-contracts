import fs from "fs";
import { Name, NameType } from "@greymass/eosio";
import { Blockchain } from "@jafri/vert";

export const createContract = (bc: Blockchain, name: NameType, folder: string, sendsInline = false) => bc.createAccount({
    name: Name.from(name),
    wasm: fs.readFileSync(`${folder}.wasm`),
    abi: fs.readFileSync(`${folder}.abi`, 'utf8'),
    sendsInline
});
  
export const createAccounts = (bc: Blockchain, ...accounts: string[]) => {
    const createdAccounts = []
    for (const account of accounts) {
        createdAccounts.push(bc.createAccount(account))
    }
    return createdAccounts
};
  