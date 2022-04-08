import { Name, check, requireAuth, Contract, Checksum256 } from 'as-chain'
import { TableStore } from '../store';
import { sendRequestRandom } from './rng.inline';
import { Results } from './rng.tables';

@contract
class RequestRng extends Contract {
    resultsTable: TableStore<Results> = Results.getTable(this.receiver)
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
        // Calculate random (can change this)
        const maxValue: u64 = 100;
        const byteArray: u8[] = randomChecksum.data;

        let randomInt: u64 = 0;
        for (let i = 0; i < 8; i++) {
            randomInt <<= 8;
            randomInt |= <u64>(byteArray[i]);
        }

        // Check customer exists
        const customer = this.resultsTable.requireGet(customerId, `Customer ID ${customerId} does not exist`)

        // Set random value
        customer.randomValue = randomInt % maxValue;

        // Save (contract pays for storage)
        this.resultsTable.set(customer, this.contract)
    }
}