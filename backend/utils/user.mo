import UserData "../types/user";
import Buffer "mo:base/Buffer";
import Option "mo:base/Option";
import Principal "mo:base/Principal";

module {

    // Function to remove duplicate jurisdictions from a list.
    // - jurisdictions: A list of UserData.Jurisdiction.
    // Returns: A new list of jurisdictions with duplicates removed.
    public func deleteDuplicateJur(jurisdictions: [UserData.Jurisdiction]): [UserData.Jurisdiction] {
        let jurisdictionsBuffer = Buffer.Buffer<UserData.Jurisdiction>(1); // Buffer to store unique jurisdictions.
        for (jurisdiction in jurisdictions.vals()) {  // Loop through each jurisdiction.
            if (jurisdictionsBuffer.size() == 0) {    // If the buffer is empty, add the first jurisdiction.
                jurisdictionsBuffer.add(jurisdiction);
            } else {
                let lastJurisdiction = jurisdictionsBuffer.get(jurisdictionsBuffer.size() - 1);  // Get the last jurisdiction added.
                // Compare the last added jurisdiction with the current one.
                if ((lastJurisdiction.continent != jurisdiction.continent) or 
                    (lastJurisdiction.country != jurisdiction.country) or 
                    (lastJurisdiction.region != jurisdiction.region)) {
                    jurisdictionsBuffer.add(jurisdiction);  // Add if they are different.
                };
            };
        };
        return Buffer.toArray(jurisdictionsBuffer);  // Return the buffer as an array.
    };

    // Function to check if a user matches the given roles and jurisdictions.
    // - roles: A list of UserData.Role to check against.
    // - jurisdictions: A list of UserData.Jurisdiction to check against.
    // - user: The user whose roles and jurisdictions are being checked.
    // Returns: True if the user has a matching role and jurisdiction, otherwise false.
    public func matchWithRoleAndJurisdiction(roles: [UserData.Role], jurisdictions: [UserData.Jurisdiction], user: UserData.User): Bool {
        for (role in roles.vals()) {  // Loop through the given roles.
            if (checkRole(user.role, role)) {  // Check if the user's roles match the given role.
                for (jurisdiction in jurisdictions.vals()) {  // Loop through the given jurisdictions.
                    if (checkJurisdiction(user.jurisdiction, jurisdiction)) {  // Check if the user's jurisdiction matches.
                        return true;
                    };
                };
            };
        };
        return false;  // Return false if no match is found.
    };

    // Function to remove duplicate roles from a list.
    // - roles: A list of UserData.Role.
    // Returns: A new list of roles with duplicates removed.
    public func deleteDuplicatedRoles(roles: [UserData.Role]): [UserData.Role] {
        let rolesBuffer = Buffer.Buffer<UserData.Role>(1);  // Buffer to store unique roles.
        for (role in roles.vals()) {  // Loop through the roles.
            if (rolesBuffer.size() == 0) {  // If the buffer is empty, add the first role.
                rolesBuffer.add(role);
            } else {
                let lastRole = rolesBuffer.get(rolesBuffer.size() - 1);  // Get the last role added.
                if (lastRole != role) {  // Add the role if it's different from the last one.
                    rolesBuffer.add(role);
                };
            };
        };
        return Buffer.toArray(rolesBuffer);  // Return the buffer as an array.
    };

    // Function to check if a user is an admin.
    // - roles: A list of UserData.Role.
    // Returns: True if the user has the #TechnicalSecretariat role, otherwise false.
    public func isAdmin(roles: [UserData.Role]): Bool {
        for (role in roles.vals()) {  // Loop through the roles.
            if (role == #TechnicalSecretariat) {  // Check if the role is #TechnicalSecretariat.
                return true;
            };
        };
        return false;  // Return false if the role is not found.
    };

    // Function to check if a user's state is approved.
    // - state: The UserData.State to check.
    // Returns: True if the user's state is #Approved, otherwise false.
    public func isApproved(state: UserData.State): Bool {
        return state == #Approved;
    };

    // Function to check if a user is a project developer.
    // - roles: A list of UserData.Role.
    // Returns: True if the user has the #ProjectDeveloper role, otherwise false.
    public func isProjectDeveloper(roles: [UserData.Role]): Bool {
        for (role in roles.vals()) {  // Loop through the roles.
            if (role == #ProjectDeveloper) {  // Check if the role is #ProjectDeveloper.
                return true;
            };
        };
        return false;  // Return false if the role is not found.
    };

    // Helper function to check if a user has a specific role.
    // - roles: A list of UserData.Role.
    // - role: The role to check for.
    // Returns: True if the user has the specified role, otherwise false.
    public func checkRole(roles: [UserData.Role], role: UserData.Role): Bool {
        for (r in roles.vals()) {  // Loop through the roles.
            if (r == role) {  // If a matching role is found, return true.
                return true;
            };
        };
        return false;  // Return false if the role is not found.
    };

    // Helper function to check if a user is from a specific jurisdiction.
    // - jurisdictions: A list of UserData.Jurisdiction.
    // - jurisdiction: The jurisdiction to check for.
    // Returns: True if the user's jurisdiction matches the specified one, otherwise false.
    public func checkJurisdiction(jurisdictions: [UserData.Jurisdiction], jurisdiction: UserData.Jurisdiction): Bool {
        for (j in jurisdictions.vals()) {  // Loop through the jurisdictions.
            if (
                (j.continent == jurisdiction.continent and Option.isSome(jurisdiction.continent)) or
                (j.country == jurisdiction.country and Option.isSome(jurisdiction.country)) or
                (j.region == jurisdiction.region and Option.isSome(jurisdiction.region))
            ) {
                return true;  // Return true if the jurisdiction matches.
            };
        };
        return false;  // Return false if no match is found.
    };

    // Function to remove the author from the list of invited users.
    // - author: The Principal of the author.
    // - invitedUsers: A list of Principals representing the invited users.
    // Returns: A new list of invited users excluding the author.
    public func deleteAuthorFromInvitedUsers(author: Principal, invitedUsers: [Principal]): [Principal] {
        let invitedUsersBuffer = Buffer.Buffer<Principal>(1);  // Buffer to store invited users excluding the author.
        for (invitedUser in invitedUsers.vals()) {  // Loop through the invited users.
            if (not Principal.equal(author, invitedUser)) {  // If the invited user is not the author, add to the buffer.
                invitedUsersBuffer.add(invitedUser);
            };
        };
        return Buffer.toArray(invitedUsersBuffer);  // Return the buffer as an array.
    };
};
