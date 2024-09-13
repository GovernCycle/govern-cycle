import { ActorSubclass } from "@dfinity/agent";

import { CandidCanister } from "@bundly/ares-core";

import { _SERVICE, idlFactory } from "../declarations/home/home.did.js";

export type HomeActor = ActorSubclass<_SERVICE>;

export const home: CandidCanister = {
  idlFactory,
  actorConfig: {
    canisterId: process.env.NEXT_PUBLIC_HOME_CANISTER_ID! || "fo7wv-oaaaa-aaaap-qhtea-cai",
  },
};


