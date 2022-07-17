import { Contract, print, currentBlockNum, currentTime, currentTimeSec, currentTimeMs } from 'proton-tsc'

@contract
export class TimeContract extends Contract {
    @action("blocknum")
    blocknum(): void {
        print(`${currentBlockNum()}`)
    }

    @action("time")
    time(): void {
        print(`${currentTime()}|${currentTimeMs()}|${currentTimeSec()}`)
    }
    
    
    // k1_recover
    // get_code_hash
    // is_feature_activated
}