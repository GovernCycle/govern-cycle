import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Map "mo:map/Map";
import { phash } "mo:map/Map";
import UserData "/types";
import UserVal "/validations";

actor Home {

    let users = Map.new<Principal, UserData.User>();

    public shared ({caller}) func createProfile (user: UserData.User) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = Map.get(users, phash, caller);
        Map.set(users, phash, caller, user);

        return #ok("User created successfully");

    };
}
