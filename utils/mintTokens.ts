import { Account } from "@jafri/vert"

export const mintTokens = async (contract: Account, symbol: string, precision: number, maxSupply: number, amountToMintToEach: number, accountsToMintTo: Account[]) => {
  await contract.actions.create([contract.name, `${maxSupply.toFixed(precision)} ${symbol}`]).send()
  await contract.actions.issue([contract.name, `${maxSupply.toFixed(precision)} ${symbol}`, '']).send()
  for (const accountToMintTo of accountsToMintTo) {
    await contract.actions.transfer([contract.name, accountToMintTo.name, `${amountToMintToEach.toFixed(precision)} ${symbol}`, '']).send()
  }
}
