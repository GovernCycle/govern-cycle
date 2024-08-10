import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
import Map "mo:map/Map";
import { nhash } "mo:map/Map";
import UserData "/types";
import UserVal "/validations";

actor Home {


    let users = Map.new<Principal, UserData.User>();

    public shared ({caller}) func createProfile (user: UserData.User) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        Map.set(users, nhash, caller, user);

        return #ok("User created successfully");

    };
}
