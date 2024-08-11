import Text "mo:base/Text";
import UserData "/types";
import Result "mo:base/Result";

module{

    private type AuthenticationError = {
        #UserNotAuthenticated;
        #UserNotAuthorized;
        #UserNotFound;
        #UserAlreadyExists;
        #UserNotApproved;
    };

    private type SuccessAuthentication  = {
        #SuccessText: Text.Text;
        #User: UserData.User;
    };

    public type AuthenticationResult = Result.Result<SuccessAuthentication, AuthenticationError>;
}