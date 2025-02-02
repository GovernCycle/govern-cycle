import { ActorSubclass } from "@dfinity/agent";

import { CandidCanister } from "@bundly/ares-core";

import { _SERVICE, idlFactory } from "../declarations/nft/nft.did.js";

export type NFTActor = ActorSubclass<_SERVICE>;

export const nft: CandidCanister = {
  idlFactory,
  actorConfig: {
    canisterId: process.env.NEXT_PUBLIC_NFT_CANISTER_ID!,
  },
};


