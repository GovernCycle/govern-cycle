import Image from 'next/image'
import { Header } from '@/components/header/Header'
import { StarField } from '@/components/shared/StarField'
import { cn } from '@/lib/utils'
import spaceWavesPng from '@/images/hero-space-waves.png'

interface HeroContainerProps {
  starField?: boolean
  header?: boolean
  starfieldWhite?: boolean
  form?: boolean
  bgGradientClassName?: string
  innerContainerClassName?: string
  className?: string
  children?: React.ReactNode
}

export const HeroContainer = ({
  starField = true,
  header = true,
  form = false,
  starfieldWhite = false,
  bgGradientClassName = '',
  innerContainerClassName = '',
  className,
  children,
}: HeroContainerProps) => {
  return (
    <section className={cn('relative', className)}>
      {header && <Header />}

      <div className={cn('overflow-hidden', innerContainerClassName)}>
        {starField && form && (
          <div className='absolute inset-0 z-0 bg-[var(--color-background-ternary)]' aria-hidden='true'>
            {/* <StarField /> */}
          </div>
        )}
        {starField && !form && (
          <div className='absolute inset-0 -z-10 bg-[var(--color-background-primary)]' aria-hidden='true'>
            <StarField />
          </div>
        )}


        {children}
      </div>
    </section>
  )
}