export const idlFactory = ({ IDL }) => {
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
  const State = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
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
  return IDL.Service({
    'deleteProfile' : IDL.Func([IDL.Principal], [], []),
    'findWithRolesAndJurisdiction' : IDL.Func(
        [IDL.Vec(Role), IDL.Vec(Jurisdiction)],
        [IDL.Vec(IDL.Principal)],
        [],
      ),
    'getAllProfiles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, User))],
        [],
      ),
    'getParticipations' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(Participation)],
        [],
      ),
    'getProfile' : IDL.Func([IDL.Principal], [IDL.Opt(User)], []),
    'saveProfile' : IDL.Func([User, IDL.Principal], [], []),
    'setParticipation' : IDL.Func([IDL.Principal, Participation], [], []),
    'updateProfile' : IDL.Func([IDL.Principal, User], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
