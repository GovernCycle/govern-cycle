'use client'

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { useEffect } from 'react'
import { Proposal, StateProposal } from '@app/declarations/proposal/proposal.did'



import {
  GlobeAmericasIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid'


import globeGlow from '@/images/globe-glow.svg?url'
import { Jurisdiction } from '@app/declarations/home/home.did'
import Link from 'next/link'

export const ProposalCard = ({
  proposal
}: {
  proposal: [bigint, Proposal]
}) => {
  const handleCardMouseMove = (event: MouseEvent) => {
    const card = event.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cards = document.querySelectorAll<HTMLDivElement>('.card')
      cards.forEach((card) => {
        card.addEventListener('mousemove', handleCardMouseMove)
      })

      return () => {
        cards.forEach((card) => {
          card.removeEventListener('mousemove', handleCardMouseMove)
        })
      }
    }
  }, [])

  const renderState = (state: StateProposal) => {
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


  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toDateString();
  }

  const renderEnvironmentalUnits = (environmentalUnits: bigint) => {
    return `${environmentalUnits} Unidades Ambientales`
  }

  const renderArray = (label: string, values: [] | [string]) => {
    if (values[0] === '') {
      return
    }
    return <p>{label}: {values.join(', ')}</p>;
  };

  const renderLocation = (location: Jurisdiction[]) => {
    return location.map((loc, index) => (
      <div key={index}>
        {renderArray('Región', loc.region)}
        {renderArray('País', loc.country)}
        {renderArray('Continente', loc.continent)}
      </div>
    ));
  };


  return (
    <section className='relative overflow-hidden'>
      <Container className='py-20 sm:py-24'>
        {/* grid */}
        <div className='cards space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0'>
          {/* Card 1 - full-width */}
          <div className="card relative col-span-2 overflow-hidden rounded-xl bg-charcoal-500 p-[1.5px] before:absolute before:left-0 before:top-0 before:z-30 before:h-full before:w-full before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-500 after:content-[''] hover:before:opacity-100 hover:after:opacity-100">
            <div className='relative z-30 w-full overflow-hidden rounded-xl bg-white/[0.1] shadow-inner-blur-no-border backdrop-blur-lg backdrop-brightness-50'>
              <div className='absolute inset-0 -z-10 opacity-60'>
                <Image src={globeGlow} alt='' className='h-full w-full' />
              </div>
              <div className='grid h-full w-full grid-cols-12 rounded-xl lg:gap-12 xl:grid-cols-2 xl:gap-20'>
                {/* Card content */}
                <div className='col-span-12 px-8 pb-4 pt-10 sm:px-10 sm:pt-12 lg:col-span-7 lg:py-12 lg:pr-0 xl:col-span-1 xl:py-16 xl:pl-12'>
                  <div>
                    <p className='text-sm font-bold text-cream-500'>
                      <span className='relative inline-block text-nowrap'>
                        <span className='relative z-10 bg-gradient-to-b from-charcoal-500 via-cream-500 to-charcoal-500 bg-clip-text leading-none text-transparent'>
                          {
                            `${formatDate(proposal[1].startDate)} - ${formatDate(proposal[1].deadline)}`
                          }
                        </span>
                      </span>
                    </p>
                    <h3 className='mt-3 text-4xl font-bold text-cream-500 sm:mt-4'>
                      {proposal[1].name}
                    </h3>
                    <p className='mt-2 text-base text-text-accent sm:mt-3'>
                      {proposal[1].description}
                    </p>

                    {/* Features */}
                    <div className='mt-6 grid gap-x-2 gap-y-4 sm:mt-7 sm:grid-cols-2 sm:gap-y-5'>
                      <div className='flex items-center space-x-2'>
                        <GlobeAmericasIcon className='h-4 w-4 text-tan-500' />
                        <p className='text-sm font-medium text-tan-500'>
                          {
                            renderState(proposal[1].state)
                          }
                        </p>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <ChatBubbleLeftRightIcon className='h-4 w-4 text-tan-500' />
                        <p className='text-sm font-medium text-tan-500'>
                          {renderEnvironmentalUnits(proposal[1].environmentalUnits)}
                        </p>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <CircleStackIcon className='h-4 w-4 text-tan-500' />
                        <p className='text-sm font-medium text-tan-500'>
                          {renderLocation(proposal[1].location)}
                        </p>
                      </div>
                    </div>

                    <div className='relative z-50 mt-9 sm:mt-10 flex items-center space-x-16 justify-center'>
                      {/* Botón */}
                      <Link href={`/proposal/${proposal[0].toString()}`}>
                        <Button
                          variant='secondary'
                          size='md'
                          className='relative z-50 cursor-pointer'
                        >
                          <span>Más información</span>
                          <ChevronRightIcon className='h-4 w-4' />
                        </Button>
                      </Link>

                      {/* Checkbox*/}
                    </div>

                  </div>
                </div>

                {/* proposal photo */}
                <div className='relative col-span-12 h-64 lg:col-span-5 lg:h-auto xl:col-span-1'>
                  <div className='relative mt-12 h-96 w-full -rotate-2 rounded-2xl bg-white/[.01] shadow-inner-blur sm:mt-14'>
                    <div className='h-full w-full rounded-2xl border border-violet-200/[.08] p-2'>
                      <div className='absolute -bottom-48 -left-48 -right-16 -top-36'>
                      </div>
                      <img src={proposal[1].photo} alt='Proposal Photo' className='object-cover w-full h-full rounded-2xl' />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}