import { Name, Singleton, action, Contract, contract, check, requireAuth, MultiIndex, SAME_PAYER, IDX128, ExtendedSymbol } from 'as-chain'
import { allow, allowactor, allowtoken, blockactor, blocktoken, setpaused } from './allow.constants';
import { AllowedActor, AllowedToken, Paused } from './allow.tables';
import { extendedSymbolToU128 } from './allow.utils';

enum UpdateFields {
    IS_ALLOWED = 0,
    IS_BLOCKED = 1,
};

@contract(allow)
export class AllowContract extends Contract {
    contract: Name = this.receiver
    parentContract: Name = this.firstReceiver

    allowedActorTable: MultiIndex<AllowedActor> = AllowedActor.getTable(this.receiver)
    allowedTokenTable: MultiIndex<AllowedToken> = AllowedToken.getTable(this.receiver)
    pausedSingleton: Singleton<Paused> = Paused.getSingleton(this.receiver)

    /**
     * Set the paused state of the contract
     * @param {boolean} isPaused - boolean
     */
    @action(setpaused)
    setpaused(
        isPaused: boolean
    ): void {
        // Authenticate actor
        requireAuth(this.contract)

        // Set singleton
        const pausedObj = this.pausedSingleton.get()
        pausedObj.isPaused = isPaused
        this.pausedSingleton.set(pausedObj, this.contract);
    }

    @action(allowtoken)
    allowtoken(
        token: ExtendedSymbol,
        isAllowed: boolean
    ): void {
        requireAuth(this.contract)
        this.updateAllowedToken(token, UpdateFields.IS_ALLOWED, isAllowed)
    }

    @action(blocktoken)
    blocktoken(
        token: ExtendedSymbol,
        isBlocked: boolean
    ): void {
        requireAuth(this.contract)
        this.updateAllowedToken(token, UpdateFields.IS_BLOCKED, isBlocked)
    }

    /**
     * It sets the isAllowed field of the actor to the value of isAllowed.
     * @param {Name} actor - Name
     * @param {boolean} isAllowed - boolean
     */
    @action(allowactor)
    allowactor(
        actor: Name,
        isAllowed: boolean
    ): void {
        requireAuth(this.contract)
        this.updateAllowedActor(actor, UpdateFields.IS_ALLOWED, isAllowed)
    }

    /**
     * It sets the isBlocked field of the actor to the given value.
     * @param {Name} actor - Name
     * @param {boolean} isBlocked - boolean
     */
    @action(blockactor)
    blockactor(
        actor: Name,
        isBlocked: boolean
    ): void {
        requireAuth(this.contract)
        this.updateAllowedActor(actor, UpdateFields.IS_BLOCKED, isBlocked)
    }

    updateAllowedToken(token: ExtendedSymbol, fieldToUpdate: UpdateFields, fieldValue: boolean): void {
        // Find or create allowed entry
        const idx128 = <IDX128>this.allowedTokenTable.idxdbs[0]
        const extSymKey = extendedSymbolToU128(token)
        let allowedTokenIdxItr = idx128.find(extSymKey);
        if (!allowedTokenIdxItr.isOk()) {
            const newToken = new AllowedToken(this.allowedTokenTable.availablePrimaryKey(), token)
            this.allowedTokenTable.store(newToken, this.contract)
            allowedTokenIdxItr = idx128.find(extSymKey);
            check(allowedTokenIdxItr.isOk(), "could not save new token")
        }

        // Get allowed entry
        const allowedTokenItr = this.allowedTokenTable.requireFind(allowedTokenIdxItr.primary, "token not found");
        const allowedToken = this.allowedTokenTable.get(allowedTokenItr)

        // Update allowed
        if (fieldToUpdate == UpdateFields.IS_ALLOWED) {
            allowedToken.isAllowed = fieldValue

            if (allowedToken.isAllowed) {
                allowedToken.isBlocked = false
            }
        } else if (fieldToUpdate == UpdateFields.IS_BLOCKED) {
            allowedToken.isBlocked = fieldValue

            if (allowedToken.isBlocked) {
                allowedToken.isAllowed = false
            }
        }

        // Save
        if (!allowedToken.isAllowed && !allowedToken.isBlocked) {
            this.allowedTokenTable.remove(allowedTokenItr)
        } else {
            this.allowedTokenTable.update(allowedTokenItr, allowedToken, SAME_PAYER)
        }
    }

    /**
     * Update the allowed table to set the isAllowed or isBlocked field to the given value
     * @param {Name} actor - Name
     * @param {UpdateFields} fieldToUpdate - The field to update.
     * @param {boolean} fieldValue - boolean
     */
    updateAllowedActor(actor: Name, fieldToUpdate: UpdateFields, fieldValue: boolean): void {
        // Find or create allowed entry
        let allowedActorItr = this.allowedActorTable.find(actor.N)
        if (!allowedActorItr.isOk()) {
            allowedActorItr = this.allowedActorTable.store(new AllowedActor(actor), this.contract)
        }

        // Get allowed entry
        const allowedActor = this.allowedActorTable.get(allowedActorItr)

        // Update allowed
        if (fieldToUpdate == UpdateFields.IS_ALLOWED) {
            allowedActor.isAllowed = fieldValue

            if (allowedActor.isAllowed) {
                allowedActor.isBlocked = false
            }
        } else if (fieldToUpdate == UpdateFields.IS_BLOCKED) {
            allowedActor.isBlocked = fieldValue

            if (allowedActor.isBlocked) {
                allowedActor.isAllowed = false
            }
        }

        // Save
        if (!allowedActor.isAllowed && !allowedActor.isBlocked) {
            this.allowedActorTable.remove(allowedActorItr)
        } else {
            this.allowedActorTable.update(allowedActorItr, allowedActor, SAME_PAYER);
        }
    }

    /**
     * Helper functions
     */
    isActorAllowed(actor: Name): boolean {
        // Find entry
        const allowedActorItr = this.allowedActorTable.find(actor.N)

        // If no entry found, account is allowed
        if (!allowedActorItr.isOk()) {
            return true
        }

        // Get entry
        const allowed = this.allowedActorTable.get(allowedActorItr)

        // isAllowed = true
        //     or
        // isBlocked = false
        return allowed.isAllowed || !allowed.isBlocked
    }

    checkActorIsAllowed(actor: Name): void {
        check(this.isActorAllowed(actor), `Actor ${actor} is now allowed to use ${this.contract}`)
    }

    isContractPaused(): boolean {
        return this.pausedSingleton.get().isPaused
    }

    checkContractIsNotPaused(): void {
        check(!this.isContractPaused(), `Contract ${this.contract} is paused`)
    }
}