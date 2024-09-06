import Map "mo:map/Map";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import ProposalData "../types/proposal";
import { nhash } "mo:map/Map";
import DateTime "mo:datetime/DateTime";
import ProposalVal "../validations/proposal";
import UserUtils "../utils/user";
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

        nextProposalId += 1;
        let startDate : Text = DateTime.toText(DateTime.now());
        let newProposal : ProposalData.Proposal = {
            author = caller;
            name = proposal.name;
            location = proposal.location;
            sections = [];
            typeProposal = #Project;
            environUnits = proposal.environUnits;
            startDate;
            deadline = proposal.deadline;
            state = #Pending;
            photo = proposal.photo;
            comments = [];
            description = proposal.description;
        };

        Map.set(proposals, nhash, nextProposalId, newProposal);
        return #ok(#SuccessText("Proposal created successfully"));
    };

    public func getAllProposals() : async [(Nat, ProposalData.Proposal)] {
        return Iter.toArray(Map.entries(proposals));
    };

    public shared ({ caller }) func addSection(proposalId : Nat, section : ProposalData.SectionRequest) : async ProposalVal.ProposalResult {
        let proposal = Map.get(proposals, nhash, proposalId);
        switch (proposal) {
            case (null) {
                return #err(#ProposalNotFound);
            };
            case (?proposal) {
                if (not Principal.equal(proposal.author, caller)) {
                    return #err(#UserNotAuthorized);
                };

                //search the users with the roles invited to the section
                var invitedUsers = await DB.findWithRoles(section.invitedRoles);

                //delete the author from the invited users
                invitedUsers := UserUtils.deleteAuthorFromInvitedUsers(caller, invitedUsers);

                //verify invited users are not empty
                if (invitedUsers.size() == 0) {
                    return #err(#NoUsersFound);
                };

                let newSection : ProposalData.Section = {
                    name = section.name;
                    invitedRoles = section.invitedRoles;
                    invitedUsers;
                    votes = [];
                    comments = [];
                    minimumAccept = section.minimumAccept;
                };

                //add the section to the list of sections of the proposal

                let newSections = Buffer.fromArray<ProposalData.Section>(proposal.sections);
                newSections.add(newSection);

                //add the section to the proposal

                let newProposal : ProposalData.Proposal = {
                    author = proposal.author;
                    name = proposal.name;
                    location = proposal.location;
                    sections = Buffer.toArray(newSections);
                    typeProposal = proposal.typeProposal;
                    environUnits = proposal.environUnits;
                    startDate = proposal.startDate;
                    deadline = proposal.deadline;
                    state = proposal.state;
                    photo = proposal.photo;
                    comments = proposal.comments;
                    description = proposal.description;
                };

                Map.set(proposals, nhash, proposalId, newProposal);

                return #ok(#SuccessText("Section added successfully"));

            };
        };
    };

};
