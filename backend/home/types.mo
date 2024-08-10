import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat32 "mo:base/Nat32";

module {

    private type Role = {
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

    private type State = {
        #pending;
        #approved;
        #rejected;
    };

    private type Jurisdiction = {
        continent: Text;
        country: Text;
        region: Text;
    };

    public type User = {
        name: Text;
        role: [Role];
        state: State;
        jurisdiction: [Jurisdiction];
        email: Text;
        phone: Text;
        logo: Blob;
        manager: ?Text;
        tokens: Nat32;
    };


    
}
