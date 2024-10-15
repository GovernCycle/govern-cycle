import { CandidActors } from "@app/canisters";
import { State, UserRequest } from "@app/declarations/home/home.did";
import { useCandidActor, useAuth } from "@bundly/ares-react";
import { Principal } from "@dfinity/principal";


export const useHome = () => {

    const { currentIdentity } = useAuth();
    const home = useCandidActor<CandidActors>("home",
        currentIdentity, {
        canisterId: "htqbp-5iaaa-aaaal-qjr2q-cai",
    }
    ) as CandidActors["home"];

    const changeUserState = async (state: State, userPrincipal: Principal) => {
        try {
            const result = await home.changeUserState(state, userPrincipal);
            return result;
        } catch (error) {
            console.error('Error changing user state:', error);
            throw error;
        }
    }

    const createProfile = async (user: UserRequest) => {
        try {
            const result = await home.createProfile(user);
            return result;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    }

    const deleteProfile = async (userPrincipal: Principal) => {
        try {
            const result = await home.deleteProfile(userPrincipal);
            return result;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    const getAllProfiles = async () => {
        try {
            const result = await home.getAllProfiles();
            return result;
        } catch (error) {
            console.error('Error getting all profiles:', error);
            throw error;
        }
    }

    const getProfile = async () => {
        try {
            const result = await home.getProfile();
            return result;
        } catch (error) {
            console.error('Error getting profile:', error);
            throw error;
        }
    }

    const getMyParticipations = async () => {
        try {
            const result = await home.getMyParticipations();
            return result;
        } catch (error) {
            console.error('Error getting my participations:', error);
            throw error;
        }
    }

    return {
        changeUserState,
        createProfile,
        deleteProfile,
        getAllProfiles,
        getProfile,
        getMyParticipations
    };

};