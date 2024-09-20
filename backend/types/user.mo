import Text "mo:base/Text";
import Blob "mo:base/Blob";

module {

    public type Role = {
        #ProjectDeveloper;
        #Community;
        #Government;
        #TechnicalExpert;
        #Academy;
        #Validator;
        #TechnicalSecretariat;
        #Register;
        #Standard;
    };

    public type State = {
        #Pending;
        #Approved;
        #Rejected;
    };

    public type Jurisdiction = {
        continent : ?Text;
        country : ?Text;
        region : ?Text;
    };

    public type User = {
        name : Text;
        role : [Role];
        state : State;
        jurisdiction : [Jurisdiction];
        email : Text;
        phone : Text;
        logo : Blob;
        manager : ?Text;
    };

    public type UserRequest = {
        name : Text;
        role : [Role];
        jurisdiction : [Jurisdiction];
        email : Text;
        phone : Text;
        logo : Blob;
        manager : ?Text;
    };

    public type Participation = {
        active: [Nat];
        inactive: [Nat];
        done: [Nat];
    }

};
