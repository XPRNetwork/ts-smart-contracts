import { Blockchain } from "@proton/vert";

const main = async () => {
    const blockchain = new Blockchain()
    const helloContract = blockchain.createContract('hello', 'contracts/hello/target/hello.contract')

    setTimeout(async () => {
        await helloContract.actions.say(['hello']).send()
        console.log(helloContract.bc.console)
    }, 0)
}

main()