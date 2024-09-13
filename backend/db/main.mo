import Principal "mo:base/Principal";
import Map "mo:map/Map";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import { phash } "mo:map/Map";
import UserData "../types/user";
import UserUtils "../utils/user";

actor Db {

    let users = Map.new<Principal, UserData.User>();
    let ledger = Map.new<Principal, Int32>();

    public shared func saveProfile(user : UserData.User, caller : Principal) : async () {
        Map.set(users, phash, caller, user);
        let tokens : Int32 = 0;
        Map.set(ledger, phash, caller, tokens);
    };

    public shared func updateProfile(user : Principal, newUser : UserData.User) : async () {
        Map.set(users, phash, user, newUser);
    };

    public shared func getProfile(user : Principal) : async ?UserData.User {
        return Map.get(users, phash, user);
    };

    public shared func getAllProfiles() : async [(Principal, UserData.User)] {
        return Iter.toArray(Map.entries(users));
    };

    public shared func deleteProfile(user : Principal) : async () {
        Map.delete(users, phash, user);
    };

    public shared func findWithRolesAndJurisdiction(roles : [UserData.Role], jurisdictions : [UserData.Jurisdiction]) : async [Principal] {

        let usersBuffer = Buffer.Buffer<Principal>(1);
        for (user in Map.entries(users)) {
            if (UserUtils.matchWithRoleAndJurisdiction(roles, jurisdictions, user.1)) {
                usersBuffer.add(user.0);
            };
        };

        return Buffer.toArray(usersBuffer);
    };

    public shared func getTokens(user : Principal) : async ?Int32 {
        return Map.get(ledger, phash, user);
    };

    public shared func setTokens(user : Principal, tokens : Int32) : async () {
        Map.set(ledger, phash, user, tokens);
    };
};
