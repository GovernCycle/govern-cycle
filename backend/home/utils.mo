import UserData "/types";
import Buffer "mo:base/Buffer";

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
            if (role == #technicalSecretariat) {
                return true;
            };
        };
        return false;
    };

    public func isApproved(state : UserData.State) : Bool {
        return state == #approved;
    };
};
