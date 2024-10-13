import AuthLayout from '@app/pages/auth/layout'
import React from 'react'
import { Container } from '../shared/Container'
import { Button } from '../shared/Button'
import { TextField } from '@/components/forms/TextField'

export const ProposalDetail = () => {
    return (
        <AuthLayout>
            <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl'>
                <div className='flex flex-col space-y-2 w-full'>
                    <div className='flex flex-col space-y-4 mb-4'>
                        <span className='text-3xl font-bold w-full'>Titulo de la Propuesta</span>
                        <div className='font-extralight'>
                            Descripción de la propuesta
                        </div>
                        <div className='flex space-x-2'>
                            <Button>
                                Votar a favor
                            </Button>
                            <Button>
                                Votar en contra
                            </Button>
                        </div>
                    </div>
                    <TextField
                        label='Comentario'
                        name='comment'
                        placeholder='Escribe tu comentario'
                    />
                    <div className='flex flex-col space-y-4'>
                        <span className='font-bold text-xl'>Comentarios</span>
                        <div className='flex flex-col space-y-3'>
                            <span className='font-semibold text-sm'>Nombre</span>
                            <span className='text-sm font-thin'>Tema</span>
                            <span className='text-xs font-extralight'>Comentario</span>
                        </div>
                    </div>
                </div>
            </Container>
        </AuthLayout>
    )
}
