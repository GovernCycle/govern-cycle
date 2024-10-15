import Text "mo:base/Text";
import ProposalData "../types/proposal";
import Result "mo:base/Result";

module {

    // Private type to represent different errors that can occur during proposal-related operations.
    // - #UserNotAuthenticated: User is not authenticated.
    // - #UserNotAuthorized: User is not authorized to perform the action.
    // - #UserNotApproved: User's account is not in an approved state.
    // - #UserNotFound: User could not be found.
    // - #NoUsersFound: No users were found for the operation.
    // - #ProposalNotFound: The specified proposal could not be found.
    // - #ParticipationsNotSet: Participations for the user have not been set.
    // - #UserAlreadyVoted: The user has already voted on the proposal.
    // - #UserNotInvited: The user is not invited to the proposal.
    // - #ProposalAlreadyApproved: The proposal has already been approved.
    // - #InvalidDate: The date provided is invalid.
    private type ProposalError = {
        #UserNotAuthenticated;
        #UserNotAuthorized;
        #UserNotApproved;
        #UserNotFound;
        #NoUsersFound;
        #ProposalNotFound;
        #ParticipationsNotSet;
        #UserAlreadyVoted;
        #UserNotInvited;
        #ProposalAlreadyApproved;
        #InvalidDate;
        #NotAllowedAction;

    };

    // Private type to represent successful outcomes of proposal-related operations.
    // - #SuccessText: Contains a Text message indicating success.
    // - #Proposal: Contains a single ProposalData.Proposal object.
    // - #FullProposal: Contains a list of tuples, where each tuple includes a Nat (identifier) and a ProposalData.Proposal.
    private type SuccessProposal = {
        #SuccessText : Text.Text;
        #Proposal : ProposalData.Proposal;
        #FullProposal : [(Nat, ProposalData.Proposal)];
        #ParticipationsSet;
    };

    // Private type to represent specific errors that can occur when retrieving full proposals.
    // - #InvalidDate: Contains a Text value indicating that an invalid date was provided.
    // - #ParticipationsNotSet: Participations have not been set for the user.
    // - #ProposalNotFound: The specified proposal could not be found.
    private type ProposalFullError = {
        #InvalidDate;
        #ParticipationsNotSet;
        #ProposalNotFound;
        #NotAllowedAction;
    };

    // Public type representing the result of a proposal-related operation.
    // - Result<SuccessProposal, ProposalError>:
    //     - SuccessProposal contains the result of a successful proposal operation.
    //     - ProposalError contains one of the predefined errors if the operation fails.
    public type ProposalResult = Result.Result<SuccessProposal, ProposalError>;

    // Public type representing the result of fetching proposals.
    // - Result<SuccessProposal, ProposalFullError>:
    //     - SuccessProposal contains the list of proposals retrieved.
    //     - ProposalFullError contains one of the predefined errors if the retrieval fails.
    public type GetProposalsResult = Result.Result<SuccessProposal, ProposalFullError>;
};
