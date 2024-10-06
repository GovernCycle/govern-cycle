import Principal "mo:base/Principal";
import Map "mo:map/Map";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import { phash } "mo:map/Map";
import { nhash } "mo:map/Map";
import UserData "../types/user";
import ProposalData "../types/proposal";
import ProposalVal "../validations/proposal";
import UserUtils "../utils/user";
import UserVal "../validations/user";
import Constants "../utils/constants";

actor Db {

    // Initialize a map to store whitelisted principals with their status (true for whitelisted)
    let whitelist = Map.new<Principal, Bool>();

    // A stable variable that holds the initial authors who are automatically whitelisted
    stable var initialAuthor : Text = "hyagt-lc2eh-ltnc5-laqjt-adpxt-ldez2-ckfcj-bn6e4-iee4f-s76zf-nae";

    // Add initial author to the whitelist
    Map.set(whitelist, phash, Principal.fromText(initialAuthor), true);

    // A map to store user profiles with their corresponding Principal as the key.
    let users = Map.new<Principal, UserData.User>();

    // A map to store user participation data with Principal as the key.
    let ledger = Map.new<Principal, UserData.Participation>();

    // Global variable to track the next proposal ID
    stable var nextProposalId : Nat = 0;

    // Map to store proposals, using proposal ID as key
    let proposals = Map.new<Nat, ProposalData.Proposal>();

    // Function to add a principal to the whitelist
    // Only callable by authorized users (whitelisted callers)
    public shared ({ caller }) func addWhitelist(principal : Principal) : async UserVal.AuthenticationResult {
        // Check if the caller is whitelisted
        if (await isWhitelisted(caller)) {
            if (await isWhitelisted(principal)) {
                return #err(#UserAlreadyExists); // Return error if the principal is already whitelisted
            };
            Map.set(whitelist, phash, principal, true); // Add the principal to the whitelist
            return #ok(#SuccessText("User added to whitelist")); // Return success message
        };
        return #err(#UserNotAuthorized); // Return error if the caller is not authorized
    };

    // Function to retrieve all whitelisted principals
    public shared ({ caller }) func getAllWhitelist() : async UserVal.AuthenticationResult {

        // Check if the caller is whitelisted
        if (await isWhitelisted(caller)) {
            return #ok(#WhiteListed(Iter.toArray(Map.keys(whitelist)))); // Return an array of all keys (whitelisted principals)
        };
        return #err(#UserNotAuthorized); // Return error if the caller is not authorized
    };

    // Function to check if a principal is whitelisted
    public func isWhitelisted(principal : Principal) : async Bool {
        return Map.has(whitelist, phash, principal); // Return true if the principal is in the whitelist
    };

    // Public method to save a user's profile.
    // - user: The user data to save.
    // - caller: The Principal of the caller (who is the owner of the profile).
    public shared ({ caller }) func saveProfile(user : UserData.User, id : Principal) : async UserVal.AuthenticationResult {

        //Check is allowed action
        if (not isAllowedAction(caller)) {
            return #err(#NotAllowedAction);
        };
        // Add the user to the database.
        Map.set(users, phash, id, user);

        // Create an initial empty participation record for the user.
        let initialParticipation : UserData.Participation = {
            active = [];
            inactive = [];
            done = [];
        };

        // Save the initial participation data to the ledger.
        Map.set(ledger, phash, id, initialParticipation);

        return #ok(#SuccessText("User created successfully"));

    };

    // Public method to update an existing user's profile.
    // - user: The Principal of the user whose profile is to be updated.
    // - newUser: The new user data to update the profile with.
    public shared ({ caller }) func updateProfile(user : Principal, newUser : UserData.User) : async UserVal.AuthenticationResult {

        //check if is allowed action
        if (not isAllowedAction(caller)) {
            return #err(#NotAllowedAction);
        };

        Map.set(users, phash, user, newUser); // Update the user's profile.

        return #ok(#SuccessText("User profile updated successfully"));

    };

    // Public method to retrieve a user's profile.
    // - user: The Principal of the user whose profile is requested.
    // Returns: Optionally returns the UserData.User if found.
    public shared func getProfile(user : Principal) : async ?UserData.User {

        return Map.get(users, phash, user); // Fetch the user's profile.

    };

    // Public method to retrieve all user profiles.
    // Returns: An array of tuples with the Principal and the corresponding UserData.User.
    public shared func getAllProfiles() : async [(Principal, UserData.User)] {
        return Iter.toArray(Map.entries(users)); // Return all user profiles.
    };

    // Public method to delete a user's profile.
    // - user: The Principal of the user whose profile is to be deleted.
    public shared ({ caller }) func deleteProfile(user : Principal) : async UserVal.AuthenticationResult {

        // Check if the caller is allowed to perform this action.
        if (not isAllowedAction(caller)) {
            return #err(#NotAllowedAction);
        };

        Map.delete(users, phash, user); // Remove the user's profile.

        return #ok(#SuccessText("User profile deleted successfully"));
    };

    // Public method to find users based on their roles and jurisdictions.
    // - roles: A list of roles to match.
    // - jurisdictions: A list of jurisdictions to match.
    // Returns: An array of Principals that match the given roles and jurisdictions.
    public shared func findWithRolesAndJurisdiction(roles : [UserData.Role], jurisdictions : [UserData.Jurisdiction]) : async [Principal] {
        let usersBuffer = Buffer.Buffer<Principal>(1); // Buffer to store matching users.

        // Iterate over the users and check if they match the given roles and jurisdictions.
        for (user in Map.entries(users)) {
            if (UserUtils.matchWithRoleAndJurisdiction(roles, jurisdictions, user.1)) {
                usersBuffer.add(user.0); // Add the matching user's Principal.
            };
        };

        return Buffer.toArray(usersBuffer); // Return the matched users.
    };

    // Public method to get a user's participation data.
    // - user: The Principal of the user whose participation data is requested.
    // Returns: Optionally returns the UserData.Participation if found.
    public shared func getParticipations(user : Principal) : async ?UserData.Participation {
        return Map.get(ledger, phash, user); // Fetch the user's participation data.
    };

    // Public method to set a user's participation data.
    // - user: The Principal of the user whose participation data is to be updated.
    // - participation: The new participation data to set.
    public shared func setParticipation(user : Principal, participation : UserData.Participation) : async () {

        Map.set(ledger, phash, user, participation); // Update the user's participation data.

    };

    public shared ({ caller }) func saveProposal(newProposal : ProposalData.Proposal) : async ProposalVal.ProposalResult {

        // check if the caller is allowed to perform this action
        if (not isAllowedAction(caller)) {
            return #err(#NotAllowedAction);
        };

        // Increment the proposal ID for the next proposal
        nextProposalId += 1;
        Map.set(proposals, nhash, nextProposalId, newProposal);

        // Return the success message
        return #ok(#SuccessText("Proposal created successfully"));
    };

    public shared func updateProposal(proposalId : Nat, newProposal : ProposalData.Proposal) : async () {

        Map.set(proposals, nhash, proposalId, newProposal);

    };

    public shared ({ caller }) func deleteProposal(proposalId : Nat) : async ProposalVal.ProposalResult {

        // check if the caller is allowed to perform this action
        if (not isAllowedAction(caller)) {
            return #err(#NotAllowedAction);
        };

        Map.delete(proposals, nhash, proposalId);

        return #ok(#SuccessText("Proposal deleted successfully"));

    };

    public shared func getProposal(proposalId : Nat) : async ?ProposalData.Proposal {
        return Map.get(proposals, nhash, proposalId);
    };

    public shared func getAllProposals() : async [(Nat, ProposalData.Proposal)] {
        return Iter.toArray(Map.entries(proposals));
    };

    public shared func getProposalKeys() : async [Nat] {
        return Iter.toArray(Map.keys(proposals));
    };

    public shared func getNextProposalId() : async Nat {
        return nextProposalId;
    };



    private func isAllowedAction(caller : Principal) : Bool {
        if (
            Principal.equal(Constants.getHomeId(), caller) or Principal.equal(Constants.getProposalId(), caller)
        ) {
            return true;
        };
        return false;
    };
};
