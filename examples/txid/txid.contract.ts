import { Name, getTransactionId, requireAuth, Contract, transactionSize, print, getAction, ActionData, TableStore, EMPTY_NAME, Checksum256, Utils, isFeatureActivated, check } from 'proton-tsc'
import { AccountKV, KV } from '../kv/kv.tables';

@packer
class GetSizeAndId extends ActionData {
    constructor (
        public actor: Name = EMPTY_NAME,
    ) {
        super()
    }
}

@contract
export class TxIdContract extends Contract {
    kvsTable: TableStore<AccountKV> = new TableStore<AccountKV>(this.receiver)

    @action("getsizeandid")
    getsizeandid(
        actor: Name
    ): void {
        requireAuth(actor)

        const accountKv = new AccountKV(actor, [
            new KV("tx_size", `${transactionSize()}`),
            new KV("tx_id", `${getTransactionId()}`)
        ])
        print(`${accountKv.values[0].value} | `)
        print(`${accountKv.values[1].value} | `)
        this.kvsTable.store(accountKv, actor)
    }

    @action("readaction")
    readaction(): void {
        const action = getAction(1, 0)

        const getSizeAndId = new GetSizeAndId()
        getSizeAndId.unpack(action.data)

        const accountKv = this.kvsTable.requireGet(getSizeAndId.actor.N, "could not find KV")
        accountKv.values.push(new KV("action_size", `${action.getSize()}`))

        this.kvsTable.update(accountKv, getSizeAndId.actor)
    }

    @action("protofeature")
    protofeature(): void {
        const cs1 = new Checksum256(Utils.hexToBytes("69b064c5178e2738e144ed6caa9349a3995370d78db29e494b3126ebd9111966"))
        check(isFeatureActivated(cs1) == true, "protocol feature not activated")

        const cs2 = new Checksum256(Utils.hexToBytes("69b364c5178e2738e144ed6caa9349a3995370d78db29e494b3126ebd9111966"))
        check(isFeatureActivated(cs2) == false, "protocol feature activated")
    }
}