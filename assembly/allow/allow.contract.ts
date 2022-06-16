import { Name, Singleton, Contract, check, requireAuth, ExtendedSymbol, TableStore } from '..'
import { AllowedActor, AllowedToken, AllowGlobals } from './allow.tables';
import { extendedSymbolToU128 } from './allow.utils';

@contract
export class AllowContract extends Contract {
    contract: Name = this.receiver
    parentContract: Name = this.firstReceiver

    allowedActorTable: TableStore<AllowedActor> = new TableStore<AllowedActor>(this.receiver)
    allowedTokenTable: TableStore<AllowedToken> = new TableStore<AllowedToken>(this.receiver)
    allowGlobalsSingleton: Singleton<AllowGlobals> = new Singleton<AllowGlobals>(this.receiver)

    /**
     * Set the global variables
     * @param {boolean} isPaused - boolean,
     * @param {boolean} isActorStrict - If true, then actors must be registered with the system.
     * @param {boolean} isTokenStrict - boolean
     */
    @action("setglobals")
    setglobals(
        isPaused: boolean,
        isActorStrict: boolean,
        isTokenStrict: boolean,
    ): void {
        // Authorization
        requireAuth(this.contract)

        // Logic
        const globals = this.allowGlobalsSingleton.get()
        globals.isPaused = isPaused
        globals.isActorStrict = isActorStrict
        globals.isTokenStrict = isTokenStrict
        this.allowGlobalsSingleton.set(globals, this.contract);
    }

    /**
     * It updates the isAllowed field of the token.
     * @param {ExtendedSymbol} token - The token to be updated.
     * @param {boolean} isBlocked - boolean
     */
    @action("settoken")
    settoken(
        token: ExtendedSymbol,
        isAllowed: boolean,
        isBlocked: boolean,
    ): void {
        // Authorization
        requireAuth(this.contract)

        // Validation
        check(!(isAllowed && isBlocked), "a token cannot be both allowed and blocked at the same time")

        // Logic
        const existingAllowedToken = this.findAllowedToken(token)
        const tokenPrimaryKey = existingAllowedToken ? existingAllowedToken.primary : this.allowedTokenTable.availablePrimaryKey
        const allowedToken = new AllowedToken(tokenPrimaryKey, token, isAllowed, isBlocked)

        if (isAllowed || isBlocked) {
            this.allowedTokenTable.set(allowedToken, this.contract)
        } else {
            this.allowedTokenTable.remove(allowedToken)
        }
    }

    /**
     * It sets the isAllowed field of the actor to the value of isAllowed.
     * @param {Name} actor - Name
     * @param {boolean} isAllowed - boolean
     */
    @action("setactor")
    setactor(
        actor: Name,
        isAllowed: boolean,
        isBlocked: boolean,
    ): void {
        // Authorization
        requireAuth(this.contract)

        // Validation
        check(!(isAllowed && isBlocked), "an actor cannot be both allowed and blocked at the same time")

        // Logic
        const allowedActor = new AllowedActor(actor, isAllowed, isBlocked)
        if (isAllowed || isBlocked) {
            this.allowedActorTable.set(allowedActor, this.contract)
        } else {
            this.allowedActorTable.remove(allowedActor)
        }
    }

    /**
     * Helper functions
     */

    protected checkContractIsNotPaused(): void {
        check(!this.isContractPaused(), `Contract ${this.contract} is paused`)
    }

    protected checkActorIsAllowed(actor: Name, message: string): void {
        if (!message) {
            message = `Actor '${actor}' is not allowed to use contract '${this.contract}'`;
        }
        check(this.isActorAllowed(actor), message);
    }

    protected checkTokenIsAllowed(token: ExtendedSymbol, message: string): void {
        if (!message) {
            message = `Token '${token}' is not allowed to use contract '${this.contract}'`;
        }
        check(this.isTokenAllowed(token), message);
    }

    private findAllowedToken(token: ExtendedSymbol): AllowedToken | null {
        return this.allowedTokenTable.getBySecondaryU128(extendedSymbolToU128(token), 0)
    }

    private isTokenAllowed(token: ExtendedSymbol): boolean {
        // Check stricst
        const isTokenStrict = this.allowGlobalsSingleton.get().isTokenStrict

        // Find entry
        const allowedToken = this.findAllowedToken(token)

        // If no entry found, account is allowed
        if (allowedToken == null) {
            return !isTokenStrict
        }

        // Check is blocked
        return allowedToken.isAllowed || (!isTokenStrict && !allowedToken.isBlocked)
    }

    private isActorAllowed(actor: Name): boolean {
        // Check stricst
        const isActorStrict = this.allowGlobalsSingleton.get().isActorStrict

        // Find entry
        const allowedActor = this.allowedActorTable.get(actor.N)

        // If no entry found, account is allowed
        if (allowedActor == null) {
            return !isActorStrict
        }

        // Check is blocked
        return allowedActor.isAllowed || (!isActorStrict && !allowedActor.isBlocked)
    }

    private isContractPaused(): boolean {
        return this.allowGlobalsSingleton.get().isPaused
    }
}