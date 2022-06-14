import { Name, ExtendedSymbol } from '..'
import { AllowContract } from '.';

@contract
export class AllowTestContract extends AllowContract {
    /**
     * Helper actions
     */

    @action("testpaused")
    testpaused(): void {
        this.checkContractIsNotPaused()
    }

    @action("testactor")
    testactor(
        actor: Name,
        message: string
    ): void {
        this.checkActorIsAllowed(actor, message);
    }

    @action("testtoken")
    testtoken(
        token: ExtendedSymbol,
        message: string
    ): void {
        this.checkTokenIsAllowed(token, message)
    }
}