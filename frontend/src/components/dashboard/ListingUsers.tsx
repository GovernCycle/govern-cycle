import React, { useEffect, useState } from 'react';
import { Container } from '@/components/shared/Container';
import { useHome } from '@app/hooks/useHome';
import { User } from '@app/declarations/home/home.did';
import { Principal } from '@dfinity/principal';
import Swal from 'sweetalert2';
import { ProfileList } from './ProfileList';

const ListingUsers = () => {
    const [profiles, setProfiles] = useState<[Principal, User][]>([]);

    const { getAllProfiles } = useHome();

    useEffect(() => {
        const retrieveProfiles = async () => {
            try {
                const profiles = await getAllProfiles();
                setProfiles(profiles);
                console.log(profiles);
            } catch (e) {
                console.log(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al obtener los perfiles de los usuarios',
                });
            }
        }
        retrieveProfiles();
    }
        , []);

    const retrieveProfiles = async () => {
        try {
            const profiles = await getAllProfiles();
            setProfiles(profiles);
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener los perfiles de los usuarios',
            });
        }
    }

    return (
        <Container className='max-w-lg sm:max-w-xl lg:max-w-6xl'>
            {/* Filters */}

            {/* Listado de Usuarios */}
            <div className='space-y-8 sm:mt-8'>

                <ul role='list'>
                    {profiles.map((profile) => (
                        <ProfileList
                            key={profile[0].toString()}
                            profile={profile}
                            retrieveProfiles={retrieveProfiles}
                        />
                    ))}
                </ul>
            </div>



        </Container>
    );
}

export default ListingUsers;
