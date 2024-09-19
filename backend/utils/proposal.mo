import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import ProposalData "../types/proposal";

module {

    public func isInvitedUser(user : Principal, users : [Principal]) : Bool {
        for (u in users.vals()) {
            if (u == user) {
                return true;
            };
        };
        return false;
    };

    public func hasVoted(user : Principal, votes : [ProposalData.Vote]) : Bool {
        for (vote in votes.vals()) {
            if (vote.user == user) {
                return true;
            };
        };
        return false;
    };

    public func getApprovedVotes(votes : [ProposalData.Vote]) : Nat {
        var approvedVotes : Nat = 0;
        for (vote in votes.vals()) {
            if (vote.approved) {
                approvedVotes += 1;
            };
        };
        return approvedVotes;
    };

    public func checkUsersThatNotVoted(users : [Principal], votes : [ProposalData.Vote]) : [Principal] {
        let usersBuffer = Buffer.Buffer<Principal>(1);
        for (user in users.vals()) {
            if (not hasVoted(user, votes)) {
                usersBuffer.add(user);
            };
        };
        return Buffer.toArray(usersBuffer);
    };
};
