import { Blockchain } from "@proton/vert";

async function wait (ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
}

const main = async () => {
    const blockchain = new Blockchain()
    const helloContract = blockchain.createContract('hello', 'assembly/hello/target/hello.contract')
    await wait(0)
    await helloContract.actions.say(['hello']).send()
    console.log(helloContract.bc.console)
}

main()