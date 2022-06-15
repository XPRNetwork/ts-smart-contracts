import { Name, check, requireAuth, Contract, Checksum256, TableStore } from 'proton-tsc'
import { sendRequestRandom, rngChecksumToU64, RNG_CONTRACT } from 'proton-tsc/rng';
import { Results } from './rng.tables';

@contract
class RequestRng extends Contract {
    resultsTable: TableStore<Results> = new TableStore<Results>(this.receiver)
    contract: Name = this.receiver

    @action("getrandom")
    getrandom(
        account: Name,
        customerId: u64,
        signingValue: u64
    ): void {
        // Authenticate
        requireAuth(account)

        // Check customer ID doesnt exist
        check(!this.resultsTable.exists(customerId), `Customer ID ${customerId} already exists`)

        // Save new request
        const request = new Results(customerId, account)
        this.resultsTable.store(request, account)

        // Send request
        sendRequestRandom(this.contract, customerId, signingValue)
    }

    @action("receiverand")
    receiverand(
        customerId: u64,
        randomChecksum: Checksum256,
    ): void {
        // Authenticate
        requireAuth(RNG_CONTRACT);

        // Check customer exists
        const customer = this.resultsTable.requireGet(customerId, `Customer ID ${customerId} does not exist`)

        // Set random value
        customer.randomValue = rngChecksumToU64(randomChecksum, 100);

        // Save (contract pays for storage)
        this.resultsTable.set(customer, this.contract)
    }
}