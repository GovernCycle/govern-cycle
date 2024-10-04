import { ProposalActor } from '@app/canisters/proposal';
import { GetProposalsResult, ProposalRequest, ProposalResult } from '@app/declarations/proposal/proposal.did';
import type { Principal } from '@dfinity/principal';


export class ProposalAPI {
  private actor: ProposalActor;

  constructor(actor: ProposalActor) {
    this.actor = actor;
  }

  // Crear una nueva propuesta
  public async createProposal(proposalRequest: ProposalRequest): Promise<ProposalResult> {
    try {
      const result = await this.actor.createProposal(proposalRequest);
      return result;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }

  // Eliminar una propuesta por su ID
  public async deleteProposal(proposalId: bigint): Promise<ProposalResult> {
    try {
      const result = await this.actor.deleteProposal(proposalId);
      return result;
    } catch (error) {
      console.error('Error deleting proposal:', error);
      throw error;
    }
  }

  // Obtener todas las propuestas
  public async getAllProposals(): Promise<GetProposalsResult> {
    try {
      const result = await this.actor.getAllProposals();
      return result;
    } catch (error) {
      console.error('Error getting all proposals:', error);
      throw error;
    }
  }

  // Votar en una propuesta
  public async vote(approved: boolean, proposalId: bigint): Promise<ProposalResult> {
    try {
      const result = await this.actor.vote(approved, proposalId);
      return result;
    } catch (error) {
      console.error('Error voting on proposal:', error);
      throw error;
    }
  }
}
