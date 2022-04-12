import { InlineAction } from "../../assembly";
import { Name, PermissionLevel, ActionWrapper } from "../../assembly"

const RNG_CONTRACT = Name.fromString("rng")
const RNG_ACTION = ActionWrapper.fromString("requestrand");

@packer
export class RequestRandom extends InlineAction {
    constructor (
        public customerId: u64 = 0,
        public signingValue: u64 = 0,
        public contract: Name = new Name(),
    ) {
        super();
    }
}

// Inline action
export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void {
    const action = RNG_ACTION.act(RNG_CONTRACT, new PermissionLevel(contract))
    const actionParams = new RequestRandom(customerId, signingValue, contract)
    action.send(actionParams)
}