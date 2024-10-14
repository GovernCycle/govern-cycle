import { AuthenticationError } from "@app/declarations/home/home.did";

export const handleProfileResult = (result: AuthenticationError) => {
    if ('NotAllowedAction' in result) {
        return 'Not allowed action';
    }
    if ('UserAlreadyExists' in result) {
        return 'User already exists';
    }
    if ('UserNotApproved' in result) {
        return 'User not approved';
    }
    if ('UserNotAuthenticated' in result) {
        return 'User not authenticated';
    }
    if ('UserNotAuthorized' in result) {
        return 'User not authorized';
    }
    if ('UserNotFound' in result) {
        return 'User not found';
    }

}