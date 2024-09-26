
import { ActorSubclass } from "@dfinity/agent";

import { CandidCanister } from "@bundly/ares-core";
import _SERVICE, { idlFactory } from "@dfinity/agent/lib/cjs/canisters/management_service";



export type HomeActor = ActorSubclass<_SERVICE>;

export const home: CandidCanister = {
  idlFactory,
  actorConfig: {
    canisterId: process.env.NEXT_PUBLIC_HOME_CANISTER_ID! || "be2us-64aaa-aaaaa-qaabq-cai",
  },
};


