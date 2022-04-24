import { PermissionLevel, PublicKey } from "../..";

@packer
export class KeyWeight {
    constructor(
        public key: PublicKey = new PublicKey(),
        public weight: u16 = 0
    ){}
}

@packer
export class PermissionLevelWeight {
    constructor(
        public permission: PermissionLevel = new PermissionLevel(),
        public weight: u16 = 0
    ){}
}

@packer
export class WaitWeight {
	waitSec: u16
	weight:  u16
}

@packer
export class Authority {
    constructor(
        public threshold: u32 = 0,
        public keys: KeyWeight[] = new Array<KeyWeight>(),
        public accounts: PermissionLevelWeight[] = new Array<PermissionLevelWeight>(),
        public waits: WaitWeight[] = new Array<WaitWeight>()
    ) {}
}