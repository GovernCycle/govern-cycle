import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import UserTypes "../types/user";

module {

    public type TypeProposal = {
        #Project;
        #Standard;
    };

    public type Proposal = {
        author: Principal;
        name : Text;
        sections : [Section];
        location : Text;
        typeProposal: TypeProposal;
        environUnits : Nat;
        startDate : Text;
        deadline : Text;
        state : StateProposal;
        photo : Blob;
        comments : [Comment];
        description : ?Text;

    };

    public type ProposalRequest = {
        name : Text;
        location : Text;
        environUnits : Nat;
        deadline : Text;
        photo : Blob;
        description : ?Text;
    };

    public type StateProposal = {
        #Pending;
        #Approved;
        #Rejected;
    };

    public type SectionRequest = {
        name : Text;
        invitedRoles : [UserTypes.Role];
        minimumAccept : Nat;
    };

    public type Section = {
        name : Text;
        invitedRoles : [UserTypes.Role];
        invitedUsers : [Principal];
        votes : [Vote];
        comments : [Comment];
        minimumAccept : Nat;        
    };

    public type Comment = {
        tema : Text;        
        user : Principal;
        detail : Text;               
    };

    public type Vote = {
        user :  Principal;
        approved : Bool;              
    };
};