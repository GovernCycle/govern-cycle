import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AuthenticationError = { 'UserAlreadyExists' : null } |
  { 'UserNotApproved' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'NotAllowedAction' : null } |
  { 'UserNotAuthorized' : null } |
  { 'UserNotFound' : null };
export type AuthenticationResult = { 'ok' : SuccessAuthentication } |
  { 'err' : AuthenticationError };
export interface Comment {
  'tema' : string,
  'user' : Principal,
  'detail' : string,
}
export interface Jurisdiction {
  'region' : [] | [string],
  'country' : [] | [string],
  'continent' : [] | [string],
}
export interface Participation {
  'active' : Array<bigint>,
  'done' : Array<bigint>,
  'inactive' : Array<bigint>,
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
  'links' : Array<string>,
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
  { 'InvalidDate' : null } |
  { 'NotAllowedAction' : null } |
  { 'UserNotAuthorized' : null } |
  { 'ProposalAlreadyApproved' : null } |
  { 'UserAlreadyVoted' : null } |
  { 'UserNotFound' : null };
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
export type State = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export type StateProposal = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export type SuccessAuthentication = { 'SuccessText' : Text } |
  { 'User' : User } |
  { 'Participation' : Participation } |
  { 'WhiteListed' : Array<Principal> };
export type SuccessProposal = { 'SuccessText' : Text } |
  { 'FullProposal' : Array<[bigint, Proposal]> } |
  { 'Proposal' : Proposal } |
  { 'ParticipationsSet' : null };
export type Text = string;
export type TypeProposal = { 'Project' : null } |
  { 'Standard' : null };
export interface User {
  'manager' : [] | [string],
  'logo' : Uint8Array | number[],
  'name' : string,
  'role' : Array<Role>,
  'email' : string,
  'jurisdiction' : Array<Jurisdiction>,
  'state' : State,
  'phone' : string,
}
export interface Vote { 'user' : Principal, 'approved' : boolean }
export interface _SERVICE {
  'addWhitelist' : ActorMethod<[Principal], AuthenticationResult>,
  'deleteProfile' : ActorMethod<[Principal], AuthenticationResult>,
  'deleteProposal' : ActorMethod<[bigint], ProposalResult>,
  'findWithRolesAndJurisdiction' : ActorMethod<
    [Array<Role>, Array<Jurisdiction>],
    Array<Principal>
  >,
  'getAllProfiles' : ActorMethod<[], Array<[Principal, User]>>,
  'getAllProposals' : ActorMethod<[], Array<[bigint, Proposal]>>,
  'getAllWhitelist' : ActorMethod<[], AuthenticationResult>,
  'getNextProposalId' : ActorMethod<[], bigint>,
  'getParticipations' : ActorMethod<[Principal], [] | [Participation]>,
  'getProfile' : ActorMethod<[Principal], [] | [User]>,
  'getProposal' : ActorMethod<[bigint], [] | [Proposal]>,
  'getProposalKeys' : ActorMethod<[], Array<bigint>>,
  'isWhitelisted' : ActorMethod<[Principal], boolean>,
  'saveProfile' : ActorMethod<[User, Principal], AuthenticationResult>,
  'saveProposal' : ActorMethod<[Proposal], ProposalResult>,
  'setParticipation' : ActorMethod<[Principal, Participation], undefined>,
  'updateProfile' : ActorMethod<[Principal, User], AuthenticationResult>,
  'updateProposal' : ActorMethod<[bigint, Proposal], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
