import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import UserTypes "../home/types"

module {
    public type Proposal = {
        name : Text;
        sections : [Section];
        location : Text;
        enivironUnits : Nat;
        startDate : Text;
        deadline : Text;
        state : StateProposal;
        photo : Blob;
        comments : [Comment];
        description : ?Text;

    };

    public type ProposalRequest = {
        name : Text;
        sections : [Section];
        location : Text;
        enivironUnits : Nat;
        deadline : Text;
        photo : Blob;
        description : ?Text;
    };

    public type StateProposal = {
        #Pending;
        #Approved;
        #Rejected;
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