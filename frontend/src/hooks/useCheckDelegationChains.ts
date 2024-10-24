import { useEffect } from 'react';

const ARES_DELEGATION_CHAINS_KEY = 'ARES_DELEGATION_CHAINS_KEY';


const useCheckDelegationChains = () => {
    useEffect(() => {
        // Verificación de ARES_DELEGATION_CHAINS_KEY en localStorage
        if (typeof window !== 'undefined') {
            const delegationChains = localStorage.getItem(ARES_DELEGATION_CHAINS_KEY);

            if (!delegationChains || delegationChains === '[]') {
                localStorage.removeItem('user');  // Eliminar la clave 'user'
            }
        }
    },
        []); // Solo se ejecuta una vez, al montar el componente
};


export default useCheckDelegationChains;
