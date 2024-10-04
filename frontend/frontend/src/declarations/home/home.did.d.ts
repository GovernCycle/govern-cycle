import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AuthenticationError = { 'UserAlreadyExists' : null } |
  { 'UserNotApproved' : null } |
  { 'UserNotAuthenticated' : null } |
  { 'UserNotAuthorized' : null } |
  { 'UserNotFound' : null };
export type AuthenticationResult = { 'ok' : SuccessAuthentication } |
  { 'err' : AuthenticationError };
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
export type SuccessAuthentication = { 'SuccessText' : Text } |
  { 'User' : User } |
  { 'Participation' : Participation };
export type Text = string;
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
export interface UserRequest {
  'manager' : [] | [string],
  'logo' : Uint8Array | number[],
  'name' : string,
  'role' : Array<Role>,
  'email' : string,
  'jurisdiction' : Array<Jurisdiction>,
  'phone' : string,
}
export interface _SERVICE {
  'changeUserState' : ActorMethod<[State, Principal], AuthenticationResult>,
  'createProfile' : ActorMethod<[UserRequest], AuthenticationResult>,
  'deleteUser' : ActorMethod<[Principal], AuthenticationResult>,
  'getAllProfiles' : ActorMethod<[], Array<[Principal, User]>>,
  'getMyParticipations' : ActorMethod<[], AuthenticationResult>,
  'getProfile' : ActorMethod<[], AuthenticationResult>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
