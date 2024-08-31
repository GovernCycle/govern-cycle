import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import { phash } "mo:map/Map";
import UserData "../types/user";
import UserVal "../validations/user";
import UserUtils "../utils/user";
import DB "canister:db";

actor Home {

    public shared ({ caller }) func createProfile(user : UserData.UserRequest) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = await DB.getProfile(caller);

        if (userFound != null) {
            return #err(#UserAlreadyExists);
        };

        let jurisdictions = UserUtils.deleteDuplicateJur(user.jurisdiction);

        let roles = UserUtils.deleteDuplicatedRoles(user.role);

        let newUser : UserData.User = {
            name = user.name;
            role = roles;
            state = #Pending;
            jurisdiction = jurisdictions;
            email = user.email;
            phone = user.phone;
            logo = user.logo;
            manager = user.manager;
        };

        //save user andcreate wallet for user
        await DB.saveProfile(newUser, caller);

        return #ok(#SuccessText("User created successfully"));

    };

    public func getAllProfiles() : async [(Principal, UserData.User)] {
        return await DB.getAllProfiles();
    };

    public shared ({ caller }) func getProfile() : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = await DB.getProfile(caller);

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

        let userAdmin = await DB.getProfile(caller);

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

        let userFound = await DB.getProfile(user);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {
                let newuser : UserData.User = {
                    name = userFound.name;
                    role = userFound.role;
                    state;
                    jurisdiction = userFound.jurisdiction;
                    email = userFound.email;
                    phone = userFound.phone;
                    logo = userFound.logo;
                    manager = userFound.manager;
                };

                await DB.updateProfile(user, newuser);
            };
        };

        return #ok(#SuccessText("User state changed successfully"));
    };

    public shared ({ caller }) func deleteUser(user : Principal) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userAdmin = await DB.getProfile(caller);

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

        let userFound = await DB.getProfile(user);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {
                await DB.deleteProfile(user);
            };
        };

        return #ok(#SuccessText("User delete successfully"));
    };

};
