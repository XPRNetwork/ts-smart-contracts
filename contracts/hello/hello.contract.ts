import { Contract, print } from 'as-chain'

@contract
class HelloContract extends Contract {
    @action("say")
    say(text: string): void {
        print(text);
    }
}