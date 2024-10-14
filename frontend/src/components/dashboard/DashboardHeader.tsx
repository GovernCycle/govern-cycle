import React from 'react'
import { Container } from '@/components/shared/Container'
import { UsersIcon, UserPlusIcon, UserGroupIcon, CheckIcon, XMarkIcon } from '@heroicons/react/16/solid'

const DashboardHeader = () => {
    return (
        <section className='relative overflow-hidden'>
            <Container className='py-4 sm:py-8'> {/* Reducido sm:py-12 a sm:py-8 */}
                <div className='cards space-y-4 lg:grid lg:grid-cols-1 lg:gap-4 lg:space-y-0'>
                    <div className="card relative overflow-hidden rounded-xl bg-charcoal-500 p-[1px] before:absolute before:left-0 before:top-0 before:z-30 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 hover:after:opacity-100">
                        <div className='relative z-30 w-full overflow-hidden rounded-xl bg-white/[0.1] shadow-inner-blur-no-border backdrop-blur-lg backdrop-brightness-50'>
                            <div className='grid h-full w-full grid-cols-12 rounded-xl lg:gap-8 xl:grid-cols-1 xl:gap-12'>
                                <div className='col-span-12 px-6 pb-4 pt-8 sm:px-8 sm:pt-10'>
                                    <div>
                                        <h1 className='text-3xl font-bold text-cream-50 text-center mb-4'>Admin Dashboard</h1> {/* Cambié text-4xl a text-3xl y reduje el margen */}
                                        <div className='mt-4 grid gap-x-2 gap-y-3 sm:mt-6 sm:grid-cols-3'>
                                            {/* Usuarios Pendientes */}
                                            <div className='flex flex-col items-center space-y-1 bg-white/[0.05] p-3 rounded-lg shadow-lg'>
                                                <UserPlusIcon className='h-6 w-6 text-tan-500' /> {/* Icono más pequeño */}
                                                <p className='text-md font-semibold text-tan-500'>Usuarios Pendientes</p> {/* Reducido text-lg a text-md */}
                                                <p className='text-xl font-bold text-tan-500'>4</p> {/* Reducido text-2xl a text-xl */}
                                            </div>
                                            {/* Usuarios Activos */}
                                            <div className='flex flex-col items-center space-y-1 bg-white/[0.05] p-3 rounded-lg shadow-lg'>
                                                <UsersIcon className='h-6 w-6 text-tan-500' />
                                                <p className='text-md font-semibold text-tan-500'>Usuarios Activos</p>
                                                <p className='text-xl font-bold text-tan-500'>3</p>
                                            </div>
                                            {/* Usuarios Totales */}
                                            <div className='flex flex-col items-center space-y-1 bg-white/[0.05] p-3 rounded-lg shadow-lg'>
                                                <UserGroupIcon className='h-6 w-6 text-tan-500' />
                                                <p className='text-md font-semibold text-tan-500'>Usuarios Totales</p>
                                                <p className='text-xl font-bold text-tan-500'>7</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 w-full"> {/* Reducido el espacio entre botones */}
                        <button className="flex items-center bg-charcoal-400 hover:bg-tan-500 text-white py-1.5 px-3 rounded-lg shadow space-x-2 transform transition-transform duration-200 hover:scale-105 hover:text-text-inverse">
                            <CheckIcon className="h-5 w-5" />
                            <span>Aprobar todos los usuarios pendientes</span>
                        </button>
                        <button className="flex items-center bg-carafe-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-lg shadow space-x-2 transform transition-transform duration-200 hover:scale-105">
                            <XMarkIcon className="h-5 w-5" />
                            <span>Rechazar Todos</span>
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default DashboardHeader
