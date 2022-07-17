import { Name, getTransactionId, requireAuth, Contract, transactionSize, print, getAction, ActionData, TableStore, EMPTY_NAME, getCodeHash } from 'proton-tsc'
import { AccountKV, KV } from '../kv/kv.tables';

@contract
export class AuthContract extends Contract {
    @action("requireauth")
    requireauth(
        actor: Name
    ): void {
        requireAuth(actor)
    }

    @action("codehash")
    codehash(): void {
        print(`${getCodeHash(this.receiver).codeHash}`)
    }

    // get_block_num -> TXID?
    // k1_recover
    // get_code_hash
    // is_feature_activated
}