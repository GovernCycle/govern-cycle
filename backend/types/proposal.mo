import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import UserTypes "../types/user";

module {

    // Type that represents the kind of proposal.
    // #Project - Represents a project proposal.
    // #Standard - Represents a standard proposal.
    public type TypeProposal = {
        #Project;
        #Standard;
    };

    // Type that represents a full proposal with all associated data.
    public type Proposal = {
        author: Principal;                      // The Principal of the user who authored the proposal.
        name : Text;                            // The name/title of the proposal.
        location : [UserTypes.Jurisdiction];    // A list of jurisdictions where the proposal is applicable.
        typeProposal: TypeProposal;             // The type of the proposal (Project or Standard).
        environmentalUnits : Nat;               // The number of environmental units involved in the proposal.
        startDate : Text;                       // The start date of the proposal (as Text).
        deadline : Text;                        // The deadline for the proposal (as Text).
        state : StateProposal;                  // The current state of the proposal (Pending, Approved, or Rejected).
        photo : Text;                           // A blob representing the photo/image associated with the proposal.
        comments : [Comment];                   // A list of comments made on the proposal.
        threshold : Nat;                        // The minimum threshold required for the proposal (e.g., for approval).
        description : ?Text;                    // An optional description of the proposal.
        invitedRoles: [UserTypes.Role];         // A list of roles invited to participate in the proposal.
        invitedUsers: [Principal];              // A list of specific users invited to participate.
        votes : [Vote];                         // A list of votes that have been cast on the proposal.
        links : [Link];                         // A list of relevant links (as Text).
    };

    public type Link = {
        url: Text;
        description: Text;
    };

    // Type used to request a proposal, typically for creating or editing.
    public type ProposalRequest = {
        name : Text;                            // The name/title of the proposal.
        deadline : Text;                        // The deadline for the proposal (as Text).
        photo : Text;                           // A photo associated with the proposal (as a Blob).
        description : ?Text;                    // An optional description for the proposal.
        environmentalUnits : Nat;               // The number of environmental units involved.
        threshold : Nat;                        // The threshold required for the proposal.
        location : [UserTypes.Jurisdiction];    // A list of jurisdictions for the proposal.
        invitedRoles: [UserTypes.Role];         // A list of roles invited to participate.
        links: [Link];                          // A list of relevant links for the proposal.
    };

    // Enum representing the state of the proposal.
    // #Pending - The proposal is pending and awaiting review or votes.
    // #Approved - The proposal has been approved.
    // #Rejected - The proposal has been rejected.
    public type StateProposal = {
        #Pending;
        #Approved;
        #Rejected;
    };

    // Type representing a comment made on a proposal.
    public type Comment = {
        tema : Text;                            // The subject/topic of the comment.
        user : Principal;                       // The Principal of the user who made the comment.
        detail : Text;                          // The content/detail of the comment.
    };

    // Type representing a vote cast on a proposal.
    public type Vote = {
        user : Principal;                       // The Principal of the user who cast the vote.
        approved : Bool;                        // Boolean indicating whether the user approved the proposal (true) or not (false).
    };
};
