import React, { useState } from 'react';
import { Container } from '@/components/shared/Container';
import { ContentPill } from '@/components/shared/ContentPill';
import { cn } from '@/lib/utils';
import { PencilIcon, XMarkIcon, ShieldExclamationIcon, ShieldCheckIcon } from '@heroicons/react/16/solid';
import windowCode from '@/icons/nucleo/window-code-16.svg';
import magicWand from '@/icons/nucleo/magic-wand-16.svg';
import SearchBar from '@/components/forms/searchBar';
import UbicationDropdown from '@/components/forms/ubicationDropdown';
import { Button } from '@/components/shared/Button';

const roles = ["Admin", "No-Admin", "Full-Stack Developer", "Product Designer", "UX/UI Designer", "Graphic Designer"];

const jobListings = [
    {
        category: 'Lista de usuarios pendientes por aprobar',
        icon: ShieldExclamationIcon,
        jobs: [
            { title: 'Nombre de la persona u organización', location: ' United States', role: 'Rol- x' },
            { title: 'Nombre de la persona u organización ', location: 'Europe', role: 'Rol - y ' },
            { title: 'Nombre de la persona u organización', location: ' North America', role: 'Rol- z' },
            { title: 'Nombre de la persona u organización', location: 'South America', role: 'Rol - xx' },
        ],
    },
    {
        category: 'Usuarios activos',
        icon: ShieldCheckIcon,
        jobs: [
            { title: 'Nombre de la persona u organización', location: 'Anywhere on Earth', role: 'Rol- x' },
            { title: 'Nombre de la persona u organización', location: 'North America', role: 'Rol- y' },
            { title: 'Nombre de la persona u organización', location: 'Europe', role: 'Rol- z' },
        ],
    },
];

const ListingUsers = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [locationFilter, setLocationFilter] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState<string | null>(null);

    const handleActionClick = (user) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    };

    const filteredJobs = jobListings.map(group => ({
        ...group,
        jobs: group.jobs.filter(
            job =>
                (!locationFilter || job.location.includes(locationFilter)) &&
                (!roleFilter || job.role === roleFilter)
        ),
    }));

    return (
        <Container className='max-w-lg sm:max-w-xl lg:max-w-6xl'>
            {/* Filters */}
            <div className="flex justify-between items-center mt-4 space-x-4 mb-8">
                <p></p>
                <div className="flex space-x-4">
                    <UbicationDropdown
                        options={['Remote - United States', 'Remote - Europe', 'Remote - North America', 'Remote - South America']}
                        placeholder="Filtrar por ubicación"
                    />
                    <UbicationDropdown
                        options={roles}
                        placeholder="Filtrar por rol"
                    />
                </div>
            </div>

            {/* Listado de Usuarios */}
            <div className='space-y-8 sm:mt-8'>
                {filteredJobs.map((jobsGroup) => (
                    <div key={`jobs-${jobsGroup.category}`} className='space-y-4'>
                        <ContentPill Icon={jobsGroup.icon} text={jobsGroup.category} />

                        <ul role='list'>
                            {jobsGroup.jobs.map((job, index) => (
                                <li
                                    key={`jobs-${jobsGroup.category}-${index}`}
                                    className='relative bg-carafe-950/[.01] shadow-inner-blur first:rounded-t-2xl last:rounded-b-2xl'
                                >
                                    <div
                                        className={cn(
                                            'flex items-center justify-between space-x-3 border border-carafe-200/[.06] border-t-transparent p-4 md:space-x-4 md:p-6',
                                            index === 0 &&
                                            'rounded-t-2xl border-b-carafe-200/[.06] border-t-carafe-200/[.06]',
                                            jobsGroup.jobs.length - 1 === index && 'rounded-b-2xl'
                                        )}
                                    >
                                        <div className='flex sm:w-2/5'>
                                            <p className='text-[14px] font-semibold text-text-tertiary md:text-base'>
                                                {job.title}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between space-x-4 sm:w-3/5'>
                                            <p className='hidden text-[14px] font-medium text-carafe-400 sm:block md:text-base'>
                                                {job.location} - {job.role} {/* Agregado el rol aquí */}
                                            </p>
                                            <Button
                                                onClick={() => handleActionClick(job)}
                                                className='flex items-center text-sm font-semibold leading-4 text-text-accent duration-200 ease-in-out hover:text-tan-500'
                                            >
                                                Tomar acciones
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <div className="flex justify-between items-start mb-4">
                            {/* Icono de cerrar */}
                            <button onClick={closeModal} className="ml-auto">
                                <XMarkIcon className="h-6 w-6 text-text-tertiary hover:text-red-700" />
                            </button>
                            {/* Icono de editar */}
                            <button className="ml-2">
                                <PencilIcon className="h-6 w-6 text-gray-500 hover:text-tan-500" />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold mb-4">Acciones para {selectedUser.title}</h3>
                        <p className="text-sm text-gray-500 mb-6">Ubicación: {selectedUser.location}</p>
                        <div>
                            <button className="w-full bg-charcoal-500 text-text-accent py-2 rounded-lg hover:bg-green-600 transition duration-150">
                                Aceptar
                            </button>
                            <button className="w-full bg-tan-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-150 mt-2">
                                Eliminar usuario
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </Container>
    );
}

export default ListingUsers;
