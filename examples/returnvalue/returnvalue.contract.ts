import { Contract } from "proton-tsc";

@contract
export class ReturnValueContract extends Contract {
    @action("returnvalue")
    returnvalue(): u64 {
        return 5
    }
}