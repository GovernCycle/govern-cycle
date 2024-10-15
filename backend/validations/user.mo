import Text "mo:base/Text";
import UserData "../types/user";
import Result "mo:base/Result";

module {

    // Private type to represent errors that can occur during the authentication process.
    // - #UserNotAuthenticated: The user is not authenticated.
    // - #UserNotAuthorized: The user does not have the necessary authorization to perform the action.
    // - #UserNotFound: The user could not be found.
    // - #UserAlreadyExists: The user already exists in the system.
    // - #UserNotApproved: The user’s account is not approved.
    private type AuthenticationError = {
        #UserNotAuthenticated;
        #NotAllowedAction;
        #UserNotAuthorized;
        #UserNotFound;
        #UserAlreadyExists;
        #UserNotApproved;
    };

    // Private type to represent a successful authentication response.
    // - #SuccessText: Contains a success message as Text.
    // - #User: Contains the authenticated user’s details (UserData.User).
    // - #Participation: Contains the user’s participation data (UserData.Participation).
    private type SuccessAuthentication = {
        #SuccessText: Text.Text;
        #User: UserData.User;
        #Participation: UserData.Participation;
        #WhiteListed: [Principal];
    };

    // Public type that represents the result of an authentication operation.
    // - Result<SuccessAuthentication, AuthenticationError>:
    //     - SuccessAuthentication contains the result of a successful authentication process.
    //     - AuthenticationError contains one of the predefined errors if the authentication fails.
    public type AuthenticationResult = Result.Result<SuccessAuthentication, AuthenticationError>;
}
