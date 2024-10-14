<<<<<<< HEAD
import { ProposalDetails } from '@app/components/proposal/ProposalDetail';
=======
>>>>>>> Front-NA
import { UserRequest, Role, User } from '@app/declarations/home/home.did'
import { useCountry } from '@app/hooks/useCountry';
import { useHome } from '@app/hooks/useHome';
import React, { useState } from 'react'

const index = () => {

    const { createProfile, getProfile } = useHome();
    const [userToSave, setUserToSave] = useState<UserRequest>(
        {
            name: "Jaime",
            manager: ["Rony"],
            logo: [0, 8],
            role: [{ 'Academy': null }],
            email: "jaime@gmail.com",
            jurisdiction: [{ region: ["America"], country: ["Colombia"], continent: ["America"] }],
            phone: "123456789"
        }
    );

    const { getCountry } = useCountry();

    const [user, setUser] = useState<User>();

    const saveUser = async () => {
        try {
            const result = await createProfile(userToSave);
            console.log(result);
            if ('ok' in result && 'User' in result.ok) {
                console.log(result.ok.User);
                setUserToSave(result.ok.User);
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        }

    }

    const getUser = async () => {
        try {
            const result = await getProfile();
            console.log(result);
            if ('ok' in result && 'User' in result.ok) {
                console.log(result.ok.User);
                setUser(result.ok.User);
            }
        } catch (error) {
            console.error('Error getting profile:', error);
        }
    }

    const getCountryData = async () => {
        try {
            const result = await getCountry('Brasil');
            console.log(result);
        } catch (error) {
            console.error('Error getting country:', error);
        }
    }

    return (
        <div className='flex flex-col space-y-5'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit'
                onClick={saveUser}>Save User</button>

            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit'
                onClick={getUser}>Get User</button>

            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit'
                onClick={getCountryData}
            >
                Get country
            </button>
        </div>
    )
}

export default index