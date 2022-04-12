import { Contract, print } from ".."

@contract
class HelloContract extends Contract {
    @action("say")
    say(text: string): void {
        print(text);
    }
}