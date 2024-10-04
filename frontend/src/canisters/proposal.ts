import { ActorSubclass } from "@dfinity/agent";

import { CandidCanister } from "@bundly/ares-core";

import { _SERVICE, idlFactory } from "../declarations/proposal/proposal.did.js";

export type ProposalActor = ActorSubclass<_SERVICE>;

export const proposal: CandidCanister = {
  idlFactory,
  actorConfig: {
    canisterId: process.env.NEXT_PUBLIC_PROPOSAL_CANISTER_ID!,
  },
};
