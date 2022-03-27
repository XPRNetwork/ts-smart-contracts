import * as env from "./env";
import { U128 } from "./bignum";
import { VarUint32, calcPackedVarUint32Length } from "./varint";
import { TimePointSec } from "./time";
import { currentTimeSec } from "./system";
import { Action } from "./action";
import { Packer, Encoder, Decoder } from "./serializer";
import { Name } from "./name"

export function sendDeferred(sender_id: U128, payer: Name, serialized_transaction: u8[], replace_existing: bool): void {
    let arr = new Array<u64>(2);
    arr[0] = sender_id.lo;
    arr[1] = sender_id.hi;
    env.send_deferred(arr.dataStart, payer.N, serialized_transaction.dataStart, serialized_transaction.length, <u32>replace_existing)
}

export function cancelDeferred(sender_id: U128): i32 {
    let arr = new Array<u64>(2);
    arr[0] = sender_id.lo;
    arr[1] = sender_id.hi;
    return env.cancel_deferred(arr.dataStart);
}

export function readTransaction(buffer: u8[]): usize {
    return env.read_transaction(buffer.dataStart, buffer.length);
}

export function transactionSize(): usize {
    return env.transaction_size();
}

export function taposBlockNum(): u32 {
    return env.tapos_block_num();
}

export function taposBlockPrefix(): u32 {
    return env.tapos_block_prefix();
}

export function transactionExpiration(): u32 {
    return env.expiration();
}

export function getAction(type: u32, index: u32): u8[] {
    let size = env.get_action(type, index, 0, 0);
    let buff = new Array<u8>(size);
    env.get_action(type, index, buff.dataStart, buff.length);
    return buff;
}

export function getContextFreeData(index: u32): u8[] {
    let size = env.get_context_free_data(index, 0, 0);
    let buff = new Array<u8>(size);
    env.get_context_free_data(index, buff.dataStart, buff.length);
    return buff;
}

export class TransactionExtension implements Packer {
    type: u16;
    data!: u8[];

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        enc.packNumber<u16>(this.type);
        enc.packNumberArray<u8>(this.data)
        return enc.getBytes();
    }
    
    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.type = dec.unpackNumber<u16>();
        this.data = dec.unpackNumberArray<u8>();
        return dec.getPos();
    }

    getSize(): usize {
        let size: usize = 0;
        size += sizeof<u16>();
        size += calcPackedVarUint32Length(this.data.length);
        size += sizeof<u8>()*this.data.length;
        return size;
    }
}

export class Transaction implements Packer {
    // time_point_sec  expiration;
    // uint16_t        ref_block_num;
    // uint32_t        ref_block_prefix;
    // unsigned_int    max_net_usage_words = 0UL; /// number of 8 byte words this transaction can serialize into after compressions
    // uint8_t         max_cpu_usage_ms = 0UL; /// number of CPU usage units to bill transaction for
    // unsigned_int    delay_sec = 0UL; /// number of seconds to delay transaction, default: 0
    expiration:        TimePointSec;
    refBlockNum:        u16;
    refBlockPrefix:     u32;
    //[VLQ or Base-128 encoding](https://en.wikipedia.org/wiki/Variable-length_quantity)
    //unsigned_int vaint (eosio.cdt/libraries/eosiolib/core/eosio/varint.hpp)
    maxNetUsageWords:   VarUint32;
    maxCpuUsageMs:       u8;
    delaySec:           VarUint32; //unsigned_int
    contextFreeActions: Action[];
    actions:            Action[];
    extention:          TransactionExtension[];

    constructor(delaySec: u32 = 0) {
        this.expiration = new TimePointSec(currentTimeSec() + 60*60);
        this.refBlockNum = <u16>taposBlockNum();
        this.refBlockPrefix = taposBlockPrefix();
        this.maxNetUsageWords = new VarUint32(0);
        this.maxCpuUsageMs = 0;
        this.delaySec = new VarUint32(delaySec);
        this.actions = new Array<Action>();
        this.contextFreeActions = new Array<Action>();
        this.extention = new Array<TransactionExtension>();
    }

    addAction(action: Action): void {
        this.actions.push(action);
    }

    addContextFreeActions(action: Action): void {
        this.contextFreeActions.push(action);
    }

    addTransactionExtension(ext: TransactionExtension): void {
        this.extention.push(ext);
    }

    send(senderId: U128, replaceExisting: bool, payer: Name): void {
        sendDeferred(senderId, payer, this.pack(), replaceExisting);
    }

    pack(): u8[] {
        let enc = new Encoder(this.getSize());
        enc.pack(this.expiration);
        enc.packNumber<u16>(this.refBlockNum);
        enc.packNumber<u32>(this.refBlockPrefix);
        enc.pack(this.maxNetUsageWords);
        enc.packNumber<u8>(this.maxCpuUsageMs);
        enc.pack(this.delaySec);
        enc.packObjectArray(this.contextFreeActions);
        enc.packObjectArray(this.actions);
        enc.packObjectArray(this.extention);
        return enc.getBytes();
    }
    
    unpack(data: u8[]): usize {
        let dec = new Decoder(data);
        this.expiration = new TimePointSec();
        dec.unpack(this.expiration);
        this.refBlockNum = dec.unpackNumber<u16>();
        this.refBlockPrefix = dec.unpackNumber<u32>();
        this.maxNetUsageWords = new VarUint32();
        dec.unpack(this.maxNetUsageWords);
        this.maxCpuUsageMs = dec.unpackNumber<u8>();
        this.delaySec = new VarUint32();
        dec.unpack(this.delaySec);
        {
            let length = <i32>dec.unpackLength();
            this.contextFreeActions = new Array<Action>(length)
            for (let i=0; i<length; i++) {
                let obj = new Action();
                this.contextFreeActions[i] = obj;
                dec.unpack(obj);
            }
        }

        {
            let length = <i32>dec.unpackLength();
            this.actions = new Array<Action>(length)
            for (let i=0; i<length; i++) {
                let obj = new Action();
                this.actions[i] = obj;
                dec.unpack(obj);
            }
        }

        {
            let length = <i32>dec.unpackLength();
            this.extention = new Array<TransactionExtension>(length)
            for (let i=0; i<length; i++) {
                let obj = new TransactionExtension();
                this.extention[i] = obj;
                dec.unpack(obj);
            }
        }
        return dec.getPos();
    }

    getSize(): usize {
        let size: usize = 0;
        size += this.expiration.getSize();
        size += sizeof<u32>();
        size += sizeof<u32>();
        size += this.maxNetUsageWords.getSize();
        size += sizeof<u8>();
        size += this.delaySec.getSize();
        size += calcPackedVarUint32Length(this.contextFreeActions.length);

        for (let i=0; i<this.contextFreeActions.length; i++) {
            size += this.contextFreeActions[i].getSize();
        }
            
        size += calcPackedVarUint32Length(this.actions.length);

        for (let i=0; i<this.actions.length; i++) {
            size += this.actions[i].getSize();
        }
            
        size += calcPackedVarUint32Length(this.extention.length);

        for (let i=0; i<this.extention.length; i++) {
            size += this.extention[i].getSize();
        }            
        return size;
    }
}
