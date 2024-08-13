import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Map "mo:map/Map";
import { phash } "mo:map/Map";
import UserData "/types";
import UserVal "/validations";
import UserUtils "/utils";

actor Home {

    let users = Map.new<Principal, UserData.User>();

    public shared ({ caller }) func createProfile(user : UserData.UserRequest) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = Map.get(users, phash, caller);

        if (userFound != null) {
            return #err(#UserAlreadyExists);
        };

        let jurisdictions = UserUtils.deleteDuplicateJur(user.jurisdiction);

        let roles = UserUtils.deleteDuplicatedRoles(user.role);

        let newUser : UserData.User = {
            name = user.name;
            role = roles;
            state = #pending;
            jurisdiction = jurisdictions;
            email = user.email;
            phone = user.phone;
            logo = user.logo;
            manager = user.manager;
            tokens = 0;
        };

        Map.set(users, phash, caller, newUser);

        return #ok(#SuccessText("User created successfully"));

    };

    public func getAllProfiles() : async [UserData.User] {
        return Iter.toArray(Map.vals(users));
    };

    public shared ({caller}) func getProfile () : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = Map.get(users, phash, caller);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {
                return #ok(#User(userFound));
            };
        };

    };

    public shared ({ caller }) func changeUserState(state : UserData.State, user : Principal) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userAdmin = Map.get(users, phash, caller);

        switch (userAdmin) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userAdmin) {
                if (not UserUtils.isAdmin(userAdmin.role)) {
                    return #err(#UserNotAuthorized);
                };
                if (not UserUtils.isApproved(userAdmin.state)) {
                    return #err(#UserNotApproved);
                };
            };
        };

        let userFound = Map.get(users, phash, user);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {
                let newuser : UserData.User = {
                    name = userFound.name;
                    role = userFound.role;
                    state = state;
                    jurisdiction = userFound.jurisdiction;
                    email = userFound.email;
                    phone = userFound.phone;
                    logo = userFound.logo;
                    manager = userFound.manager;
                    tokens = userFound.tokens;
                };
                Map.set(users, phash, user, newuser);
            };
        };

        return #ok(#SuccessText("User state changed successfully"));
    };


    ////////////

     public shared ({ caller }) func deletUser(user : Principal) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userAdmin = Map.get(users, phash, caller);

        switch (userAdmin) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userAdmin) {
                if (not UserUtils.isAdmin(userAdmin.role)) {
                    return #err(#UserNotAuthorized);
                };
                if (not UserUtils.isApproved(userAdmin.state)) {
                    return #err(#UserNotApproved);
                };
            };
        };

        let userFound = Map.get(users, phash, user);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {                
                Map.delete(users, phash, user);
            };
        };

        return #ok(#SuccessText("User delete successfully"));
    };




    //////////////

};
