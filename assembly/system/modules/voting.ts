import { Name, PermissionLevel , InlineAction, ActionData, EMPTY_NAME } from "../..";
import { SYSTEM_CONTRACT } from "../constants";

const VOTEPRODUCER_ACTION = new InlineAction<VoteProducer>("voteproducer")

@packer
class VoteProducer extends ActionData {
    constructor (
        public voter: Name = EMPTY_NAME,
        public proxy: Name = EMPTY_NAME,
        public producers: Name[] = [],
    ) {
        super();
    }
}

export function sendVoteProducer(contract: Name, voter: Name, proxy: Name, producers: Name[]): void {
    const action = VOTEPRODUCER_ACTION.act(SYSTEM_CONTRACT, new PermissionLevel(contract))
    const actionParams = new VoteProducer(voter, proxy, producers)
    action.send(actionParams)
}
