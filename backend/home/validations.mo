import Text "mo:base/Text";
import Result "mo:base/Result";

module{

    private type AuthenticationError = {
        #UserNotAuthenticated;
        #UserNotAuthorized;
        #UserNotFound;
        #UserAlreadyExists;
        #UserNotApproved;
    };

    private type SuccessAuthentication  = Text;

    public type AuthenticationResult = Result.Result<SuccessAuthentication, AuthenticationError>;
}