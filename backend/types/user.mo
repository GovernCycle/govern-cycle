import Text "mo:base/Text";
import Blob "mo:base/Blob";

module {

    // Enum representing different user roles.
    // #ProjectDeveloper - A user role for project developers.
    // #Community - A user role for community members.
    // #Government - A user role for government representatives.
    // #TechnicalExpert - A user role for technical experts.
    // #Academy - A user role for academic participants.
    // #Validator - A user role for validators of projects or standards.
    // #TechnicalSecretariat - A user role for members of the technical secretariat.
    // #Register - A user role for users managing the registry.
    // #Standard - A user role for standard setters.
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

    // Enum representing the state of a user.
    // #Pending - The user is pending approval.
    // #Approved - The user has been approved.
    // #Rejected - The user has been rejected.
    public type State = {
        #Pending;
        #Approved;
        #Rejected;
    };

    // Type representing a jurisdiction.
    // - continent: The continent where the user is located (optional).
    // - country: The country where the user is located (optional).
    // - region: The region within the country (optional).
    public type Jurisdiction = {
        continent : ?Text;  // Optional continent.
        country : ?Text;    // Optional country.
        region : ?Text;     // Optional region.
    };

    // Type representing a user in the system.
    public type User = {
        name : Text;                            // The name of the user.
        role : [Role];                          // A list of roles assigned to the user.
        state : State;                          // The current state of the user (Pending, Approved, or Rejected).
        jurisdiction : [Jurisdiction];          // A list of jurisdictions associated with the user.
        email : Text;                           // The user's email address.
        phone : Text;                           // The user's phone number.
        logo : Text;                            // A blob representing the user's logo or image.
        manager : ?Text;                        // An optional field for the user's manager name.
    };

    // Type representing a user request, typically used for creating or updating a user.
    public type UserRequest = {
        name : Text;                            // The name of the user.
        role : [Role];                          // A list of roles assigned to the user.
        jurisdiction : [Jurisdiction];          // A list of jurisdictions associated with the user.
        email : Text;                           // The user's email address.
        phone : Text;                           // The user's phone number.
        logo : Text;                            // A blob representing the user's logo or image.
        manager : ?Text;                        // An optional field for the user's manager name.
    };

    // Type representing a user's participation.
    // - active: A list of active participations (represented as Nats).
    // - inactive: A list of inactive participations (represented as Nats).
    // - done: A list of completed participations (represented as Nats).
    public type Participation = {
        active: [Nat];                          // A list of active participations.
        inactive: [Nat];                        // A list of inactive participations.
        done: [Nat];                            // A list of completed participations.
    };
};
