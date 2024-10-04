import Principal "mo:base/Principal";
import Map "mo:map/Map";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import { phash } "mo:map/Map";
import UserData "../types/user";
import UserUtils "../utils/user";

actor Db{

    let users = Map.new<Principal, UserData.User>();
    let ledger = Map.new<Principal, UserData.Participation>();

    public shared func saveProfile(user : UserData.User, caller : Principal) : async () {
        Map.set(users, phash, caller, user);
        let initialParticipation: UserData.Participation = {
            active = [];
            inactive = [];
            done = [];
        };
        
        Map.set(ledger, phash, caller, initialParticipation);
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

    public shared func getParticipations(user : Principal) : async ?UserData.Participation {
        return Map.get(ledger, phash, user);
    };

    public shared func setParticipation(user : Principal, participation : UserData.Participation) : async () {
        Map.set(ledger, phash, user, participation);
    };
};
