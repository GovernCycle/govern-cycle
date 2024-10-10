'use client'

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { ContentPill } from '@/components/shared/ContentPill'
import { useState } from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { BellIcon, FingerPrintIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { PlayCircleIcon } from '@heroicons/react/20/solid'
import { CLIENTS } from '@/config'

import appScreenshot from '@/images/app-screenshot.png'
import cosmicButterfly from '@/images/cosmic-butterfly.png'
import { BeakerIcon } from '@heroicons/react/24/solid'

export const HomeHero = () => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <Container className='gap-16 pb-16 pt-20 sm:pb-20 lg:pt-28 '>
      {/* Text content */}
      <div>
        <div className='relative z-10 flex flex-col items-center '>
          <ContentPill
            text='Cambia el mundo con tu voto.'
            Icon={FingerPrintIcon}
          />
          <h1 className='mt-5 max-w-5xl text-center text-[2.75rem] font-bold leading-[1.125] text-text-secondary sm:text-5xl sm:leading-[1.125] md:text-6xl md:leading-[1.125] lg:text-[64px]'>
            Bienvenido a &nbsp;
            <span className='relative inline-block text-nowrap'>
              <span className='relative z-10 bg-gradient-to-b  from-cream-500 via-carafe-500 to-cream-500 bg-clip-text text-transparent'>
                GabbiiDAO
              </span>
              <span className='absolute -top-px left-0 -z-10 text-charcoal-200'>
                GabbiiDAO
              </span>
            </span>
          </h1>
          <p className='mt-5 max-w-xl text-center text-[17px] leading-8 text-text-tertiary sm:text-lg sm:leading-8'>
          Nuestra plataforma de gobernanza descentralizada utiliza tecnología de Internet Identity y blockchain para garantizar que cada voto sobre propuestas ambientales sea auténtico y seguro.
</p>
          <div className='mt-8 flex items-center justify-center space-x-3 sm:space-x-5'>
            <Button id='top-cta' href='/signup'>
              {' '} 
              Comienza a votar{' '}
            </Button>
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
                  src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
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
    </Container>
  )
}
