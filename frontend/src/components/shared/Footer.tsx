import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { FooterCTA } from '@/components/shared/FooterCTA'
import { StarField } from '@/components/shared/StarField'
import { ContentPill } from '@/components/shared/ContentPill'
import { SOCIALS } from '@/config'

import logo from '@/images/logo.png'
import logoIcon from '@/images/logo-icon.png'

import browser from '@/icons/nucleo/browser-18.svg'
import company from '@/icons/nucleo/company-18.svg'
import integrations from '@/icons/nucleo/integrations-18.svg'
import resources from '@/icons/nucleo/resources-18.svg'
import scale from '@/icons/nucleo/scale-18.svg'

type Props = {
  cta?: boolean
}

const navigation = [
  {
    icon: browser,
    label: 'Plataforma',
    links: [
      { name: 'Propuestas activas', href: '/proposal' },
    ],
  },
  {
    icon: company,
    label: 'Comunidad',
    links: [
      // { name: 'Foro de usuarios', href: 'https://x.com/' },
    ],
  },
  {
    icon: integrations,
    label: 'Propuestas',
    links: [
      { name: 'Crear propuesta', href: '/createProposal' },
    ],
  },
  {
    icon: resources,
    label: 'Recursos',
    links: [
      { name: 'Crea tu Internet Identity', target: '_blank', href: 'https://www.youtube.com/watch?v=llJWe55VYsE', new: false}, 
      { name: 'Eventos', target: '_blank',  href: 'https://x.com/GabbiiDAO' },
    ],
  },
  {
    icon: scale,
    label: 'Legal',
    links: [
      // { name: 'Términos de uso', href: '#' },
    ],
  },
];

export function Footer({ cta = true }: Props) {
  return (
    <section className={clsx({ 'overflow-hidden': cta })}>
      <div className='relative'>
        {cta && <FooterCTA />}

        {/* Stars */}
        <div
          className='absolute -bottom-4 left-1/2 -z-10 h-48 w-full max-w-3xl -translate-x-1/2 md:-bottom-8 md:h-64 lg:-bottom-12'
          aria-hidden='true'
        >
          <StarField density='medium' maxRadius={2.5} />
        </div>
      </div>
      <div className='relative left-1/2 top-2 w-[350%] -translate-x-1/2 rounded-t-[100%] bg-gradient-to-r from-transparent via-charcoal-100/15 to-transparent p-[0.5px] sm:w-[250%] md:top-4 md:w-[200%] lg:top-10 lg:w-[150%] xl:w-[125%]'>
        <div className='h-full w-full rounded-t-[100%] bg-[linear-gradient(var(--color-charcoal),var(--color-charcoal)),linear-gradient(#375257,#375257)] pb-16 pt-24 sm:pt-28 md:pt-32 lg:pt-40'>
          <div className='mx-auto w-screen'>
            <div className='mx-auto max-w-lg px-5 sm:max-w-xl sm:px-6 md:max-w-3xl lg:max-w-screen-xl lg:px-8'>
              <div className='grid grid-cols-2 gap-12 sm:grid-cols-2 sm:gap-16 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 justify-center'>
                {navigation.map((navCol, navColIndex) => (
                  <div
                    key={`footer-navCol-${navColIndex}`}
                    className='flex lg:justify-center'
                  >
                    <div className='flex flex-col'>
                      <div className='flex items-center'>
                        <navCol.icon className='h-5 w-5' />
                        <h4 className='ml-4 flex flex-col align-middle text-sm font-semibold text-text-accent'>
                          {navCol.label}
                        </h4>
                      </div>
                      <div className='mt-6 flex items-start'>
                        <div className='relative flex h-full w-5 justify-center'>
                          <div className='absolute -inset-y-2 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-tan-200/[0.12] to-tan-200/[0.04]' />
                        </div>
                        <ul className='ml-4 space-y-5'>
                          {navCol.links.map((link, i) => (
                            <li
                              key={`footer-nav-item-${navColIndex}-${i}`}
                              className='group relative flex items-center'
                            >
                              <Link
                                href={link.href}
                                className='text-sm font-semibold leading-none text-text-accent hover:text-tan-400/95'
                                target={link.href.startsWith('http') && !link.href.includes(window.location.hostname) ? '_blank' : '_self'}
                                rel={link.href.startsWith('http') && !link.href.includes(window.location.hostname) ? 'noopener noreferrer' : undefined}
                              >
                                {link.name}
                              </Link>
                              {/* {link.new && (
                                <ContentPill
                                  className='ml-3'
                                  text='New'
                                  innerClassName='px-2 py-0.5'
                                  textClassName='text-xs text-violet-200'
                                />
                              )} */}
                              <span className='absolute -inset-y-1.5 -left-[26.5px] w-px bg-gradient-to-b from-cream-400/0 via-cream-400/90 to-cream-400/0 opacity-0 duration-200 ease-in-out group-hover:opacity-100' />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-16 block w-full rounded-2xl bg-carafe-600 shadow-inner-blur sm:mt-24'>
                <div className='flex w-full items-center justify-between space-x-5 rounded-2xl border border-carafe-200/[.06] px-6 py-4 sm:space-x-8 sm:px-8 sm:py-6'>
                  {/* Logo */}
                  <div className='flex shrink-0 items-center'>
                    <Link
                      href='/'
                      aria-label='Home'
                      className='flex flex-shrink-0 items-center'
                    >
                      <Image
                        src={logo}
                        alt=''
                        className='h-6 w-auto sm:inline sm:h-8 xl:h-10'
                      />
                      <Image
                        src={logoIcon}
                        alt=''
                        className='hidden h-8 w-auto'
                      />
                    </Link>
                  </div>
                  <div className='flex items-center space-x-5 sm:space-x-7 lg:space-x-6 xl:space-x-12'>
                    {SOCIALS.map((social) => (
                      <a
                        key={`footer-social-${social.name}`}
                        href={social.href}
                        aria-label={social.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='group flex items-center space-x-2 text-sm font-semibold text-cream-50/90 drop-shadow-[-2px_-4px_6px_var(--color-tan-200)]'
                      >
                        <social.icon className='h-4 w-4 duration-200 ease-in-out group-hover:text-charcoal-100/95' />
                        <span className='hidden duration-200 ease-in-out group-hover:text-charcoal-100/95 lg:inline'>
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-10 text-center text-[15px] text-cream-400/90 sm:mt-12'>
                © {new Date().getFullYear()} GabbiiDAO. Todos los derechos reservados. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
