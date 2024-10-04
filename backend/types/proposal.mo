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
        location : [UserTypes.Jurisdiction];
        typeProposal: TypeProposal;
        environmentalUnits : Nat;
        startDate : Text;
        deadline : Text;
        state : StateProposal;
        photo : Blob;
        comments : [Comment];
        threshold : Nat;
        description : ?Text;
        invitedRoles: [UserTypes.Role];
        invitedUsers: [Principal];
        votes : [Vote];
        links : [Text];
    };

    public type ProposalRequest = {
        name : Text;
        deadline : Text;
        photo : Blob;
        description : ?Text;
        environmentalUnits : Nat;
        threshold : Nat;
        location : [UserTypes.Jurisdiction];
        invitedRoles: [UserTypes.Role];
        links: [Text];
    };

    public type StateProposal = {
        #Pending;
        #Approved;
        #Rejected;
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