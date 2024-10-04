export const idlFactory = ({ IDL }) => {
  const State = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Text = IDL.Text;
  const Role = IDL.Variant({
    'Academy' : IDL.Null,
    'TechnicalExpert' : IDL.Null,
    'ProjectDeveloper' : IDL.Null,
    'Register' : IDL.Null,
    'TechnicalSecretariat' : IDL.Null,
    'Government' : IDL.Null,
    'Standard' : IDL.Null,
    'Validator' : IDL.Null,
    'Community' : IDL.Null,
  });
  const Jurisdiction = IDL.Record({
    'region' : IDL.Opt(IDL.Text),
    'country' : IDL.Opt(IDL.Text),
    'continent' : IDL.Opt(IDL.Text),
  });
  const User = IDL.Record({
    'manager' : IDL.Opt(IDL.Text),
    'logo' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'role' : IDL.Vec(Role),
    'email' : IDL.Text,
    'jurisdiction' : IDL.Vec(Jurisdiction),
    'state' : State,
    'phone' : IDL.Text,
  });
  const Participation = IDL.Record({
    'active' : IDL.Vec(IDL.Nat),
    'done' : IDL.Vec(IDL.Nat),
    'inactive' : IDL.Vec(IDL.Nat),
  });
  const SuccessAuthentication = IDL.Variant({
    'SuccessText' : Text,
    'User' : User,
    'Participation' : Participation,
  });
  const AuthenticationError = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'UserNotApproved' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'UserNotAuthorized' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const AuthenticationResult = IDL.Variant({
    'ok' : SuccessAuthentication,
    'err' : AuthenticationError,
  });
  const UserRequest = IDL.Record({
    'manager' : IDL.Opt(IDL.Text),
    'logo' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'role' : IDL.Vec(Role),
    'email' : IDL.Text,
    'jurisdiction' : IDL.Vec(Jurisdiction),
    'phone' : IDL.Text,
  });
  return IDL.Service({
    'changeUserState' : IDL.Func(
        [State, IDL.Principal],
        [AuthenticationResult],
        [],
      ),
    'createProfile' : IDL.Func([UserRequest], [AuthenticationResult], []),
    'deleteUser' : IDL.Func([IDL.Principal], [AuthenticationResult], []),
    'getAllProfiles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, User))],
        [],
      ),
    'getMyParticipations' : IDL.Func([], [AuthenticationResult], []),
    'getProfile' : IDL.Func([], [AuthenticationResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
