import { Name, Table, Singleton, U128, ExtendedSymbol, IDXDB, IDX128, TableStore } from "..";
import { extendedSymbolToU128, U128ToExtSym } from "./allow.utils";

// scope: contract
@table("allowglobals", singleton)
export class AllowGlobals extends Table {
    constructor (
        public isPaused: boolean = false,
        public isActorStrict: boolean = false,
        public isTokenStrict: boolean = false,
    ) {
        super();
    }

    static getSingleton(code: Name): Singleton<AllowGlobals> {
        return new Singleton<AllowGlobals>(code, code, Name.fromString("allowglobals"));
    }
}

// scope: contract
@table("allowedactor")
export class AllowedActor extends Table {
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

    static getTable(code: Name): TableStore<AllowedActor> {
        return new TableStore<AllowedActor>(code, code, Name.fromString("allowedactor"));
    }
}

// scope: contract
@table("allowedtoken")
export class AllowedToken extends Table {
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

    static getTable(code: Name): TableStore<AllowedToken> {
        const scope = code
        const tableName = Name.fromString("allowedtoken")
        const idxTableBase: u64 = (tableName.N & 0xfffffffffffffff0);
        const indexes: IDXDB[] = [
            new IDX128(code.N, scope.N, idxTableBase + 0, 0),
        ];
        return new TableStore<AllowedToken>(code, code, tableName, indexes);
    }
}