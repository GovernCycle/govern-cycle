import Map "mo:map/Map";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import ProposalData "../types/proposal";
import Array "mo:base/Array";
import { nhash } "mo:map/Map";
import DateTime "mo:datetime/DateTime";
import ProposalVal "../validations/proposal";
import UserUtils "../utils/user";
import ProposalUtils "../utils/proposal";
import DB "canister:db";

actor Proposal {

    stable var nextProposalId : Nat = 0;
    let proposals = Map.new<Nat, ProposalData.Proposal>();

    public shared ({ caller }) func createProposal(proposal : ProposalData.ProposalRequest) : async ProposalVal.ProposalResult {

        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = await DB.getProfile(caller);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {
                if (not UserUtils.isProjectDeveloper(userFound.role)) {
                    return #err(#UserNotAuthorized);
                };

                if (not UserUtils.isApproved(userFound.state)) {
                    return #err(#UserNotAuthorized);
                };
            };
        };

        //search roles and jurisdictions that match with the users invited
        var invitedUsers = await DB.findWithRolesAndJurisdiction(proposal.invitedRoles, proposal.location);

        //check if invited users are not empty
        if (Array.size(invitedUsers) == 0) {
            return #err(#NoUsersFound);
        };
        //remove the user that is creating the proposal
        invitedUsers := UserUtils.deleteAuthorFromInvitedUsers(caller, invitedUsers);

        nextProposalId += 1;
        let startDate : Text = DateTime.toText(DateTime.now());
        let newProposal : ProposalData.Proposal = {
            author = caller;
            name = proposal.name;
            location = proposal.location;
            typeProposal = #Project;
            environmentalUnits = proposal.environmentalUnits;
            startDate;
            deadline = proposal.deadline;
            state = #Pending;
            photo = proposal.photo;
            threshold = proposal.threshold;
            comments = [];
            votes = [];
            description = proposal.description;
            invitedUsers;
            invitedRoles = proposal.invitedRoles;
        };

        Map.set(proposals, nhash, nextProposalId, newProposal);

        //add tokens to invited users
        let areTokensSet = await setTokens(invitedUsers, 1);
        if (not areTokensSet) {
            return #err(#TokensNotSet);
        };

        return #ok(#SuccessText("Proposal created successfully"));
    };

    public shared ({ caller }) func vote(decition : Bool, proposalId : Nat) : async ProposalVal.ProposalResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = await DB.getProfile(caller);

        switch (userFound) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userFound) {
                if (not UserUtils.isApproved(userFound.state)) {
                    return #err(#UserNotAuthorized);
                };
            };
        };

        let proposal = Map.get(proposals, nhash, proposalId);

        switch (proposal) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposal) {

                //check if the user is invited to vote
                if (not ProposalUtils.isInvitedUser(caller, proposal.invitedUsers)) {
                    return #err(#UserNotInvited);
                };

                //check if the user has already voted
                if (ProposalUtils.hasVoted(caller, proposal.votes)) {
                    return #err(#UserAlreadyVoted);
                };

                //verify if proposal is already approved
                if (proposal.state == #Approved) {
                    return #err(#ProposalAlreadyApproved);
                };

                //add the vote to the proposal
                let userVote : ProposalData.Vote = {
                    user = caller;
                    approved = decition;
                };
                var currentVotes = Buffer.fromArray<ProposalData.Vote>(proposal.votes);
                currentVotes.add(userVote);
                let currentVotesArray = Buffer.toArray<ProposalData.Vote>(currentVotes);

                //check if the proposal has reached the threshold
                var newState = proposal.state;
                if (proposal.threshold <= ProposalUtils.getApprovedVotes(currentVotesArray)) {
                    newState := #Approved;
                    //remove tokens from invited users that have not voted
                    let usersThatNotVoted = ProposalUtils.checkUsersThatNotVoted(proposal.invitedUsers, currentVotesArray);
                    let areTokensSet = await setTokens(usersThatNotVoted, -1);
                    if (not areTokensSet) {
                        return #err(#TokensNotSet);
                    };
                };

                let newProposal : ProposalData.Proposal = {
                    author = proposal.author;
                    name = proposal.name;
                    location = proposal.location;
                    typeProposal = proposal.typeProposal;
                    environmentalUnits = proposal.environmentalUnits;
                    startDate = proposal.startDate;
                    deadline = proposal.deadline;
                    state = newState;
                    photo = proposal.photo;
                    threshold = proposal.threshold;
                    comments = proposal.comments;
                    votes = currentVotesArray;
                    description = proposal.description;
                    invitedUsers = proposal.invitedUsers;
                    invitedRoles = proposal.invitedRoles;
                };
                //update the proposal
                Map.set(proposals, nhash, proposalId, newProposal);

                //remove tokens from the user
                let areTokensSet = await setTokens([caller], -1);
                if (not areTokensSet) {
                    return #err(#TokensNotSet);
                };
            };
        };

        return #ok(#SuccessText("Vote added successfully"));
    };

    public func getAllProposals() : async [(Nat, ProposalData.Proposal)] {
        return Iter.toArray(Map.entries(proposals));
    };

    private func setTokens(users : [Principal], amount : Int32) : async Bool {
        for (user in users.vals()) {
            var wallet = await DB.getTokens(user);
            switch (wallet) {
                case (null) {
                    return false;
                };
                case (?wallet) {
                    await DB.setTokens(user, wallet + amount);
                };
            };
        };
        return true;
    };
};
