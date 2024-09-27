import Text "mo:base/Text";
import ProposalData "../types/proposal";
import Result "mo:base/Result";

module {

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
       
    };

    private type SuccessProposal = {
        #SuccessText : Text.Text;
        #Proposal : ProposalData.Proposal;
        #FullProposal : [(Nat, ProposalData.Proposal)];
    };

    private type ProposalFullError = {
        #InvalidDate : Text;
        #ParticipationsNotSet;
        #ProposalNotFound;
    };

    public type ProposalResult = Result.Result<SuccessProposal, ProposalError>;

    public type GetProposalsResult = Result.Result<SuccessProposal, ProposalFullError>;

};
