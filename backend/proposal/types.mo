import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import DateTime "mo:datetime/DateTime";
import UserTypes "../home/types"

/* 
    import DateTime "mo:datetime/DateTime";
    let text = "2020-02-01T00:00:00Z;
    let format = "YYYY-MM-DDTHH:mm:ssZ";
    let ?date = DateTime.fromText(text, format) else return #error("Failed to parse datetime");

*/


module {
    public type Proposal = {
        name : Text;
        sections : [Section];
        location : Text;
        enivironUnits : Nat;
        startDate : DateTime;
        deadline : DateTime;
        state : StateProposal;
        photo : Blob;
        coments : [Coment];
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
        invitedUsers : [UserTypes.User];
        votes : [Vote];
        coments : [Coment];
        minimumAccept : Nat;        
    };

    public type Coment = {
        tema : Text;        
        user : UserTypes.User;
        detail : Text;               
    };

    public type Vote = {
        user : UserTypes.User;
        approved : Bool;              
    };
};