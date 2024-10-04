import Principal "mo:base/Principal";
import Map "mo:map/Map";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import { phash } "mo:map/Map";
import UserData "../types/user";
import UserUtils "../utils/user";

actor Db {

    // A map to store user profiles with their corresponding Principal as the key.
    let users = Map.new<Principal, UserData.User>();
    
    // A map to store user participation data with Principal as the key.
    let ledger = Map.new<Principal, UserData.Participation>();

    // Public method to save a user's profile.
    // - user: The user data to save.
    // - caller: The Principal of the caller (who is the owner of the profile).
    public shared func saveProfile(user: UserData.User, caller: Principal): async () {
        Map.set(users, phash, caller, user);  // Save the user profile.
        
        // Create an initial empty participation record for the user.
        let initialParticipation: UserData.Participation = {
            active = [];
            inactive = [];
            done = [];
        };
        
        // Save the initial participation data to the ledger.
        Map.set(ledger, phash, caller, initialParticipation);
    };

    // Public method to update an existing user's profile.
    // - user: The Principal of the user whose profile is to be updated.
    // - newUser: The new user data to update the profile with.
    public shared func updateProfile(user: Principal, newUser: UserData.User): async () {
        Map.set(users, phash, user, newUser);  // Update the user's profile.
    };

    // Public method to retrieve a user's profile.
    // - user: The Principal of the user whose profile is requested.
    // Returns: Optionally returns the UserData.User if found.
    public shared func getProfile(user: Principal): async ?UserData.User {
        return Map.get(users, phash, user);  // Fetch the user's profile.
    };

    // Public method to retrieve all user profiles.
    // Returns: An array of tuples with the Principal and the corresponding UserData.User.
    public shared func getAllProfiles(): async [(Principal, UserData.User)] {
        return Iter.toArray(Map.entries(users));  // Return all user profiles.
    };

    // Public method to delete a user's profile.
    // - user: The Principal of the user whose profile is to be deleted.
    public shared func deleteProfile(user: Principal): async () {
        Map.delete(users, phash, user);  // Remove the user's profile.
    };

    // Public method to find users based on their roles and jurisdictions.
    // - roles: A list of roles to match.
    // - jurisdictions: A list of jurisdictions to match.
    // Returns: An array of Principals that match the given roles and jurisdictions.
    public shared func findWithRolesAndJurisdiction(roles: [UserData.Role], jurisdictions: [UserData.Jurisdiction]): async [Principal] {

        let usersBuffer = Buffer.Buffer<Principal>(1);  // Buffer to store matching users.
        
        // Iterate over the users and check if they match the given roles and jurisdictions.
        for (user in Map.entries(users)) {
            if (UserUtils.matchWithRoleAndJurisdiction(roles, jurisdictions, user.1)) {
                usersBuffer.add(user.0);  // Add the matching user's Principal.
            };
        };

        return Buffer.toArray(usersBuffer);  // Return the matched users.
    };

    // Public method to get a user's participation data.
    // - user: The Principal of the user whose participation data is requested.
    // Returns: Optionally returns the UserData.Participation if found.
    public shared func getParticipations(user: Principal): async ?UserData.Participation {
        return Map.get(ledger, phash, user);  // Fetch the user's participation data.
    };

    // Public method to set a user's participation data.
    // - user: The Principal of the user whose participation data is to be updated.
    // - participation: The new participation data to set.
    public shared func setParticipation(user: Principal, participation: UserData.Participation): async () {
        Map.set(ledger, phash, user, participation);  // Update the user's participation data.
    };
};
