import { Action, Name, requireAuth, Contract, transactionSize, print, Checksum256, readTransaction, check, sha256,  getAction, Table } from 'as-chain'
import { AccountKV, KV } from './txid.tables';
import { TableStore } from "../../assembly";

@packer
class GetSizeAndId extends Table {
    constructor (
        public actor: Name = new Name(),
    ) {
        super()
    }
}

@contract
export class KvContract extends Contract {
    kvsTable: TableStore<AccountKV> = AccountKV.getTable(this.receiver)

    @action("getsizeandid")
    getsizeandid(
        actor: Name
    ): void {
        requireAuth(actor)

        const accountKv = new AccountKV(actor, [
            new KV("tx_size", `${transactionSize()}`),
            new KV("tx_id", `${this.getTxid()}`)
        ])
        print(`${accountKv.values[0].value} | `)
        print(`${accountKv.values[1].value} | `)
        this.kvsTable.store(accountKv, actor)
    }

    @action("readaction")
    readaction(): void {
        const rawAction: u8[] = getAction(1, 0)
        const action = new Action()
        action.unpack(rawAction)

        const getSizeAndId = new GetSizeAndId()
        getSizeAndId.unpack(action.data)

        print(`${getSizeAndId.actor}`)

        const accountKv = this.kvsTable.requireGet(getSizeAndId.actor.N, "could not find KV")
        accountKv.values.push(new KV("action_size", `${rawAction.length}`))

        this.kvsTable.update(accountKv, getSizeAndId.actor)
    }

    getTxid(): Checksum256 {
        const size = transactionSize()
        const buffer = new Array<u8>(<i32>size);
        const read = readTransaction(buffer)
        check(size == read, "readTransaction failed");
        return sha256(buffer)
    }
}