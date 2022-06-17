import { Name, check, requireAuth, Contract, TableStore } from 'proton-tsc'
import { KV, AccountKV } from './kv.tables';

@contract
export class KvContract extends Contract {
    kvsTable: TableStore<AccountKV> = new TableStore<AccountKV>(this.receiver)

    @action("updatevalues")
    updatevalues(
        actor: Name,
        values: KV[],
    ): void {
        // Authorization
        requireAuth(actor)

        // Validation
        check(values.length > 0, "must provide atleast one value")
        for (let i = 0; i < values.length; i++) {
            check(values[i].key.length < 255, "max key length is 255")
            check(values[i].value.length < 255, "max value length is 255")
        }

        // Find account
        let kv = this.kvsTable.get(actor.N)
        if (kv == null) {
            kv = new AccountKV(actor, values)
        } else {
            const existingKeys = kv.values.map<string>(value => value.key)
            for (let i = 0; i < values.length; i++) {
                const keyMatchIndex = existingKeys.indexOf(values[i].key)
                if (keyMatchIndex == -1) {
                    kv.values.push(values[i])
                } else {
                    kv.values[keyMatchIndex].value = values[i].value
                }
            }
        }

        // Save
        this.kvsTable.set(kv, actor)
    }

    @action("removekeys")
    removekeys(
        actor: Name,
        keys: string[],
    ): void {
        // Authorization
        requireAuth(actor)

        // Find account
        const kv = this.kvsTable.requireGet(actor.N, `no kv found with name ${actor}`)

        // Update
        let filteredValues: KV[] = []
        for (let i = 0; i < kv.values.length; i++) {
            if (keys.indexOf(kv.values[i].key) == -1) {
                filteredValues.push(kv.values[i])
            }
        }
        kv.values = filteredValues

        // Save
        if (kv.values.length > 0) {
            this.kvsTable.update(kv, actor)
        } else {
            this.kvsTable.remove(kv)
        }
    }
}