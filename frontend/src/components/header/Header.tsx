import Link from 'next/link'
import Image from 'next/image'
import { NavbarPill } from '@/components/header/NavbarPill'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { InternetIdentityButton, useAuth, LogoutButton } from '@bundly/ares-react';

import logo from '@/images/logo.png'
import { useContext, useEffect, useState } from 'react'
import { defaultUser, UserContext } from '@app/context/userContext'
import { useHome } from '@app/hooks/useHome'

export const Header = () => {

  const { currentIdentity, isAuthenticated } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { getProfile } = useHome();
  const handleSuccess = async () => {
    setIsLogged(true);
    try {
      const result = await getProfile();
      if ('ok' in result && 'User' in result.ok) {
        setUser(result.ok.User);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    if (isAuthenticated) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }
    , [isAuthenticated])
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
              <Image src={logo} alt='' className='h-12 w-auto lg:h-15' />
            </Link>
          </div>

          <NavbarPill isLogged={isLogged} setIsLogged={setIsLogged} />

          <div className='hidden items-center md:flex lg:space-x-3 xl:space-x-4'>
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <div className={`${isLogged ? 'hidden' : ''}`}>

                <InternetIdentityButton
                  onSuccess={handleSuccess}
                  style={
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
                  } />
              </div>
              <div className={`${!isLogged ? 'hidden' : ''} flex items-center space-x-2`}>

                <span className='font-bold bg-yellow-700 hover:bg-yellow-900 rounded-full p-2 text-white'>Logged in as {currentIdentity.getPrincipal().toString().slice(0, 5)}</span>
                <LogoutButton
                  identity={currentIdentity}
                  style={
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
                  } />
              </div>


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