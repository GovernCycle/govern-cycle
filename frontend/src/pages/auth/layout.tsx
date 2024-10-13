import Image from 'next/image'
import { HeroContainer } from '@/components/shared/HeroContainer'
import { Button } from '@/components/shared/Button'
import { Constellation } from '@/components/auth/Constellation'
import { XMarkIcon } from '@heroicons/react/24/solid'

// import spaceSpotlight from '@/images/space-spotlight.png'
import spaceSpotlight from '@/images/space-spotlight.png'
import forestLignthing from '@/images/forest-light-background.png'
import forestSingUp from '@/images/forest-sing-up.webp'

export default function AuthLayout({
  children,

}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HeroContainer
      header={false}
      starField={true}
      starfieldWhite={true}
      form={true}
      className='flex min-h-screen items-center justify-center overflow-hidden py-16 sm:py-20'
      bgGradientClassName='-top-48 bottom-0 h-[calc(100%_+_320px)]'
      innerContainerClassName='w-full overflow-hidden sm:overflow-visible'
    >
      <div className='absolute bottom-0 left-0 right-0 z-0'>
        <Image
          src={forestLignthing}
          alt=''
          className='w-full h-auto object-cover scale-150 '
          sizes='(max-width: 1024px) 100vw, 1024px'
          priority
        />
      </div>
      <div className='absolute bottom-0 left-0 right-0 z-3'>
        <Image
          src={forestSingUp}
          alt=''
          className='w-full h-auto object-cover'
          sizes='(max-width: 1024px) 100vw, 1024px'
          priority
        />
      </div>


      <Constellation />
      <Button
        href='/'
        variant='secondary'
        size='md'
        className='absolute right-4 top-4 hidden p-2 sm:flex lg:right-12 lg:top-12 lg:p-2.5'
      >
        <XMarkIcon className='h-4.5 w-4.5 lg:h-5 lg:w-5' />
      </Button>

      {children}
    </HeroContainer>
  )
}
