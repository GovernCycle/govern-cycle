import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import ProposalData "../types/proposal";
import DateTime "mo:datetime/DateTime";
import Order "mo:base/Order";

module {

    // Function to check if a user is part of the invited users list.
    // - user: The Principal of the user to check.
    // - users: The list of Principals representing the invited users.
    // Returns: True if the user is in the list of invited users, otherwise false.
    public func isInvitedUser(user : Principal, users : [Principal]) : Bool {
        for (u in users.vals()) {
            // Loop through the list of invited users.
            if (u == user) {
                // If the user is found in the list, return true.
                return true;
            };
        };
        return false; // If the user is not found, return false.
    };

    // Function to check if a user has already voted.
    // - user: The Principal of the user to check.
    // - votes: The list of votes that have been cast.
    // Returns: True if the user has already voted, otherwise false.
    public func hasVoted(user : Principal, votes : [ProposalData.Vote]) : Bool {
        for (vote in votes.vals()) {
            // Loop through the list of votes.
            if (vote.user == user) {
                // If the user is found in the votes list, return true.
                return true;
            };
        };
        return false; // If the user has not voted, return false.
    };

    // Function to count the number of approved votes.
    // - votes: The list of votes to check.
    // Returns: The number of votes that are marked as approved.
    public func getApprovedVotes(votes : [ProposalData.Vote]) : Nat {
        var approvedVotes : Nat = 0; // Initialize the count of approved votes.
        for (vote in votes.vals()) {
            // Loop through the votes.
            if (vote.approved) {
                // If the vote is approved, increment the count.
                approvedVotes += 1;
            };
        };
        return approvedVotes; // Return the total count of approved votes.
    };

    // Function to get a list of users who have not voted yet.
    // - users: The list of all invited users.
    // - votes: The list of votes that have been cast.
    // Returns: A list of users (Principals) who have not yet voted.
    public func checkUsersThatNotVoted(users : [Principal], votes : [ProposalData.Vote]) : [Principal] {
        let usersBuffer = Buffer.Buffer<Principal>(1); // Buffer to store users who have not voted.
        for (user in users.vals()) {
            // Loop through the invited users.
            if (not hasVoted(user, votes)) {
                // If the user has not voted, add them to the buffer.
                usersBuffer.add(user);
            };
        };
        return Buffer.toArray(usersBuffer); // Return the list of users who have not voted.
    };

    /// This function checks if a proposal's deadline has already passed.
    /// It takes a date string as input, validates its format, and compares it with the current date.
    /// in_datatime The deadline of the proposal in "YYYY-MM-DD:HH:MM" format.
    /// Returns `true` if the deadline is in the past, and `false` otherwise.
    public func checkDate(in_datatime : Text) : Bool {
        // Define the expected date format
        let format = "YYYY-MM-DD:HH:MM";

        // Attempt to parse the date using the expected format
        // If the parsing fails, the deadline is considered invalid and returns true
        let ?dateTime : ?DateTime.DateTime = DateTime.fromText(in_datatime, format) else return true;

        // Compare the proposal's deadline with the current date
        let order : Order.Order = DateTime.compare(dateTime, DateTime.now());

        // If the deadline is in the past, return true
        if (order == #less) {
            return true;
        } else {
            return false;
        };
    };

};
