import { UserPlusIcon, CursorArrowRaysIcon, ShieldCheckIcon, InformationCircleIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { Button } from '@/components/shared/Button'
import { GlobeEuropeAfricaIcon } from '@heroicons/react/16/solid'
import { Container } from '../shared/Container'

export const Card1 = () => {
    return (
        <Container className='gap-16 py-16 sm:pb-20'>

            <div className="card relative col-span-1 overflow-hidden rounded-xl bg-transparent p-[1.5px]">
                <div className='relative z-20 h-full w-full overflow-hidden rounded-xl'>
                    <div className='flex h-full w-full flex-col rounded-xl'>
                        <div className='px-8 pb-8 pt-10 sm:px-10 sm:pt-0 xl:px-0 xl:pt-0'>
                            <GlobeEuropeAfricaIcon className='h-20 w-20 mx-auto text-tan-500' />
                            <h3 className='text-lg font-semibold text-text-tertiary text-center mb-5'>
                                Salvar el medio ambiente nunca había sido tan fácil
                            </h3>
                            <div className='grid grid-cols-1 gap-4'>

                                {/* Minicard 1 */}
                                <div className='flex rounded-lg bg-tan-950/[.01] shadow-inner-blur'>
                                    <div className='relative flex flex-col w-full overflow-hidden rounded-lg border border-tan-200/[.06] p-4'>
                                        <div className='flex items-center space-x-2'>
                                            <UserPlusIcon className='h-8 w-8' />
                                            <div className='flex flex-col w-full'>
                                                <div className='flex justify-between items-center'>
                                                    <h3 className='text-lg font-semibold text-text-secondary text-left'>
                                                        Regístrate de forma segura
                                                    </h3>
                                                    <Link href='/auth/signup'>
                                                        <Button className='hover:bg-carafe-500 rounded-full w-fit z-30' variant='primary'>
                                                            Regístrate
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <p className='mt-1 text-sm text-text-secondary text-left'>
                                                    Obtén tu internet identity.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Minicard 2 */}
                                <div className='flex rounded-lg bg-tan-950/[.01] shadow-inner-blur'>
                                    <div className='relative flex flex-col w-full overflow-hidden rounded-lg border border-tan-200/[.06] p-4'>
                                        <div className='flex items-center justify-between w-full'>
                                            <CursorArrowRaysIcon className='h-8 w-8' />
                                            <div className='flex flex-col w-full'>
                                                <h3 className='text-lg font-semibold text-text-tertiary text-left'>
                                                    Explora propuestas ambientales
                                                </h3>
                                                <p className='mt-1 text-sm text-text-secondary text-left'>
                                                    Participa en decisiones que impactarán directamente en la conservación y protección de nuestro planeta.
                                                </p>
                                            </div>
                                            <div className='flex items-center justify-center ml-4'>
                                                <Button variant='secondary' href='/proposal'>
                                                    Explorar propuestas
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Minicard 3 */}
                                <div className='flex rounded-lg bg-tan-950/[.01] shadow-inner-blur'>
                                    <div className='relative flex flex-col w-full overflow-hidden rounded-lg border border-tan-200/[.06] p-4'>
                                        <div className='flex items-center justify-between w-full'>
                                            <ShieldCheckIcon className='h-8 w-8' />
                                            <div className='flex flex-col w-full'>
                                                <h3 className='text-lg font-semibold text-text-tertiary text-left'>
                                                    Vota de manera segura
                                                </h3>
                                                <p className='mt-1 text-sm text-text-secondary text-left'>
                                                    Cada voto es registrado en la blockchain, asegurando transparencia y confianza en los resultados.
                                                </p>
                                            </div>
                                            <div className='flex items-center justify-center ml-4'>
                                                <Button variant='primary' href='/proposal'>
                                                    Ir a votar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Minicard 4 */}
                                <div className='flex rounded-lg bg-zinc-950/[.01] shadow-inner-blur'>
                                    <div className='relative flex flex-col w-full overflow-hidden rounded-lg border border-violet-200/[.06] p-4'>
                                        <div className='flex items-center space-x-2'>
                                            <InformationCircleIcon className='h-8 w-8' />
                                            <div>
                                                <h3 className='text-lg font-semibold text-text-tertiary'>
                                                    Gana tokens
                                                </h3>
                                                <p className='mt-1 text-sm text-text-tertiary'>
                                                    La propuesta ganadora recibirá un NFT que garantiza autoría y protege la idea como un certificado digital único.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
