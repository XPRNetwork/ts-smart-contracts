import { Name, PermissionLevel, InlineAction, ActionData, EMPTY_NAME } from "..";

export const RNG_CONTRACT = Name.fromString("rng")

@packer
class RequestRandom extends ActionData {
    constructor (
        public customerId: u64 = 0,
        public signingValue: u64 = 0,
        public contract: Name = EMPTY_NAME,
    ) {
        super();
    }
}

// Inline action
export function sendRequestRandom(contract: Name, customerId: u64, signingValue: u64): void {
    const REQUESTRANDOM = new InlineAction<RequestRandom>("requestrand");
    const action = REQUESTRANDOM.act(RNG_CONTRACT, new PermissionLevel(contract))
    const actionParams = new RequestRandom(customerId, signingValue, contract)
    action.send(actionParams)
}