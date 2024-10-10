import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'

import spaceSpotlight from '@/images/space-spotlight.png'

export function FooterCTA() {
  return (
    <>
      <Container className='py-16 sm:py-20 lg:py-24'>
        {/* Text content */}
        <div className='relative z-10 flex flex-col items-center'>
          <h1 className='max-w-5xl text-center text-4xl font-bold leading-extratight text-carafe-400 sm:text-5xl sm:leading-tight'>
            <br />
            Únete a &nbsp;
            <span className='relative inline-block text-nowrap'>
              <span className='relative z-10 bg-gradient-to-b from-cream-500 via-carafe-500 to-cream-500 bg-clip-text text-transparent'>
                Gabbii.
              </span>
              <span className='absolute -top-px left-0 -z-10 text-charcoal-200'>
                Gabbii.
              </span>
            </span>
          </h1>
          <p className='mt-5 max-w-xl text-center text-[17px] leading-8 text-text-tertiary sm:text-lg sm:leading-8'>
          Sé parte de la solución a los desafíos ambientales de nuestro tiempo. En Gabbii, tu voz cuenta, y tus acciones hacen la diferencia.
          </p>
          <div className='mt-8 flex items-center justify-center space-x-3 sm:space-x-5'>
            <Button href='/signup'> Registrate </Button>
          </div>
        </div>
      </Container>


    </>
  )
}
