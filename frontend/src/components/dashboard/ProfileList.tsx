import React, { useState } from 'react'
import { Button } from '../shared/Button';
import { PencilIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Principal } from '@dfinity/principal';
import { State, User } from '@app/declarations/home/home.did';
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

    return (
        <li
            key={profile[0].toString()}
            className='relative bg-carafe-950/[.01] shadow-inner-blur first:rounded-t-2xl last:rounded-b-2xl'
        >
            <div>
                <div className='flex sm:w-2/5'>
                    <p className='text-[14px] font-semibold text-text-tertiary md:text-base'>
                        {profile[1].name}
                    </p>
                </div>
                <div className='flex items-center justify-between space-x-4 sm:w-3/5'>
                    <p className='hidden text-[14px] font-medium text-carafe-400 sm:block md:text-base'>
                        {profile[1].jurisdiction.length} - {profile[1].role.length} {/* Agregado el rol aquí */}
                    </p>
                    {!isEditing && (
                        <div className='flex space-x-5 items-center'>
                            <span>{renderState(profile[1].state)}</span>
                            <Button onClick={() => setIsEditing(true)}>
                                <PencilIcon className='h-5 w-5 text-blue-600' />
                            </Button>
                        </div>
                    )}
                    {isEditing && (
                        <div className='flex items-center space-x-5'>

                            <select onChange={handleStateChange}>
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
        </li>
    )
}
