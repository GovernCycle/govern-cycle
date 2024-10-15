import Link from 'next/link'
import Image from 'next/image'
import { NavbarPill } from '@/components/header/NavbarPill'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { InternetIdentityButton } from '@bundly/ares-react';

import logo from '@/images/logo.png'

export const Header = () => {
  return (
    <header className='relative h-20'>
      <Container className='flex h-full items-center'>
        <nav className='relative z-50 flex w-full items-center justify-between'>
          {/* Logo */}
          <div className='relative z-20 hidden shrink-0 items-center md:flex'>
            <Link
              href='/'
              aria-label='Home'
              className='flex flex-shrink-0 items-center'
            >
              <Image src={logo} alt='' className='h-7 w-auto lg:h-8' />
            </Link>
          </div>

          <NavbarPill />

          <div className='hidden items-center md:flex lg:space-x-3 xl:space-x-4'>
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <InternetIdentityButton style={
                {
                  color: 'white',
                  backgroundColor: 'var(--color-button-primary)',
                  border: '1px solid white',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden' 
                }
              }/>

            </div>

            {/* Call to action */}
            <Button href='/auth/signup' size='lg' variant='secondary'>
              Sign up
            </Button>
          </div>
        </nav>
        <hr className='absolute inset-x-0 bottom-0 h-3px border-0 bg-gradient-to-r from-transparent via-carafe-500 to-transparent' />
      </Container>
    </header>
  )
}