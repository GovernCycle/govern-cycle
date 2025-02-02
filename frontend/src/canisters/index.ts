import { CandidCanister } from "@bundly/ares-core";

import { HomeActor, home } from "./home";
import { proposal, ProposalActor } from "./proposal";

import { NFTActor,nft } from "./nft";

export type CandidActors = {
  home: HomeActor;
  proposal: ProposalActor;
  nft: NFTActor;
};



export let candidCanisters: Record<keyof CandidActors, CandidCanister> = {
  home, proposal, nft
};


