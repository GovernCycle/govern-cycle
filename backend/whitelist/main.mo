// Importing necessary modules from the Motoko standard library
import Map "mo:map/Map"; // For using maps to store key-value pairs
import { phash } "mo:map/Map"; // For hashing principals
import Iter "mo:base/Iter"; // For iterating over collections
import Principal "mo:base/Principal"; // For handling user identities
import UserVal "../validations/user"; // Importing user validation module

// Actor for managing a whitelist of user principals
actor WhiteList {
    
    // Initialize a map to store whitelisted principals with their status (true for whitelisted)
    let whitelist = Map.new<Principal, Bool>();

    // A stable variable that holds the initial authors who are automatically whitelisted
    stable var authors : [Text] = [
        "hyagt-lc2eh-ltnc5-laqjt-adpxt-ldez2-ckfcj-bn6e4-iee4f-s76zf-nae"
    ];

    // Automatically adding authors to the whitelist
    // Iterating through the list of authors and adding each as a whitelisted principal
    for (author in authors.vals()) {
        let user = Principal.fromText(author); // Convert author text to Principal type
        Map.set(whitelist, phash, user, true); // Set the principal in the whitelist map with status true
    };

    // Function to add a principal to the whitelist
    // Only callable by authorized users (whitelisted callers)
    public shared ({ caller }) func addWhitelist(principal : Principal) : async UserVal.AuthenticationResult {
        // Check if the caller is whitelisted
        if (await isWhitelisted(caller)) {
            Map.set(whitelist, phash, principal, true); // Add the principal to the whitelist
            return #ok(#SuccessText("User added to whitelist")); // Return success message
        };
        return #err(#UserNotAuthorized); // Return error if the caller is not authorized
    };

    // Function to retrieve all whitelisted principals
    public func getAllWhitelist() : async [Principal] {
        return Iter.toArray(Map.keys(whitelist)); // Return an array of all keys (whitelisted principals)
    };

    // Function to check if a principal is whitelisted
    public func isWhitelisted(principal : Principal) : async Bool {
        return Map.has(whitelist, phash, principal); // Return true if the principal is in the whitelist
    };
};
