import Principal "mo:base/Principal";
import UserData "../types/user";
import UserVal "../validations/user";
import UserUtils "../utils/user";
import DB "canister:db";

actor Home {

    /// Creates a new user profile.
    ///
    /// This function checks if the caller is authenticated and if the profile already exists.
    /// If the profile does not exist, it will create a new user profile, delete duplicate roles and jurisdictions, and save the new profile.
    ///
    /// Parameters:
    /// - `user`: The user information to create the profile.
    ///
    /// Returns:
    /// - `#err(#UserNotAuthenticated)` if the caller is anonymous.
    /// - `#err(#UserAlreadyExists)` if the user already has a profile.
    /// - `#ok(#SuccessText("User created successfully"))` if the profile was created successfully.
    public shared ({ caller }) func createProfile(user : UserData.UserRequest) : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = await DB.getProfile(caller);

        if (userFound != null) {
            return #err(#UserAlreadyExists);
        };

        let jurisdictions = UserUtils.deleteDuplicateJur(user.jurisdiction);
        let roles = UserUtils.deleteDuplicatedRoles(user.role);
        var initialState : UserData.State = #Pending;

        if (await DB.isWhitelisted(caller)) {
            initialState := #Approved;
        };

        let newUser : UserData.User = {
            name = user.name;
            role = roles;
            jurisdiction = jurisdictions;
            state = initialState;
            email = user.email;
            phone = user.phone;
            logo = user.logo;
            manager = user.manager;
        };

        // Save user and create wallet for the user
        let response = await DB.saveProfile(newUser, caller);

        return response;
    };

    /// Retrieves all profiles from the database.
    ///
    /// Returns:
    /// - A list of tuples containing the Principal identifier and the user data.
    public func getAllProfiles() : async [(Principal, UserData.User)] {
        return await DB.getAllProfiles();
    };

    /// Retrieves the profile of the caller.
    ///
    /// This function checks if the caller is authenticated and retrieves their profile from the database.
    ///
    /// Returns:
    /// - `#err(#UserNotAuthenticated)` if the caller is anonymous.
    /// - `#err(#UserNotFound)` if the profile is not found.
    /// - `#ok(#User(userFound))` if the profile is found.
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

    /// Changes the state of a user profile.
    ///
    /// This function allows an admin to change the state of a user's profile (e.g., active, inactive).
    /// It checks if the caller is an admin and if their profile is approved.
    ///
    /// Parameters:
    /// - `state`: The new state to assign to the user.
    /// - `user`: The Principal identifier of the user whose state is being changed.
    ///
    /// Returns:
    /// - `#err(#UserNotAuthenticated)` if the caller is anonymous.
    /// - `#err(#UserNotFound)` if the user's profile is not found.
    /// - `#err(#UserNotAuthorized)` if the caller is not an admin.
    /// - `#ok(#SuccessText("User state changed successfully"))` if the operation was successful.
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

                let response = await DB.updateProfile(user, newuser);

                return response;
            };
        };
    };

    /// Deletes a user profile.
    ///
    /// This function allows an admin to delete a user's profile. It checks if the caller is an admin and if their profile is approved.
    ///
    /// Parameters:
    /// - `user`: The Principal identifier of the user to delete.
    ///
    /// Returns:
    /// - `#err(#UserNotAuthenticated)` if the caller is anonymous.
    /// - `#err(#UserNotFound)` if the user's profile is not found.
    /// - `#ok(#SuccessText("User deleted successfully"))` if the profile was deleted successfully.
    public shared ({ caller }) func deleteProfile(user : Principal) : async UserVal.AuthenticationResult {
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
                let response = await DB.deleteProfile(user);

                return response;
            };
        };
    };

    /// Retrieves the participations of the caller.
    ///
    /// This function checks if the caller is authenticated and retrieves their participations from the database.
    ///
    /// Returns:
    /// - `#err(#UserNotAuthenticated)` if the caller is anonymous.
    /// - `#err(#UserNotFound)` if no participations are found.
    /// - `#ok(#Participation(participation))` if participations are found.
    public shared ({ caller }) func getMyParticipations() : async UserVal.AuthenticationResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let participation = await DB.getParticipations(caller);

        switch (participation) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?participation) {
                return #ok(#Participation(participation));
            };
        };
    };
};
