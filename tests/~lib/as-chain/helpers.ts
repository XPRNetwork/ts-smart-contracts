import { PermissionLevel, Action } from "./action"
import { SecondaryValue, newSecondaryValue_u64 } from "./idxdb"
import { MultiIndex, MultiIndexValue } from "./mi"
import { Name } from "./name"
import { Packer } from "./serializer"
import { check } from "./system"

export class ActionWrapperAct {
    constructor(
        public action: Name,
        public contract: Name,
        public permissionLevel: PermissionLevel
    ){}

    send <T extends Packer>(data: T): void {
        const permissions = [this.permissionLevel]
        const action = new Action(permissions, this.contract, this.action, data.pack())
        action.send()
    }
}

export class ActionWrapper {
    constructor(
        public action: Name = new Name()
    ){}

    static fromString(s: string): ActionWrapper {
        return new ActionWrapper(Name.fromString(s))
    }

    /**
     * Create an action with act given contract, actor, and permission
     * @param {Name} contract - The name of the contract
     * @param {Name} actor - The name of the account that is executing the contract.
     * @param {string} permission - The permission that the actor must have to execute the contract.
     * @returns An instance of the Act class.
     */
    act (
        contract: Name,
        permissionLevel: PermissionLevel
    ): ActionWrapperAct {
        return new ActionWrapperAct(this.action, contract, permissionLevel)
    }
}

export class Contract {
    constructor(
        public receiver: Name,
        public firstReceiver: Name,
        public action: Name
    ) {}
}

export class Table implements MultiIndexValue {
    pack(): u8[] {
        check(false, "not implemented");
        return [];
    }
    
    unpack(_: u8[]): usize {
        check(false, "not implemented");
        return 0;
    }

    getSize(): usize {
        check(false, "not implemented");
        return 0;
    }

    getPrimaryValue(): u64 {
        check(false, "not implemented");
        return 0;
    }

    getSecondaryValue(_: i32): SecondaryValue {
        check(false, "not implemented");
        return newSecondaryValue_u64(0);
    }

    setSecondaryValue(_: usize, __: SecondaryValue): void {
        check(false, "not implemented");
    };

    static new(_: Name, __: Name): MultiIndex<Table> {
        check(false, "not implemented");
        // @ts-ignore
        return new MultiIndex<Table>(_, __, new Name(), []);
    }
}
