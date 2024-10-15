import { ProposalError } from "@app/declarations/proposal/proposal.did";

export const handleProposalResult = (result: ProposalError) => {
    if ('ProposalNotFound' in result) {
        return 'Proposal not found';
    }
    if ('ParticipationsNotSet' in result) {
        return 'Participations not set';
    }
    if ('InvalidDate' in result) {
        return 'Invalid date';
    }
    if ('NotAllowedAction' in result) {
        return 'Not allowed action';
    }
    if ('UserNotAuthorized' in result) {
        return 'User not authorized';
    }
    if ('ProposalAlreadyApproved' in result) {
        return 'Proposal already approved';
    }
    if ('NoUsersFound' in result) {
        return 'No users found';
    }
    if ('UserAlreadyVoted' in result) {
        return 'User already voted';
    }
    if ('UserNotFound' in result) {
        return 'User not found';
    }
    if ('UserNotInvited' in result) {
        return 'User not invited';
    }
    if ('UserNotApproved' in result) {
        return 'User not approved';
    }
    if ('UserNotAuthenticated' in result) {
        return 'User not authenticated';
    }

}