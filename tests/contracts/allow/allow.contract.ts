import { Name, Singleton, action, Contract, contract, check, requireAuth, MultiIndex, IDX128, ExtendedSymbol, SecondaryIterator, Decoder, print } from 'as-chain'
import { allow, setactor, settoken, setglobals } from './allow.constants';
import { AllowedActor, AllowedToken, AllowGlobals } from './allow.tables';
import { extendedSymbolToU128 } from './allow.utils';

@contract(allow)
export class AllowContract extends Contract {
    contract: Name = this.receiver
    parentContract: Name = this.firstReceiver

    allowedActorTable: MultiIndex<AllowedActor> = AllowedActor.getTable(this.receiver)
    allowedTokenTable: MultiIndex<AllowedToken> = AllowedToken.getTable(this.receiver)
    allowGlobalsSingleton: Singleton<AllowGlobals> = AllowGlobals.getSingleton(this.receiver)

    /**
     * Set the global variables
     * @param {boolean} isPaused - boolean,
     * @param {boolean} isActorStrict - If true, then actors must be registered with the system.
     * @param {boolean} isTokenStrict - boolean
     */
    @action(setglobals)
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
    @action(settoken)
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
        const allowedTokenIdxItr = this.findAllowedTokenSecondaryItr(token)
        const tokenPrimaryKey = allowedTokenIdxItr.isOk()
            ? allowedTokenIdxItr.primary
            : this.allowedTokenTable.availablePrimaryKey()
        const allowedToken = new AllowedToken(tokenPrimaryKey, token, isAllowed, isBlocked)

        if (isAllowed || isBlocked) {
            this.allowedTokenTable.set(allowedToken, this.contract)
        } else if (allowedTokenIdxItr.isOk()) {
            this.allowedTokenTable.removeEx(allowedToken.getPrimaryValue())
        }
    }

    /**
     * It sets the isAllowed field of the actor to the value of isAllowed.
     * @param {Name} actor - Name
     * @param {boolean} isAllowed - boolean
     */
    @action(setactor)
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
        } else  {
            const itr = this.allowedActorTable.find(allowedActor.getPrimaryValue())
            if (itr.isOk()) {
                this.allowedActorTable.remove(itr)
            }
        }
    }

    /**
     * Helper functions
     */
    findAllowedTokenSecondaryItr(token: ExtendedSymbol): SecondaryIterator {
        const idx128 = <IDX128>this.allowedTokenTable.idxdbs[0]
        const extSymKey = extendedSymbolToU128(token)
        return idx128.find(extSymKey);
    }
    findAllowedToken(token: ExtendedSymbol): AllowedToken | null {
        const allowedTokenIdxItr = this.findAllowedTokenSecondaryItr(token);
        if (!allowedTokenIdxItr.isOk()) {
            return null;
        }
        return this.allowedTokenTable.getByKey(allowedTokenIdxItr.primary) 
    }
    isTokenAllowed(token: ExtendedSymbol): boolean {
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
    checkTokenIsAllowed(token: ExtendedSymbol): void {
        check(this.isTokenAllowed(token), `Token ${token} is now allowed to use ${this.contract}`)
    }

    isActorAllowed(actor: Name): boolean {
        // Check stricst
        const isActorStrict = this.allowGlobalsSingleton.get().isActorStrict

        // Find entry
        const allowedActor = this.allowedActorTable.getByKey(actor.N)

        // If no entry found, account is allowed
        if (allowedActor == null) {
            return !isActorStrict
        }

        // Check is blocked
        return allowedActor.isAllowed || (!isActorStrict && !allowedActor.isBlocked)
    }
    checkActorIsAllowed(actor: Name): void {
        check(this.isActorAllowed(actor), `Actor ${actor} is now allowed to use ${this.contract}`)
    }

    isContractPaused(): boolean {
        return this.allowGlobalsSingleton.get().isPaused
    }
    checkContractIsNotPaused(): void {
        check(!this.isContractPaused(), `Contract ${this.contract} is paused`)
    }
}