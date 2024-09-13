import Text "mo:base/Text";
import ProposalData "../types/proposal";
import Result "mo:base/Result";

module {

    private type ProposalError = {
        #UserNotAuthenticated;
        #UserNotAuthorized;
        #UserNotFound;
        #NoUsersFound;
        #ProposalNotFound;
        #TokensNotSet;
        #UserAlreadyVoted;
        #UserNotInvited;
        #ProposalAlreadyApproved;
    };

    private type SuccessProposal = {
        #SuccessText : Text.Text;
        #Proposal : ProposalData.Proposal;
    };

    public type ProposalResult = Result.Result<SuccessProposal, ProposalError>;

};
