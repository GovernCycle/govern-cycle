import UserData "../types/user";
import Buffer "mo:base/Buffer";
import Option "mo:base/Option";
import Principal "mo:base/Principal";

module {

    public func deleteDuplicateJur(jurisdictions : [UserData.Jurisdiction]) : [UserData.Jurisdiction] {
        let jurisdictionsBuffer = Buffer.Buffer<UserData.Jurisdiction>(1);
        for (jurisdiction in jurisdictions.vals()) {
            if (jurisdictionsBuffer.size() == 0) {
                jurisdictionsBuffer.add(jurisdiction);
            } else {
                let lastJurisdiction = jurisdictionsBuffer.get(jurisdictionsBuffer.size() - 1);
                if ((lastJurisdiction.continent != jurisdiction.continent) or (lastJurisdiction.country != jurisdiction.country) or (lastJurisdiction.region != jurisdiction.region)) {
                    jurisdictionsBuffer.add(jurisdiction);
                };
            };
        };
        return Buffer.toArray(jurisdictionsBuffer);
    };

    public func matchWithRoleAndJurisdiction(roles : [UserData.Role], jurisdictions : [UserData.Jurisdiction], user : UserData.User) : Bool {
        for (role in roles.vals()) {
            if (checkRole(user.role, role)) {
                for (jurisdiction in jurisdictions.vals()) {
                    if (checkJurisdiction(user.jurisdiction, jurisdiction)) {
                        return true;
                    };
                };
            };
        };
        return false;
    };

    public func deleteDuplicatedRoles(roles : [UserData.Role]) : [UserData.Role] {
        let rolesBuffer = Buffer.Buffer<UserData.Role>(1);
        for (role in roles.vals()) {
            if (rolesBuffer.size() == 0) {
                rolesBuffer.add(role);
            } else {
                let lastRole = rolesBuffer.get(rolesBuffer.size() - 1);
                if (lastRole != role) {
                    rolesBuffer.add(role);
                };
            };
        };
        return Buffer.toArray(rolesBuffer);
    };

    public func isAdmin(roles : [UserData.Role]) : Bool {
        for (role in roles.vals()) {
            if (role == #TechnicalSecretariat) {
                return true;
            };
        };
        return false;
    };

    public func isApproved(state : UserData.State) : Bool {
        return state == #Approved;
    };

    public func isProjectDeveloper(roles : [UserData.Role]) : Bool {
        for (role in roles.vals()) {
            if (role == #ProjectDeveloper) {
                return true;
            };
        };
        return false;
    };

    public func checkRole(roles : [UserData.Role], role : UserData.Role) : Bool {
        for (r in roles.vals()) {
            if (r == role) {
                return true;
            };
        };
        return false;
    };

    public func checkJurisdiction(jurisdictions : [UserData.Jurisdiction], jurisdiction : UserData.Jurisdiction) : Bool {
        for (j in jurisdictions.vals()) {
            if (
                (j.continent == jurisdiction.continent and Option.isSome(jurisdiction.continent)) or
                (j.country == jurisdiction.country and Option.isSome(jurisdiction.country)) or
                (j.region == jurisdiction.region and Option.isSome(jurisdiction.region))
            ) {
                return true;
            };
        };
        return false;
    };

    public func deleteAuthorFromInvitedUsers(author : Principal, invitedUsers : [Principal]) : [Principal] {
        let invitedUsersBuffer = Buffer.Buffer<Principal>(1);
        for (invitedUser in invitedUsers.vals()) {
            if (not Principal.equal(author, invitedUser)) {
                invitedUsersBuffer.add(invitedUser);
            };
        };
        return Buffer.toArray(invitedUsersBuffer);
    };
};
