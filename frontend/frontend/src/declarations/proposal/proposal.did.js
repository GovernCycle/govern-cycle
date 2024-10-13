export const idlFactory = ({ IDL }) => {
  const Text = IDL.Text;
  const Vote = IDL.Record({ 'user' : IDL.Principal, 'approved' : IDL.Bool });
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
  const Jurisdiction = IDL.Record({
    'region' : IDL.Opt(IDL.Text),
    'country' : IDL.Opt(IDL.Text),
    'continent' : IDL.Opt(IDL.Text),
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
  const ProposalRequest = IDL.Record({
    'environmentalUnits' : IDL.Nat,
    'threshold' : IDL.Nat,
    'name' : IDL.Text,
    'invitedRoles' : IDL.Vec(Role),
    'description' : IDL.Opt(IDL.Text),
    'deadline' : IDL.Text,
    'links' : IDL.Vec(IDL.Text),
    'photo' : IDL.Vec(IDL.Nat8),
    'location' : IDL.Vec(Jurisdiction),
  });
  const ProposalFullError = IDL.Variant({
    'ProposalNotFound' : IDL.Null,
    'ParticipationsNotSet' : IDL.Null,
    'InvalidDate' : IDL.Null,
    'NotAllowedAction' : IDL.Null,
  });
  const GetProposalsResult = IDL.Variant({
    'ok' : SuccessProposal,
    'err' : ProposalFullError,
  });
  return IDL.Service({
    'addComment' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text],
        [ProposalResult],
        [],
      ),
    'createProposal' : IDL.Func([ProposalRequest], [ProposalResult], []),
    'deleteProposal' : IDL.Func([IDL.Nat], [ProposalResult], []),
    'getAllProposals' : IDL.Func([], [GetProposalsResult], []),
    'getProposal' : IDL.Func([IDL.Nat], [GetProposalsResult], []),
    'proveExposeEndpointTime' : IDL.Func([], [IDL.Text], []),
    'vote' : IDL.Func([IDL.Bool, IDL.Nat], [ProposalResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
