import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Order "mo:base/Order";
import DateVal "../validations/date";
import ProposalData "../types/proposal";
import DateTime "mo:datetime/DateTime";


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

    public func checkDate(dateTimeText : Text) : async DateVal.DateResult {
        let format = "YYYY-MM-DD:HH:MM";
        let ?dateTime : ?DateTime.DateTime = DateTime.fromText(dateTimeText, format) else return #err(#InvalidDate);
        let order : Order.Order = DateTime.compare(dateTime, DateTime.now());
        return #ok(#Date(order));
    };
};
