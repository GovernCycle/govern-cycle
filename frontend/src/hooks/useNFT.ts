import { CandidActors } from "@app/canisters";
import { MetadataDesc, TokenId } from "@app/declarations/nft/nft.did";
import { useCandidActor, useAuth } from "@bundly/ares-react";
import { Principal } from "@dfinity/principal";


export const useNFT = () => {

    const { currentIdentity } = useAuth();
    const nft = useCandidActor<CandidActors>("nft",
        currentIdentity, {
        canisterId: "2pftn-jyaaa-aaaap-qkmda-cai",
    }
    ) as CandidActors["nft"];

    const minting = async (to: Principal, metadata: MetadataDesc) => {
        try {
            const result = await nft.mintDip721(to, metadata );
            return result;
        } catch (error) {
            console.error('Error changing user state:', error);
            throw error;
        }
    }

    const transferFrom = async (from: Principal, to: Principal, token_id: TokenId) => {
        try {
            const result = await nft.transferFromDip721(from, to, token_id);
            return result;
        } catch (error) {
            console.error('Error changing user state:', error);
            throw error;
        }
    }

   

    return {
        minting,
        transferFrom
    };

};