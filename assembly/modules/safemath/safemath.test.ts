import {
    Contract,
    print,
    SafeMath,
} from "../.."

@contract
class MyContract extends Contract{
    @action("add")
    add(x: u64, y: u64): void {
        print(`${SafeMath.add(x, y)}`)
    }

    @action("sub")
    sub(x: u64, y: u64): void {
        print(`${SafeMath.sub(x, y)}`)
    }

    @action("mul")
    mul(x: u64, y: u64): void {
        print(`${SafeMath.mul(x, y)}`)
    }

    @action("div")
    div(x: u64, y: u64): void {
        print(`${SafeMath.div(x, y)}`)
    }
}