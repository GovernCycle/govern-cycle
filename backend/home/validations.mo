import Text "mo:base/Text";
import Result "mo:base/Result";

module{

    private type AuthenticationError = {
        #UserNotAuthenticated;
        #UserNotAuthorized;
        #UserNotFound;
        #UserAlreadyExists;
    };

    private type SuccessAuthentication  = Text;

    public type AuthenticationResult = Result.Result<SuccessAuthentication, AuthenticationError>;
}