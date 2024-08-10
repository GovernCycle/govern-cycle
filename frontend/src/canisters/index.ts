import { CandidCanister } from "@bundly/ares-core";

import { HomeActor, home } from "./home";

export type CandidActors = {
  home: HomeActor;
};

export let candidCanisters: Record<keyof CandidActors, CandidCanister> = {
  home,
};
