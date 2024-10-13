import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { StarField } from '@/components/shared/StarField'
import {
  UsersIcon,
  CursorArrowRippleIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'

import graphic from '@/images/features-graphic.png'
import cosmicButterfly from '@/images/cosmic-butterfly.png'
import spaceSpotlight from '@/images/space-spotlight.png'

const features = [
  {
    icon: UsersIcon,
    title: 'Regístrate de forma segura. ',
    description:
      'Usa Internet Identity para garantizar que tu identidad esté protegida en cada proceso.',
  },
  {
    icon: CursorArrowRippleIcon,
    title: 'Explora propuestas ambientales.',
    description:
      'Participa en decisiones que impactarán directamente en la conservación y protección de nuestro planeta',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Vota de manera segura.',
    description:
      'Cada voto es registrado en la blockchain, asegurando transparencia y confianza en los resultados.',
  },
  {
    icon: SparklesIcon,
    title: 'Gana tokens.',
    description:
      'Por cada voto, recibirás un token de recompensa, contribuyendo a tu participación activa en nuestra comunidad.',
  },

]

export function Features() {
  return (
    <section className='relative overflow-hidden bg-[linear-gradient(#FFFEEF,#B49870))]'>
      <Container className='pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24'>


        {/* Graphic */}
        <div className='relative mt-5 w-full rounded-xl border border-tan-200/[.08] bg-cream/[.01] p-1 shadow-inner-blur sm:mt-16 sm:rounded-2xl sm:p-2 lg:mt-18'>

          {/* Stars */}
          <div
            className='absolute -top-60 left-1/2 -z-10 h-56 w-full max-w-3xl -translate-x-1/2'
            aria-hidden='true'
          >
            <StarField density='medium' maxRadius={3} />
          </div>

          <Image
            src={graphic}
            alt='Collaboration interface with user profile images'
            className='relative h-auto w-full rounded-lg'
            sizes='(max-width: 1024px) 100vw'
          />
        </div>

        {/* Text content */}
        <div className='relative flex flex-col items-center'>
          <h1 className='max-w-5xl text-center text-4xl font-bold leading-extratight text-text-secondary sm:text-5xl sm:leading-extratight'>
            Aprende cómo participar en decisiones ambientales seguras y recibe
            <span className='relative inline-block text-nowrap'>
              <span className='relative z-10 bg-gradient-to-b from-cream-400 via-carafe-400 to-cream-500 bg-clip-text text-transparent'>
                recompenzas
              </span>
              <span className='absolute -top-px left-0 -z-10 text-carafe-500'>
                recompenzas
              </span>
            </span>
          </h1>
          <p className='mt-5 max-w-xl text-center text-lg leading-8 text-text-tertiary'>
            ¿Cómo funciona? Es bastante simple.
          </p>
        </div>
        {/* Features */}
        <div className='relative mx-auto mt-10 grid max-w-lg grid-cols-1 gap-x-6 gap-y-5 sm:mt-16 sm:max-w-2xl sm:grid-cols-2 sm:gap-y-9 md:mt-18 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {features.map((feature, index) => (
            <div key={`feature-${index}`}>
              <feature.icon className='-mt-0.5 mr-1.5 inline h-5 w-5 shrink-0 text-text-primary sm:h-[21px] sm:w-[21px] ' />
              <p className='inline text-[17px] leading-7 text-text-tertiary md:text-lg md:leading-8 '>
                <span className='font-semibold text-text-primary'>
                  {feature.title}
                </span>{' '}
                {feature.description}
              </p>
            </div>
          ))}
          {/* Stars */}
          <div
            className='absolute -top-30 left-1/2 -z-10 h-56 w-full max-w-3xl -translate-x-1/2'
            aria-hidden='true'
          >
            <StarField density='medium' maxRadius={1} />
          </div>
        </div>
      </Container>
    </section>
  )
}