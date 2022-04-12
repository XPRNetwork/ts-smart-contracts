import { Contract, print } from "../../assembly"

@contract
class HelloContract extends Contract {
    @action("say")
    say(text: string): void {
        print(text);
    }
}