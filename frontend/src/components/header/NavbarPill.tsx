'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, Fragment, useContext } from 'react'
import { getOffsetTop } from '@/lib/utils'
// @ts-ignore
import { debounce, throttle } from 'lodash'

import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Menu,
  MenuItems,

} from '@headlessui/react'

import logo from '@/images/logo.png'
import logoIcon from '@/images/logo-icon.png'
import { InternetIdentityButton, LogoutButton, useAuth } from '@bundly/ares-react'
import { UserContext } from '@app/context/userContext'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Propuestas', href: '/proposal' },
  { label: 'Perfil', href: '/profile' },

]



function Hamburger() {
  return (
    <PopoverButton
      className='group relative z-50 ml-4 h-3.5 w-5 rotate-0 transform cursor-pointer transition duration-500 ease-in-out focus:outline-none'
      aria-label='Toggle Navigation'
    >
      <span className='absolute left-0 top-0 block h-0.5 w-full rotate-0 transform rounded-full bg-tan-50/95 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-cream group-data-[open]:left-1/2 group-data-[open]:top-1 group-data-[open]:w-0'></span>
      <span className='absolute left-0 top-1.5 block h-0.5 w-full rotate-0 transform rounded-full bg-tan-50/95 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-cream group-data-[open]:rotate-45'></span>
      <span className='absolute left-0 top-1.5 block h-0.5 w-full rotate-0 transform rounded-full bg-tan-50/95 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-cream group-data-[open]:-rotate-45'></span>
      <span className='absolute left-0 top-3 block h-0.5 w-full rotate-0 transform rounded-full bg-tan-50/95 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-cream group-data-[open]:left-1/2 group-data-[open]:top-1.5 group-data-[open]:w-0'></span>
    </PopoverButton>
  )
}

function MobileNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton
      as={Link}
      href={href}
      className='px-1.5 pb-2 pt-4 text-[15px] font-medium text-cream drop-shadow-[-4px_-4px_6px_rgba(237,233,254,0.2)] duration-200 ease-in-out hover:text-text-inverse'
    >
      {children}
    </PopoverButton>
  )
}

function MobileNavigation() {
  return (
    <div className='absolute inset-x-0 top-[60px] z-30 mx-5 flex justify-center sm:mx-6 md:hidden'>
      <PopoverPanel
        transition
        className='w-full max-w-lg overflow-hidden rounded-xl  px-5 pb-5 pt-4 shadow-inner-blur backdrop-blur-lg backdrop-brightness-[85%] transition-all duration-300 after:absolute after:inset-0 after:rounded-xl after:border after:border-violet-200/[.06] data-[closed]:-translate-y-16 data-[closed]:scale-90 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:left-6 sm:right-6 sm:mx-6'
      >
        <nav className='relative z-10 flex flex-col divide-y divide-charcoal-200/5'>
          {links.map((link, index) => (
            <MobileNavItem key={`mobile-navbar-link-${index}`} href={link.href}>
              {link.label}
            </MobileNavItem>
          ))}


        </nav>
      </PopoverPanel>
    </div>
  )
}

function DropDownMenu({
  dropdownGap,
  dropdownPadding,
}: {
  dropdownGap: number
  dropdownPadding: number
}) {
  return (
    <MenuItems
      className='fixed z-20 hidden w-48 space-y-0.5 rounded-lg bg-[#375257]/90 py-2.5 shadow-inner-blur outline-none backdrop-blur-lg backdrop-brightness-[85%] transition-all ease-in-out after:absolute after:inset-0 after:rounded-lg after:border after:border-cream-500/[.06] focus:outline-none data-[closed]:-translate-y-2 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block'
      transition
      style={{
        top: `${dropdownGap}px`,
        left: `${dropdownPadding}px`,
      }}
      modal={false}
    >


    </MenuItems>
  )
}

export const NavbarPill = ({
  isLogged,
  setIsLogged,
}: {

  isLogged: boolean
  setIsLogged: (value: boolean) => void

}) => {
  const { isAuthenticated, currentIdentity } = useAuth();
  const { user, setUser } = useContext(UserContext);

  const isTechnicalSeccretariat = user.role.some(role => 'TechnicalSecretariat' in role);
  const isApproved = 'Approved' in user.state;

  const navlinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Propuestas', href: '/proposal' },
    { label: 'Perfil', href: '/profile' },
    // Agregar el enlace al dashboard de administración si el usuario es TechnicalSecretariat y está aprobado
    ...(isTechnicalSeccretariat && isApproved ? [{ label: 'Dashboard', href: '/admin/dashboard' }] : []),
  ];

  const handleSuccess = () => {
    setIsLogged(true);
  }
  useEffect(() => {
    if (isAuthenticated) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }
    , [isAuthenticated])
  const pathname = usePathname()
  // Initialize to true in order to dynamically get width of the cta button
  const [showButton, setShowButton] = useState(true)
  const [dropdownGap, setDropdownGap] = useState<number>(0)
  const [dropdownPadding, setDropdownPadding] = useState<number>(0)
  const mainCtaOffsetRef = useRef<number>(80)
  const pillWidthRef = useRef<number>(0)
  const pillExpandedWidthRef = useRef<number>(0)
  const pillNavRef = useRef<HTMLDivElement | null>(null)
  const navCtaContainerRef = useRef<HTMLDivElement | null>(null)
  const navCtaWidthRef = useRef<number>(0)
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null)

  const isLargeScreen = () => window.innerWidth > 768

  const shouldShowNavCta = () =>
    window.scrollY > mainCtaOffsetRef.current && isLargeScreen()

  const setPillNavWidth = () => {
    if (pillNavRef.current) {
      pillNavRef.current.style.width = shouldShowNavCta()
        ? `${pillExpandedWidthRef.current}px`
        : `${pillWidthRef.current}px`
    }
  }

  const updateDimensions = () => {
    if (pillNavRef.current && navCtaContainerRef.current) {
      const topCta = document.getElementById('top-cta')
      if (topCta) {
        mainCtaOffsetRef.current = getOffsetTop(topCta) + topCta.offsetHeight
      }

      const pillWidth = (pillNavRef.current.firstElementChild as HTMLElement)
        .offsetWidth

      if (navCtaContainerRef.current.childNodes.length > 0) {
        // When CTA button is showing
        pillExpandedWidthRef.current = pillWidth
        pillWidthRef.current =
          pillExpandedWidthRef.current - navCtaWidthRef.current
      } else {
        // When CTA button is not showing
        pillWidthRef.current = pillWidth
        pillExpandedWidthRef.current =
          navCtaWidthRef.current + pillWidthRef.current
      }
    }
  }

  const handleResize = debounce(() => {
    if (isLargeScreen()) {
      setTimeout(() => {
        updateDimensions()
        setShowButton(shouldShowNavCta())
        setPillNavWidth()
        updateDropdownPosition()
      }, 300)
    } else {
      setShowButton(false)
      if (pillNavRef.current) {
        pillNavRef.current!.style.width = '100%'

        setTimeout(() => {
          updateDimensions()
          setPillNavWidth()
        }, 300)
      }
    }
  }, 50)

  const handleScroll = throttle(() => {
    if (window.innerWidth <= 768) return
    setShowButton(window.scrollY > mainCtaOffsetRef.current)
    setPillNavWidth()
  }, 100)

  const updateDropdownPosition = () => {
    const pillNav = pillNavRef.current
    const dropdownButton = dropdownButtonRef.current

    if (pillNav && dropdownButton) {
      const buttonRect = dropdownButton.getBoundingClientRect()
      const buttonStyle = window.getComputedStyle(dropdownButton)

      setDropdownGap(buttonRect.top + pillNav.offsetHeight + 8)
      setDropdownPadding(buttonRect.left + parseInt(buttonStyle.paddingLeft))
    }
  }

  useEffect(() => {
    if (!pillNavRef.current || !navCtaContainerRef.current) return

    const topCta = document.getElementById('top-cta')
    if (topCta) {
      mainCtaOffsetRef.current = getOffsetTop(topCta) + topCta.offsetHeight
    }

    pillWidthRef.current = pillNavRef.current.offsetWidth
    navCtaWidthRef.current = navCtaContainerRef.current.offsetWidth || 0
    pillExpandedWidthRef.current = navCtaWidthRef.current + pillWidthRef.current

    setShowButton(false)
    if (isLargeScreen()) {
      pillNavRef.current.style.width = `${pillWidthRef.current}px`
    }

    // Remove the invisible and absolute classes from the cta button
    navCtaContainerRef.current!.classList.remove('invisible', 'absolute')

    if (shouldShowNavCta()) {
      setShowButton(true)
      setPillNavWidth()
    }

    updateDropdownPosition()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      updateDropdownPosition()
    }, 500)
  }, [showButton])

  return (
    <Popover className='fixed left-0 flex w-full justify-center px-5 sm:px-6 md:px-0'>
      <Menu as={Fragment}>
        <div
          id='pill-nav'
          ref={pillNavRef}
          className='relative z-40 flex w-full max-w-lg items-center overflow-hidden rounded-full bg-charcoal-500 shadow-inner-blur backdrop-blur-lg backdrop-brightness-[85%] transition-[width] duration-500 ease-in-out after:absolute after:inset-0 after:z-10 after:rounded-full after:border after:border-brown-200/[.06] md:w-[unset] md:max-w-none'
        >
          <div className='flex h-full w-full items-center justify-between rounded-full pl-[18px] pr-5 text-text-accent md:w-fit md:justify-normal md:px-1.5'>
            {/* Logo mobile */}
            <div className='relative z-20 flex shrink-0 items-center md:hidden'>
              <Link
                href='/'
                aria-label='Home'
                className='flex flex-shrink-0 items-center py-2'
              >
                <Image
                  src={logo}
                  alt='Nebula Logo'
                  className='hidden h-[26px] w-auto min-[402px]:block'
                />
                <Image
                  src={logoIcon}
                  alt='Nebula Logo Icon'
                  className='h-[26px] w-auto min-[402px]:hidden'
                />
              </Link>
            </div>

            {navlinks.map((link, index) => (
              <Link
                key={`desktop-navbar-link-${index}`}
                href={link.href}
                className={clsx(
                  'relative z-40 hidden h-full items-center px-3 py-2.5 text-sm duration-200 ease-in-out md:inline-flex lg:px-4',
                  pathname === link.href
                    ? 'font-bold text-text-accent drop-shadow-[-4px_-4px_6px_var(--color-tan)]'
                    : 'font-semibold text-text-tan drop-shadow-[-4px_-4px_6px_rgba(250, 135, 22,0.2)] hover:text-tan-100/95'
                )}
              >
                {link.label}
                {pathname == link.href && (
                  <span className='absolute bottom-0 left-2 right-2 h-3px bg-gradient-to-r from-carafe-400/0 via-carafe-400/80 to-carafe-400/0' />
                )}
              </Link>
            ))}

            <div className='relative z-20 ml-1 flex items-center sm:ml-3 md:hidden'>
              <div className={`${isLogged ? 'hidden' : ''} p-1 `}>

                <InternetIdentityButton
                  onSuccess={handleSuccess}
                  style={
                    {
                      color: 'white',
                      backgroundColor: 'var(--color-button-primary)',
                      border: '1px solid white',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.5rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }
                  } >
                  Inicia sesión
                </InternetIdentityButton>
              </div>

              <div className={`${!isLogged ? 'hidden' : ''} flex items-center space-x-2 p-1`}>
                <span className=" bg-gradient-to-b w-auto max-w-40 
             rounded-xl p-2 text-white mx-4"> Usuario: {currentIdentity.getPrincipal().toString().slice(0, 5)}</span>
                <LogoutButton
                  identity={currentIdentity}
                  style={
                    {
                      color: 'white',
                      backgroundColor: 'var(--color-button-primary)',
                      border: '1px solid white',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.5rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }
                  }>
                  Cerrar sesión
                </LogoutButton>
              </div>


              <Hamburger />
            </div>

            <div
              className='invisible absolute hidden md:block'
              ref={navCtaContainerRef}
            >
              {/*<Transition show={showButton}>
   //Si queremos que al hacer scroll se muestre el botón de inicio de sesión y registro, debemos ingresar aquí código del botón.
              </Transition>*/}
            </div>
          </div>
        </div>

        {/* Pages dropdown */}
        <DropDownMenu
          dropdownGap={dropdownGap}
          dropdownPadding={dropdownPadding}
        />
      </Menu>

      <MobileNavigation />
    </Popover>
  )
}