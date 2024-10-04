import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface _SERVICE {
  'deleteProfile' : ActorMethod<[Principal], undefined>,
  'findWithRolesAndJurisdiction' : ActorMethod<
    [Array<Role>, Array<Jurisdiction>],
    Array<Principal>
  >,
  'getAllProfiles' : ActorMethod<[], Array<[Principal, User]>>,
  'getParticipations' : ActorMethod<[Principal], [] | [Participation]>,
  'getProfile' : ActorMethod<[Principal], [] | [User]>,
  'saveProfile' : ActorMethod<[User, Principal], undefined>,
  'setParticipation' : ActorMethod<[Principal, Participation], undefined>,
  'updateProfile' : ActorMethod<[Principal, User], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
