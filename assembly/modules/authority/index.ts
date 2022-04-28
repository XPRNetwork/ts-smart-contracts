import { PermissionLevel, PublicKey, Table, Name } from "../..";

@packer
export class KeyWeight extends Table  {
    constructor(
        public key: PublicKey = new PublicKey(),
        public weight: u16 = 0
    ){
        super()
    }
}

@packer
export class PermissionLevelWeight extends Table  {
    constructor(
        public permission: PermissionLevel = new PermissionLevel(),
        public weight: u16 = 0
    ){
        super()
    }

    static from(actor: Name, permission: string, weight: u16): PermissionLevelWeight {
        return new PermissionLevelWeight(new PermissionLevel(actor, Name.fromString(permission)), weight)
    }

    toAuthority(): Authority {
        return new Authority(this.weight, [], [this], [])
    }
}

@packer
export class WaitWeight extends Table  {
    constructor(
        public waitSec: u16 = 0,
        public weight: u16 = 0
    ){
        super()
    }
}

@packer
export class Authority extends Table {
    constructor(
        public threshold: u32 = 0,
        public keys: KeyWeight[] = new Array<KeyWeight>(),
        public accounts: PermissionLevelWeight[] = new Array<PermissionLevelWeight>(),
        public waits: WaitWeight[] = new Array<WaitWeight>()
    ) {
        super()
    }
}