import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import ProposalData "../types/proposal";
import UserData "../types/user";
import DateTime "mo:datetime/DateTime";
import ProposalVal "../validations/proposal";
import UserUtils "../utils/user";
import ProposalUtils "../utils/proposal";
import DB "canister:db";

actor Proposal {

    // Create a new proposal
    public shared ({ caller }) func createProposal(proposal : ProposalData.ProposalRequest) : async ProposalVal.ProposalResult {

        // Check if the user is authenticated
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        // Fetch the user's profile from the database
        let userFound = await DB.getProfile(caller);

        switch (userFound) {
            case (null) {
                // If the user is not found, return an error
                return #err(#UserNotFound);
            };

            // Verify the user's role and approval status
            case (?userFound) {

                if (not UserUtils.isProjectDeveloper(userFound.role)) {
                    return #err(#UserNotAuthorized);
                };

                if (not UserUtils.isApproved(userFound.state)) {
                    return #err(#UserNotAuthorized);
                };
            };
        };

        // Fetch invited users based on roles and jurisdiction
        var invitedUsers = await DB.findWithRolesAndJurisdiction(proposal.invitedRoles, proposal.location);

        // Return error if no users were found
        if (Array.size(invitedUsers) == 0) {
            return #err(#NoUsersFound);
        };

        // Validate the proposal's deadline format
        if (ProposalUtils.checkDate(proposal.deadline)) {
            return #err(#InvalidDate);
        };

        // Remove the proposal's author from the invited users
        invitedUsers := UserUtils.deleteAuthorFromInvitedUsers(caller, invitedUsers);

        // Capture the current date as the proposal's start date
        let startDate : Text = DateTime.toText(DateTime.now());

        // Create a new proposal object
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
            links = proposal.links;
            description = proposal.description;
            invitedUsers;
            invitedRoles = proposal.invitedRoles;
        };

        // Add the proposal to the map of proposals
        let response = await DB.saveProposal(newProposal);

        // Add the proposal to the active participations of invited users
        let nextProposalId = await DB.getNextProposalId();
        let areParticipationsSet = await addActiveParticipation(invitedUsers, nextProposalId);
        if (not areParticipationsSet) {
            return #err(#ParticipationsNotSet);
        };

        // if all is ok return success state
        return response;
    };

    // Cast a vote on a proposal
    // The variable caller is de id address to the current user
    public shared ({ caller }) func vote(decition : Bool, proposalId : Nat) : async ProposalVal.ProposalResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        // Fetch the user's profile
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

        // Retrieve the proposal by its ID
        let proposal = await DB.getProposal(proposalId);

        switch (proposal) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposal) {
                // Verify if the user is allowed to vote
                if (not ProposalUtils.isInvitedUser(caller, proposal.invitedUsers)) {
                    return #err(#UserNotInvited);
                };

                // Ensure the user hasn't already voted
                if (ProposalUtils.hasVoted(caller, proposal.votes)) {
                    return #err(#UserAlreadyVoted);
                };

                // Check if the proposal is already approved
                if (proposal.state == #Approved) {
                    return #err(#ProposalAlreadyApproved);
                };

                // Add the user's vote to the proposal
                let userVote : ProposalData.Vote = {
                    user = caller;
                    approved = decition;
                };

                // Temporal variables to save votes in storage
                var currentVotes = Buffer.fromArray<ProposalData.Vote>(proposal.votes);
                currentVotes.add(userVote);
                let currentVotesArray = Buffer.toArray<ProposalData.Vote>(currentVotes);

                // Check if the threshold for approval has been met
                var newState = proposal.state;
                if (proposal.threshold <= ProposalUtils.getApprovedVotes(currentVotesArray)) {
                    newState := #Approved;

                    // Move non-voting users to inactive participation
                    let usersThatNotVoted = ProposalUtils.checkUsersThatNotVoted(proposal.invitedUsers, currentVotesArray);
                    let areParticipationsSet = await changeFromActiveToInactive(usersThatNotVoted, proposalId);
                    if (not areParticipationsSet) {
                        return #err(#ParticipationsNotSet);
                    };
                };

                // Update the proposal's state and votes
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
                    links = proposal.links;
                    description = proposal.description;
                    invitedUsers = proposal.invitedUsers;
                    invitedRoles = proposal.invitedRoles;
                };

                // Update the proposal in the map
                await DB.updateProposal(proposalId, newProposal);

                // Update user's participation status
                let isParticipationsSet = await changeFromActiveToDone(caller, proposalId);
                if (not isParticipationsSet) {
                    return #err(#ParticipationsNotSet);
                };
            };
        };

        return #ok(#SuccessText("Vote added successfully"));
    };

    // Add a comment to a proposal
    public shared ({ caller }) func addComment(proposalId : Nat, topic : Text, comment : Text) : async ProposalVal.ProposalResult {
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        let userFound = await DB.getProfile(caller);

        // Check if user already exist if no exist return error if exist verify is aproved user
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

        // Retrieve the proposal by ID
        let proposal = await DB.getProposal(proposalId);

        switch (proposal) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposal) {
                // Ensure the user is invited to comment
                if (
                    not ProposalUtils.isInvitedUser(caller, proposal.invitedUsers) and not ProposalUtils.isAuthor(caller, proposal.author)
                ) {
                    return #err(#UserNotInvited);
                };

                // Check if the proposal is already approved
                if (proposal.state == #Approved) {
                    return #err(#ProposalAlreadyApproved);
                };

                // Add the comment to the proposal
                let newComment : ProposalData.Comment = {
                    tema = topic;
                    user = caller;
                    detail = comment;
                };

                var currentComments = Buffer.fromArray<ProposalData.Comment>(proposal.comments);
                currentComments.add(newComment);
                let currentCommentsArray = Buffer.toArray<ProposalData.Comment>(currentComments);

                // Update the proposal with the new comment
                let newProposal : ProposalData.Proposal = {
                    author = proposal.author;
                    name = proposal.name;
                    location = proposal.location;
                    typeProposal = proposal.typeProposal;
                    environmentalUnits = proposal.environmentalUnits;
                    startDate = proposal.startDate;
                    deadline = proposal.deadline;
                    state = proposal.state;
                    photo = proposal.photo;
                    threshold = proposal.threshold;
                    comments = currentCommentsArray;
                    votes = proposal.votes;
                    links = proposal.links;
                    description = proposal.description;
                    invitedUsers = proposal.invitedUsers;
                    invitedRoles = proposal.invitedRoles;
                };

                // Update the proposal in the map
                await DB.updateProposal(proposalId, newProposal);
            };
        };

        return #ok(#SuccessText("Comment added successfully"));
    };

    // get all proposal
    public func getAllProposals() : async ProposalVal.GetProposalsResult {

        let proposalsKeys = await DB.getProposalKeys();
        // Iterate through all proposals in the map
        for (p in proposalsKeys.vals()) {

            // Retrieve the specific proposal by ID
            let proposal : ?ProposalData.Proposal = await DB.getProposal(p);

            switch (proposal) {
                case (null) {
                    return #err(#ProposalNotFound);
                };
                case (?proposal) {
                    // Compare the proposal's deadline with the current date
                    if (ProposalUtils.checkDate(proposal.deadline)) {

                        // Check if the proposal is still pending
                        if (proposal.state == #Pending) {

                            // Update the proposal state to "Rejected"
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
                                links = proposal.links;
                                description = proposal.description;
                                invitedUsers = proposal.invitedUsers;
                                invitedRoles = proposal.invitedRoles;
                            };

                            // Move the invited users' participations from active to inactive
                            let areParticipationsSet = await changeFromActiveToInactive(proposal.invitedUsers, p);
                            if (not areParticipationsSet) {
                                return #err(#ParticipationsNotSet);
                            };

                            // Update the proposal in the map with the new state
                            await DB.updateProposal(p, newProposal);

                        };

                    };

                };
            };

        };

        // Return all proposals as an array
        let proposals = await DB.getAllProposals();
        return #ok(#FullProposal(proposals));
    };

    // get proposal by id
    public func getProposal(proposalId : Nat) : async ProposalVal.GetProposalsResult {

        // Retrieve the specific proposal by ID
        let proposal = await DB.getProposal(proposalId);

        switch (proposal) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposal) {
                if (ProposalUtils.checkDate(proposal.deadline)) {
                    // If the proposal is still pending
                    if (proposal.state == #Pending) {

                        //let ?dateTime : ?DateTime.DateTime = DateTime.fromText(proposal.deadline, format);

                        // Compare the deadline with the current date
                        //let order : Order.Order = DateTime.compare(dateTime, DateTime.now());

                        // If the deadline has passed
                        //if (order == #less) {

                        // Update the proposal state to "Rejected"
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
                            links = proposal.links;
                            description = proposal.description;
                            invitedUsers = proposal.invitedUsers;
                            invitedRoles = proposal.invitedRoles;
                        };

                        // Update the proposal in the map with the new state
                        await DB.updateProposal(proposalId, newProposal);
                        //};
                    };
                };
                // Return the found proposal
                return #ok(#Proposal(proposal));
            };
        };
    };

    // delete proposal and caller is id address to current user
    public shared ({ caller }) func deleteProposal(idProposal : Nat) : async ProposalVal.ProposalResult {
        // Check if the user is authenticated
        if (Principal.isAnonymous(caller)) return #err(#UserNotAuthenticated);

        // Retrieve the user's profile
        let userAdmin = await DB.getProfile(caller);

        switch (userAdmin) {
            case (null) {
                return #err(#UserNotFound);
            };
            case (?userAdmin) {
                // Check if the user is an admin and their account is approved
                if (not UserUtils.isAdmin(userAdmin.role)) {
                    return #err(#UserNotAuthorized);
                };
                if (not UserUtils.isApproved(userAdmin.state)) {
                    return #err(#UserNotApproved);
                };
            };
        };

        // Retrieve the proposal by ID
        let proposalFound = await DB.getProposal(idProposal);

        switch (proposalFound) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposalFound) {
                // Check if the proposal is still pending
                if (proposalFound.state == #Pending) {
                    //remove the proposal from the active participations of invited users
                    let areParticipationsSet = await changeFromActiveToInactive(proposalFound.invitedUsers, idProposal);
                    if (not areParticipationsSet) {
                        return #err(#ParticipationsNotSet);
                    };
                };
                // Delete the proposal from the map
                let response = await DB.deleteProposal(idProposal);
                return response;
            };
        };
    };

    // give participation token to voters
    private func addActiveParticipation(users : [Principal], proposalId : Nat) : async Bool {
        // Iterate over the list of invited users
        for (user in users.vals()) {
            var participations = await DB.getParticipations(user);
            switch (participations) {
                case (null) {
                    return false;
                };
                case (?participations) {
                    // Add the proposal ID to the user's active participations
                    var active = Buffer.fromArray<Nat>(participations.active);
                    active.add(proposalId);
                    let activeArray = Buffer.toArray<Nat>(active);
                    let newParticipations : UserData.Participation = {
                        active = activeArray;
                        inactive = participations.inactive;
                        done = participations.done;
                    };
                    // Update the user's participation data
                    await DB.setParticipation(user, newParticipations);

                };
            };
        };
        return true;
    };

    // change vote from active to incative
    private func changeFromActiveToInactive(users : [Principal], proposalId : Nat) : async Bool {
        // Iterate over the list of users
        for (user in users.vals()) {
            var participations = await DB.getParticipations(user);
            switch (participations) {
                case (null) {
                    return false;
                };
                case (?participations) {
                    // Find the proposal ID in the active participations
                    let activeIndex = Array.indexOf<Nat>(proposalId, participations.active, Nat.equal);
                    switch (activeIndex) {
                        case (null) {
                            return false;
                        };
                        case (?activeIndex) {
                            // Remove the proposal ID from active and add to inactive participations
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
                            // Update the user's participation data
                            await DB.setParticipation(user, newParticipations);
                        };
                    };
                };
            };
        };
        return true;
    };

    // change vote from active to done
    private func changeFromActiveToDone(user : Principal, proposalId : Nat) : async Bool {
        // Retrieve the user's participations
        var participations = await DB.getParticipations(user);
        switch (participations) {
            case (null) {
                return false;
            };
            case (?participations) {
                // Find the proposal ID in the active participations
                let activeIndex = Array.indexOf<Nat>(proposalId, participations.active, Nat.equal);
                switch (activeIndex) {
                    case (null) {
                        return false;
                    };
                    case (?activeIndex) {
                        // Move the proposal ID from active to done participations
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
                        // Update the user's participation data
                        await DB.setParticipation(user, newParticipations);
                    };
                };
            };
        };
        return true;
    };

    // get time to the blockchain in real time
    public func proveExposeEndpointTime() : async Text {
        return DateTime.toText(DateTime.now());
    };

};
