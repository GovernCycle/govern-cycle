import Link from 'next/link'
import Image from 'next/image'
import { NavbarPill } from '@/components/header/NavbarPill'
import { Container } from '@/components/shared/Container'
import { InternetIdentityButton, useAuth, LogoutButton } from '@bundly/ares-react';

import logo from '@/images/logo.png'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@app/context/userContext'
import { useHome } from '@app/hooks/useHome'
import { SignupButton } from '../shared/SignupButton'
import { useRouter } from 'next/router';

export const Header = () => {

  const { currentIdentity, isAuthenticated } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const { user, setUser, logout } = useContext(UserContext);
  const { getProfile } = useHome();
  const router = useRouter();

  const handleSuccess = async () => {
    setIsLogged(true);
    try {
      const result = await getProfile();
      if ('ok' in result && 'User' in result.ok) {
        setUser(result.ok.User);
        router.reload();

      }
    }
    catch (e) {
      console.log(e);
    }

  }

  const handleLogout = () => {
    logout();
    setIsLogged(false);
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
    <header className='relative h-20 '>
      <Container className='flex h-full items-center '>
        <nav className='relative z-50 flex w-full items-center justify-between '>
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
                  style={{
                    color: 'white',
                    backgroundImage: 'linear-gradient(180deg, var(--color-button-ternary) 60%, var(--color-button-fourth) 100%)',
                    border: '1px solid white',
                    borderRadius: '0.8rem',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.3s ease, transform 0.2s ease',
                  }}>
                  Inicia sesión
                </InternetIdentityButton>
              </div>
              <div className={`${!isLogged ? 'hidden' : ''} flex items-center space-x-2`}>


                <button onClick={handleLogout}>
                  <span className=" bg-gradient-to-b w-auto max-w-40 
             rounded-xl p-2 text-black mx-4"> Usuario: {currentIdentity.getPrincipal().toString().slice(0, 5)}</span>
                  <SignupButton />
                  <LogoutButton
                    identity={currentIdentity}
                    style={{
                      color: 'white',

                      backgroundImage: 'linear-gradient(180deg, var(--color-button-ternary) 40%, #FF6347 90%)',
                      border: '1px solid white',
                      borderRadius: '0.8rem',
                      padding: '0.5rem 1rem',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'background 0.3s ease, transform 0.2s ease',
                    }} />
                </button>
              </div>


            </div>

            {/* Call to action */}



          </div>
        </nav>
        <hr className='absolute inset-x-0 bottom-0 h-3px border-0 bg-gradient-to-r from-transparent via-carafe-500 to-transparent' />
      </Container>
    </header>
  )
}