import * as env from 'as-chain/env'

@contract
class ForwardedContract {}

export function apply(receiver: u64, firstReceiver: u64, action: u64): void {
	if (receiver != firstReceiver) {
        env.require_recipient(14033216438886465536); // proton encode:name sf
	}
}