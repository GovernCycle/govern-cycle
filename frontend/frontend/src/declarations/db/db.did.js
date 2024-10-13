export const idlFactory = ({ IDL }) => {
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
  const SuccessAuthentication = IDL.Variant({
    'SuccessText' : Text,
    'User' : User,
    'Participation' : Participation,
    'WhiteListed' : IDL.Vec(IDL.Principal),
  });
  const AuthenticationError = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'UserNotApproved' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'NotAllowedAction' : IDL.Null,
    'UserNotAuthorized' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const AuthenticationResult = IDL.Variant({
    'ok' : SuccessAuthentication,
    'err' : AuthenticationError,
  });
  const Vote = IDL.Record({ 'user' : IDL.Principal, 'approved' : IDL.Bool });
  const StateProposal = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const TypeProposal = IDL.Variant({
    'Project' : IDL.Null,
    'Standard' : IDL.Null,
  });
  const Comment = IDL.Record({
    'tema' : IDL.Text,
    'user' : IDL.Principal,
    'detail' : IDL.Text,
  });
  const Proposal = IDL.Record({
    'invitedUsers' : IDL.Vec(IDL.Principal),
    'environmentalUnits' : IDL.Nat,
    'threshold' : IDL.Nat,
    'votes' : IDL.Vec(Vote),
    'name' : IDL.Text,
    'invitedRoles' : IDL.Vec(Role),
    'description' : IDL.Opt(IDL.Text),
    'deadline' : IDL.Text,
    'author' : IDL.Principal,
    'links' : IDL.Vec(IDL.Text),
    'state' : StateProposal,
    'typeProposal' : TypeProposal,
    'comments' : IDL.Vec(Comment),
    'photo' : IDL.Vec(IDL.Nat8),
    'location' : IDL.Vec(Jurisdiction),
    'startDate' : IDL.Text,
  });
  const SuccessProposal = IDL.Variant({
    'SuccessText' : Text,
    'FullProposal' : IDL.Vec(IDL.Tuple(IDL.Nat, Proposal)),
    'Proposal' : Proposal,
    'ParticipationsSet' : IDL.Null,
  });
  const ProposalError = IDL.Variant({
    'NoUsersFound' : IDL.Null,
    'ProposalNotFound' : IDL.Null,
    'UserNotInvited' : IDL.Null,
    'UserNotApproved' : IDL.Null,
    'ParticipationsNotSet' : IDL.Null,
    'UserNotAuthenticated' : IDL.Null,
    'InvalidDate' : IDL.Null,
    'NotAllowedAction' : IDL.Null,
    'UserNotAuthorized' : IDL.Null,
    'ProposalAlreadyApproved' : IDL.Null,
    'UserAlreadyVoted' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const ProposalResult = IDL.Variant({
    'ok' : SuccessProposal,
    'err' : ProposalError,
  });
  return IDL.Service({
    'addWhitelist' : IDL.Func([IDL.Principal], [AuthenticationResult], []),
    'deleteProfile' : IDL.Func([IDL.Principal], [AuthenticationResult], []),
    'deleteProposal' : IDL.Func([IDL.Nat], [ProposalResult], []),
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
    'getAllProposals' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, Proposal))],
        [],
      ),
    'getAllWhitelist' : IDL.Func([], [AuthenticationResult], []),
    'getNextProposalId' : IDL.Func([], [IDL.Nat], []),
    'getParticipations' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(Participation)],
        [],
      ),
    'getProfile' : IDL.Func([IDL.Principal], [IDL.Opt(User)], []),
    'getProposal' : IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], []),
    'getProposalKeys' : IDL.Func([], [IDL.Vec(IDL.Nat)], []),
    'isWhitelisted' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'saveProfile' : IDL.Func([User, IDL.Principal], [AuthenticationResult], []),
    'saveProposal' : IDL.Func([Proposal], [ProposalResult], []),
    'setParticipation' : IDL.Func([IDL.Principal, Participation], [], []),
    'updateProfile' : IDL.Func(
        [IDL.Principal, User],
        [AuthenticationResult],
        [],
      ),
    'updateProposal' : IDL.Func([IDL.Nat, Proposal], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
