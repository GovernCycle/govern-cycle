import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat32 "mo:base/Nat32";

module {

    public type Role = {
        #projectDeveloper;
        #community;
        #government;
        #technicalExpert;
        #academy;
        #validator;
        #technicalSecretariat;
        #register;
        #standard;
    };

    public type State = {
        #pending;
        #approved;
        #rejected;
    };

    public type Jurisdiction = {
        continent : Text;
        country : Text;
        region : Text;
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
        tokens : Nat32;
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

};
