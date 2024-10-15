import { CandidCanister } from "@bundly/ares-core";

import { HomeActor, home } from "./home";
import { proposal, ProposalActor } from "./proposal";

export type CandidActors = {
  home: HomeActor;
  proposal: ProposalActor
};



export let candidCanisters: Record<keyof CandidActors, CandidCanister> = {
  home, proposal
};


