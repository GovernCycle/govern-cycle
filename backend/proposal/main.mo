import Map "mo:map/Map";
import Nat "mo:base/Nat";
import Order "mo:base/Order";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import ProposalData "../types/proposal";
import { nhash } "mo:map/Map";
import DateTime "mo:datetime/DateTime";
import ProposalVal "../validations/proposal";
import UserData "../types/user";
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

        //add the proposal to the active participations of the invited users
        let areParticipationsSet = await addActiveParticipation(invitedUsers, nextProposalId);
        if (not areParticipationsSet) {
            return #err(#ParticipationsNotSet);
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
        //search the proposal
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

                    //add the proposal to the inactive participations of the invited users that did not vote
                    let usersThatNotVoted = ProposalUtils.checkUsersThatNotVoted(proposal.invitedUsers, currentVotesArray);
                    let areParticipationsSet = await changeFromActiveToInactive(usersThatNotVoted, proposalId);
                    if (not areParticipationsSet) {
                        return #err(#ParticipationsNotSet);
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

                //
                let isParticipationsSet = await changeFromAciveToDone(caller, proposalId);
                if (not isParticipationsSet) {
                    return #err(#ParticipationsNotSet);
                };
            };
        };

        return #ok(#SuccessText("Vote added successfully"));
    };

    public func getAllProposals() : async ProposalVal.GetProposalsResult {
        for (p in Map.entries(proposals)) {
            let proposal = p.1;
            if (proposal.state == #Pending) {
                let dateResult = await ProposalUtils.checkDate(proposal.deadline);
                switch (dateResult) {
                    case (#ok(#Date(dateOrder))) {
                        if (Order.isLess(dateOrder)) {
                            let newProposal : ProposalData.Proposal = {
                                author = proposal.author;
                                name = proposal.name;
                                location = proposal.location;
                                typeProposal = proposal.typeProposal;
                                environmentalUnits = proposal.environmentalUnits;
                                startDate = proposal.startDate;
                                deadline = proposal.deadline;
                                state = #Rejected;
                                photo = proposal.photo;
                                threshold = proposal.threshold;
                                comments = proposal.comments;
                                votes = proposal.votes;
                                description = proposal.description;
                                invitedUsers = proposal.invitedUsers;
                                invitedRoles = proposal.invitedRoles;
                            };

                            //add the proposal to the inactive participations of the invited
                            let areParticipationsSet = await changeFromActiveToInactive(proposal.invitedUsers, p.0);
                            if (not areParticipationsSet) {
                                return #err(#ParticipationsNotSet);
                            };

                            Map.set(proposals, nhash, p.0, newProposal);
                        };
                    };
                    case (#err(#InvalidDate)) {
                        return #err(#InvalidDate("Invalid date"));
                    };
                };
            };
        };
        return #ok(#FullProposal(Iter.toArray(Map.entries(proposals))));
    };

    public shared ({ caller }) func deleteProposal(idProposal : Nat) : async ProposalVal.ProposalResult {
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

        let proposalFound = Map.get(proposals, nhash, idProposal);

        switch (proposalFound) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposalFound) {
                Map.delete(proposals, nhash, idProposal);
            };
        };

        return #ok(#SuccessText("Proposal deleted successfully"));
    };

    private func addActiveParticipation(users : [Principal], proposalId : Nat) : async Bool {
        for (user in users.vals()) {
            var participations = await DB.getParticipations(user);
            switch (participations) {
                case (null) {
                    return false;
                };
                case (?participations) {
                    var active = Buffer.fromArray<Nat>(participations.active);
                    active.add(proposalId);
                    let activeArray = Buffer.toArray<Nat>(active);
                    let newParticipations : UserData.Participation = {
                        active = activeArray;
                        inactive = participations.inactive;
                        done = participations.done;
                    };
                    await DB.setParticipation(user, newParticipations);
                };
            };
        };
        return true;
    };

    private func changeFromActiveToInactive(users : [Principal], proposalId : Nat) : async Bool {
        for (user in users.vals()) {
            var participations = await DB.getParticipations(user);
            switch (participations) {
                case (null) {
                    return false;
                };
                case (?participations) {
                    let activeIndex = Array.indexOf<Nat>(proposalId, participations.active, Nat.equal);
                    switch (activeIndex) {
                        case (null) {
                            return false;
                        };
                        case (?activeIndex) {
                            var active = Buffer.fromArray<Nat>(participations.active);
                            let removedId = active.remove(activeIndex);
                            let activeArray = Buffer.toArray<Nat>(active);
                            var inactive = Buffer.fromArray<Nat>(participations.inactive);
                            inactive.add(removedId);
                            let inactiveArray = Buffer.toArray<Nat>(inactive);
                            let newParticipations : UserData.Participation = {
                                active = activeArray;
                                inactive = inactiveArray;
                                done = participations.done;
                            };
                            await DB.setParticipation(user, newParticipations);
                        };
                    };
                };
            };
        };
        return true;
    };

    private func changeFromAciveToDone(user : Principal, proposalId : Nat) : async Bool {
        var participations = await DB.getParticipations(user);
        switch (participations) {
            case (null) {
                return false;
            };
            case (?participations) {
                let activeIndex = Array.indexOf<Nat>(proposalId, participations.active, Nat.equal);
                switch (activeIndex) {
                    case (null) {
                        return false;
                    };
                    case (?activeIndex) {
                        var active = Buffer.fromArray<Nat>(participations.active);
                        let removeId = active.remove(activeIndex);
                        let activeArray = Buffer.toArray<Nat>(active);
                        var done = Buffer.fromArray<Nat>(participations.done);
                        done.add(removeId);
                        let doneArray = Buffer.toArray<Nat>(done);
                        let newParticipations : UserData.Participation = {
                            active = activeArray;
                            inactive = participations.inactive;
                            done = doneArray;
                        };
                        await DB.setParticipation(user, newParticipations);
                    };
                };
            };
        };
        return true;
    };
};
