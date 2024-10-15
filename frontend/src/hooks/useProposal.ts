import { CandidActors } from "@app/canisters";
import { ProposalRequest } from "@app/declarations/proposal/proposal.did";
import { useAuth, useCandidActor } from "@bundly/ares-react";

export const useProposal = () => {

    const { currentIdentity } = useAuth();
    const proposal = useCandidActor<CandidActors>("proposal",
        currentIdentity, {
        canisterId: "h2tkt-laaaa-aaaal-qjr3a-cai",
    }
    ) as CandidActors["proposal"];

    const createProposal = async (proposalRequest: ProposalRequest) => {
        try {
            const result = await proposal.createProposal(proposalRequest);
            return result;
        } catch (error) {
            console.error('Error creating proposal:', error);
            throw error;
        }
    }

    const deleteProposal = async (proposalId: bigint) => {
        try {
            const result = await proposal.deleteProposal(proposalId);
            return result;
        } catch (error) {
            console.error('Error deleting proposal:', error);
            throw error;
        }
    }

    const getAllProposals = async () => {
        try {
            const result = await proposal.getAllProposals();
            return result;
        } catch (error) {
            console.error('Error getting all proposals:', error);
            throw error;
        }
    }

    const getProposal = async (proposalId: bigint) => {
        try {
            const result = await proposal.getProposal(proposalId);
            return result;
        } catch (error) {
            console.error('Error getting proposal:', error);
            throw error;
        }
    }

    const voteProposal = async (choice: boolean, proposalId: bigint) => {
        try {
            const result = await proposal.vote(choice, proposalId);
            return result;
        } catch (error) {
            console.error('Error voting proposal:', error);
            throw error;
        }
    }

    const addComment = async (topic: string, comment: string, proposalId: bigint) => {
        try {
            const result = await proposal.addComment(proposalId, topic, comment);
            return result;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    return {
        createProposal, deleteProposal, getAllProposals, getProposal, voteProposal,
        addComment
    };
}