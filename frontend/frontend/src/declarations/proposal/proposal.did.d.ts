import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment {
  'tema' : string,
  'user' : Principal,
  'detail' : string,
}
export type GetProposalsResult = { 'ok' : SuccessProposal } |
  { 'err' : ProposalFullError };
export interface Jurisdiction {
  'region' : [] | [string],
  'country' : [] | [string],
  'continent' : [] | [string],
}
export interface Proposal {
  'invitedUsers' : Array<Principal>,
  'environmentalUnits' : bigint,
  'threshold' : bigint,
  'votes' : Array<Vote>,
  'name' : string,
  'invitedRoles' : Array<Role>,
  'description' : [] | [string],
  'deadline' : string,
  'author' : Principal,
  'state' : StateProposal,
  'typeProposal' : TypeProposal,
  'comments' : Array<Comment>,
  'photo' : Uint8Array | number[],
  'location' : Array<Jurisdiction>,
  'startDate' : string,
}
export type ProposalError = { 'NoUsersFound' : null } |
  { 'ProposalNotFound' : null } |
  { 'UserNotInvited' : null } |
  { 'UserNotApproved' : null } |
  { 'ParticipationsNotSet' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'UserNotAuthorized' : null } |
  { 'ProposalAlreadyApproved' : null } |
  { 'UserAlreadyVoted' : null } |
  { 'UserNotFound' : null };
export type ProposalFullError = { 'ParticipationsNotSet' : null } |
  { 'InvalidDate' : string };
export interface ProposalRequest {
  'environmentalUnits' : bigint,
  'threshold' : bigint,
  'name' : string,
  'invitedRoles' : Array<Role>,
  'description' : [] | [string],
  'deadline' : string,
  'photo' : Uint8Array | number[],
  'location' : Array<Jurisdiction>,
}
export type ProposalResult = { 'ok' : SuccessProposal } |
  { 'err' : ProposalError };
export type Role = { 'Academy' : null } |
  { 'TechnicalExpert' : null } |
  { 'ProjectDeveloper' : null } |
  { 'Register' : null } |
  { 'TechnicalSecretariat' : null } |
  { 'Government' : null } |
  { 'Standard' : null } |
  { 'Validator' : null } |
  { 'Community' : null };
export type StateProposal = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export type SuccessProposal = { 'SuccessText' : Text } |
  { 'FullProposal' : Array<[bigint, Proposal]> } |
  { 'Proposal' : Proposal };
export type Text = string;
export type TypeProposal = { 'Project' : null } |
  { 'Standard' : null };
export interface Vote { 'user' : Principal, 'approved' : boolean }
export interface _SERVICE {
  'createProposal' : ActorMethod<[ProposalRequest], ProposalResult>,
  'deleteProposal' : ActorMethod<[bigint], ProposalResult>,
  'getAllProposals' : ActorMethod<[], GetProposalsResult>,
  'vote' : ActorMethod<[boolean, bigint], ProposalResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
