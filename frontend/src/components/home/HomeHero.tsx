'use client'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { ContentPill } from '@/components/shared/ContentPill'
import { useState } from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import {
  BellIcon,
  ChevronRightIcon,
  FingerPrintIcon,
  SparklesIcon,
  XMarkIcon,
  InformationCircleIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  GlobeAsiaAustraliaIcon,
  GlobeEuropeAfricaIcon,
  PlusIcon
} from '@heroicons/react/16/solid'
import { PlayCircleIcon } from '@heroicons/react/20/solid'
import { CLIENTS } from '@/config'
import Link from 'next/link'


export const HomeHero = () => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <Container className='gap-16 pb-16 sm:pb-20 '>
      <div>
        <section className='relative overflow-hidden'>
          <Container className='py-20 sm:py-24'>
            {/* Grid container */}
            <div className='relative mx-auto mt-1 max-w-2xl sm:mt-2 lg:mt-[0px] lg:max-w-none'>
              {/* Cards grid */}
              <div className='cards space-y-2 grid gap-6 grid-cols-1 lg:grid-cols-2 lg:gap-2 lg:space-y-0'>

                {/* Card 1 */}
                <div className="card relative col-span-1 overflow-hidden rounded-xl bg-transparent p-[1.5px]">
                  <div className='relative z-20 h-full w-full overflow-hidden rounded-xl'>
                    <div className='flex h-full w-full flex-col rounded-xl'>


                      {/* Card content */}
                      <div className='px-8 pb-8 pt-10 sm:px-10 sm:pt-0 xl:px-0 xl:pt-0'>                        
                        <div>
                          <div className='grid grid-cols-1 gap-4'>
                            {/* Minicard 1 */}
                            <div className='px-8 pb-8 pt-10 sm:px-10 sm:pt-0 xl:px-0 xl:pt-0'>
                              <GlobeEuropeAfricaIcon className='h-20 w-20 mx-auto text-tan-500' />
                              <h3 className='text-lg font-semibold text-text-tertiary text-center mb-5'>
                                Salvar el medio ambiente nunca había sido tan fácil:
                              </h3>

                              <div className='grid grid-cols-1 gap-4'>
                                {/* Minicard 1 */}
                                <div className='flex rounded-lg bg-tan-950/[.01] shadow-inner-blur'>
                                  <div className='relative flex flex-col w-full overflow-hidden rounded-lg border border-tan-200/[.06] p-4'>
                                    <div className='flex items-start space-x-2'>
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
                              </div>
                            </div>



                            {/* Minicard 2 */}
                            <div className='flex rounded-lg bg-tan-950/[.01] shadow-inner-blur'>
                              <div className='relative flex flex-col w-full overflow-hidden rounded-lg border border-tan-200/[.06] p-4'>
                                <div className='flex items-start justify-between'>
                                  {/* Heroicon */}
                                  <CursorArrowRaysIcon className='h-8 w-8' />

                                  {/* Texto y botón */}
                                  <div className='flex flex-col w-full'>
                                    <h3 className='text-lg font-semibold text-text-tertiary text-left'>
                                      Explora propuestas ambientales
                                    </h3>
                                    <p className='mt-1 text-sm text-text-secondary text-left'>
                                      Participa en decisiones que impactarán directamente en la conservación y protección de nuestro planeta.
                                    </p>
                                  </div>

                                  {/* Contenedor del botón */}
                                  <div className='flex items-center ml-4'>
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
                                <div className='flex items-start justify-between'>
                                  {/* Heroicon */}
                                  <ShieldCheckIcon className='h-8 w-8' />

                                  {/* Texto y botón */}
                                  <div className='flex flex-col w-full'>
                                    <h3 className='text-lg font-semibold text-text-tertiary text-left'>
                                      Vota de manera segura
                                    </h3>
                                    <p className='mt-1 text-sm text-text-secondary text-left'>
                                      Cada voto es registrado en la blockchain, asegurando transparencia y confianza en los resultados.
                                    </p>
                                  </div>

                                  {/* Contenedor del botón */}
                                  <div className='flex items-center ml-4'>
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
                                <div className='flex items-start space-x-2'>
                                  {/* Heroicon */}
                                  <InformationCircleIcon className='h-8 w-8' />
                                  {/* Texto */}
                                  <div>
                                    <h3 className='text-lg font-semibold text-text-tertiary'>Gana tokens</h3>
                                    <p className='mt-1 text-sm text-text-tertiary'>
                                      La propuesta ganadora, recibirá un NFT que garantiza autoría y protege la idea como un certificado digital único.
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
                </div>

                {/* Card 2 */}
                <div className="card relative col-span-1 rounded-xl bg-transparent p-[1.5px]">
                  <div className='relative z-10 w-full rounded-xl'>
                    <div className='flex flex-col w-full rounded-xl'>
                      {/* Card content */}
                      <div className='px-8 pb-10 pt-8 sm:px-10 sm:pb-12 xl:px-12'>
                        <div>
                          <h3 className='mt-5 max-w-5xl text-center text-[2.75rem] font-bold leading-[1.125] text-text-secondary sm:text-2xl sm:leading-[1.125] md:text-6xl md:leading-[1.125] lg:text-[50px]'>
                            Bienvenido a &nbsp;
                            <span className='relative inline-block text-nowrap'>
                              <span className='relative z-10 bg-gradient-to-b  from-cream-500 via-carafe-500 to-cream-500 bg-clip-text text-transparent'>
                                GabbiiDAO
                              </span>
                              <span className='absolute -top-px left-0 -z-10 text-charcoal-200'>
                                GabbiiDAO
                              </span>
                            </span>
                          </h3>


                          <p className='mt-5 max-w-xl text-center text-[17px] leading-8 text-text-tertiary sm:text-lg sm:leading-8'>
                            Nuestra plataforma de gobernanza descentralizada utiliza tecnología de Internet Identity y blockchain para garantizar que cada voto sobre propuestas ambientales sea auténtico y seguro.
                          </p>

                          <div className='mt-8 flex items-center justify-center space-x-3 sm:space-x-5'>

                            <Button
                              variant='tertiary'
                              onClick={() => setIsOpen(true)}
                              className='overflow-hidden'
                            >
                              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-cream transition duration-200 ease-in-out group-hover:text-text-tertiary'>
                                <PlayCircleIcon className='h-5 w-5 text-text-secondary' />
                              </span>
                              <span>¿Qué es internet Identity?</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>


        {/* Video modal*/}
        <Dialog
          className='fixed inset-0 z-50 h-full w-full overflow-hidden px-4 transition duration-150 ease-linear'
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {/* Modal overlay */}
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-black/30 backdrop-blur-sm transition duration-300 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in'
          />
          <div className='mx-auto flex min-h-screen w-auto items-center justify-center'>
            <DialogPanel
              transition
              className='relative max-h-full w-full max-w-5xl rounded-2xl bg-white/[.02] p-2 shadow-inner-blur transition duration-300 ease-out after:absolute after:inset-0 after:rounded-2xl after:border after:border-violet-200/[.04] data-[closed]:translate-y-40 data-[closed]:scale-75 data-[closed]:opacity-0'
            >
              <Button
                variant='secondary'
                size='md'
                className='absolute -top-12 right-2 z-50 flex p-2 lg:-top-14 lg:p-2.5'
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className='h-4.5 w-4.5' />
              </Button>
              <div className='relative z-50 aspect-[16/9] rounded-lg'>
                <iframe
                  className='absolute h-full w-full rounded-lg'
                  allow='autoplay'
                  title='Video'
                  src='https://www.youtube.com/embed/oxEr8UzGeBo?autoplay=1'
                ></iframe>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      {/* Social proof */}
      <div className='relative mx-auto mt-20 max-w-5xl overflow-hidden sm:mt-24 sm:px-10 lg:mt-28'>
        <p className='text-center text-[13px] font-bold uppercase tracking-wide text-brown-50/80 sm:text-sm sm:font-extrabold sm:tracking-wider'>
          Conoce a nuestros socios
        </p>

        {/* Logos */}
        <div className='relative mt-8 overflow-hidden [mask:linear-gradient(90deg,_transparent,_white_20%,_white_80%,_transparent)]'>
          <div className='flex w-max animate-infiniteScroll items-center justify-around'>
            {[...Array(2)].map((_, index) => (
              <div
                key={`homehero-clients-col-${index}`}
                className='flex w-1/2 items-center'
              >
                {CLIENTS.map((client) => (
                  <client.logo
                    key={`homehero-${client.name}-${index}`}
                    className='mx-3 scale-90 sm:mx-6 sm:scale-100'
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container >

  )
}
