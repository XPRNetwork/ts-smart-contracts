import { Name, table, primary, Table, MultiIndex, singleton, Singleton, secondary, U128, ExtendedSymbol, IDXDB, IDX128 } from "as-chain";
import { allowedactor, allowedtoken, paused } from "./allow.constants";
import { extendedSymbolToU128, U128ToExtSym } from "./allow.utils";

// scope: contract
@table(paused, singleton)
export class PausedSingleton extends Table {
    constructor (
        public isPaused: boolean = false,
        public isAllowedActorStrict: boolean = false,
        public isAllowedTokenStrict: boolean = false,
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<Paused> {
        return new Singleton<Paused>(code, code, paused);
    }
}

export class Paused extends PausedSingleton {}

// scope: contract
@table(allowedactor)
export class AllowedActorTable extends Table {
    constructor (
        public actor: Name = new Name(),
        public isAllowed: boolean = false,
        public isBlocked: boolean = false,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.actor.N;
    }

    static getTable(code: Name): MultiIndex<AllowedActor> {
        return new MultiIndex<AllowedActor>(code, code, allowedactor);
    }
}

export class AllowedActor extends AllowedActorTable {}

// scope: contract
@table(allowedtoken)
export class AllowedTokenTable extends Table {
    constructor (
        public index: u64 = 0,
        public token: ExtendedSymbol = new ExtendedSymbol(),
        public isAllowed: boolean = false,
        public isBlocked: boolean = false,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.index;
    }

    @secondary
    get byToken(): U128 {
        return extendedSymbolToU128(this.token)
    }

    set byToken(value: U128) {
       this.token = U128ToExtSym(value)
    }

    static getTable(code: Name): MultiIndex<AllowedToken> {
        const scope = code
        const tableName = allowedtoken
        const idxTableBase: u64 = (tableName.N & 0xfffffffffffffff0);
        const indexes: IDXDB[] = [
            new IDX128(code.N, scope.N, idxTableBase + 0, 0),
        ];
        return new MultiIndex<AllowedToken>(code, code, allowedtoken, indexes);
    }
}

export class AllowedToken extends AllowedTokenTable {}