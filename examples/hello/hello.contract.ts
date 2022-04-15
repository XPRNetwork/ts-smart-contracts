import { Contract, print } from "proton-tsc"

@contract
class HelloContract extends Contract {
    @action("say")
    say(text: string): void {
        print(text);
    }
}