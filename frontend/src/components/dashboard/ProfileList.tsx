import React, { useState } from 'react'
import { Button } from '../shared/Button';
import { PencilIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Principal } from '@dfinity/principal';
import { Jurisdiction, Role, State, User } from '@app/declarations/home/home.did';
import { useHome } from '@app/hooks/useHome';
import Swal from 'sweetalert2';
import { handleProfileResult } from '@app/utils';

export const ProfileList = ({
    profile,
    retrieveProfiles,
}: {
    profile: [Principal, User];
    retrieveProfiles: () => Promise<void>;

}) => {

    const [newState, setNewState] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { changeUserState } = useHome();

    const renderState = (state: State) => {
        if ('Approved' in state) {
            return 'Aprobado'
        }
        if ('Pending' in state) {
            return 'Pendiente'
        }
        if ('Rejected' in state) {
            return 'Rechazado'
        }
    }

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewState(event.target.value);
    }

    const handleChangeUserState = async () => {
        try {
            let state: State;
            switch (newState) {
                case 'Approved':
                    state = { Approved: null };
                    break;
                case 'Pending':
                    state = { Pending: null };
                    break;
                case 'Rejected':
                    state = { Rejected: null };
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Seleccione un estado',
                    });
                    return;
            }
            const result = await changeUserState(state, profile[0]);
            if ('ok' in result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Estado cambiado',
                    text: 'El estado del usuario ha sido cambiado exitosamente',
                });
                await retrieveProfiles();
                setIsEditing(false);
                return;
            }
            if ('err' in result) {
                const handleError = handleProfileResult(result.err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: handleError,
                });
                setIsEditing(false);
            }
        } catch (e) {
            console.log(e);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cambiar el estado del usuario',
            });
            setIsEditing(false);
        }
    }

    const renderRoles = (roles: Array<Role>) => {
        return roles.map((role, index) => (
            <span key={index} className='bg-blue-100 text-blue-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>
                {Object.keys(role)[0]}
            </span>
        ));
    }

    const renderJurisdiction = (jurisdiction: Array<Jurisdiction>) => {
        return jurisdiction.map((j, index) => (
            <div key={index} className='text-xs text-gray-600'>
                <p><strong>Región:</strong> {j.region.length > 0 ? j.region[0] : 'N/A'}</p>
                <p><strong>País:</strong> {j.country.length > 0 ? j.country[0] : 'N/A'}</p>
                <p><strong>Continente:</strong> {j.continent.length > 0 ? j.continent[0] : 'N/A'}</p>
            </div>
        ));
    }

    return (
        <li
            key={profile[0].toString()}
            className='relative bg-white shadow-inner p-4 rounded-lg mb-4'
        >
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p className='text-lg font-semibold text-gray-800'>
                        {profile[1].name}
                    </p>
                    <div className='flex items-center space-x-2 mt-2'>
                        {renderRoles(profile[1].role)}
                    </div>
                </div>
                <div className='flex'>
                    {!isEditing && (
                        <div className='flex space-x-4 items-center'>
                            <span className='text-gray-500'>{renderState(profile[1].state)}</span>
                            <Button onClick={() => setIsEditing(true)}>
                                <PencilIcon className='h-5 w-5 text-blue-600' />
                            </Button>
                        </div>
                    )}
                    {isEditing && (
                        <div className='flex space-x-5 items-center'>
                            <select onChange={handleStateChange} className='border border-gray-300 rounded p-1'>
                                <option value='' disabled selected>Cambiar estado</option>
                                <option value='Pending'>Pendiente</option>
                                <option value='Approved'>Aprobado</option>
                                <option value='Rejected'>Rechazado</option>
                            </select>
                            <Button onClick={handleChangeUserState}>
                                <ShieldCheckIcon className='h-5 w-5 text-green-600' />
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                <XMarkIcon className='h-5 w-5 text-red-600' />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='text-sm font-medium text-gray-600'>Jurisdicción:</h3>
                {renderJurisdiction(profile[1].jurisdiction)}
            </div>
        </li>
    )
}
