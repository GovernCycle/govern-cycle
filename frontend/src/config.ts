import type { SocialObjects, Clients } from './types.ts'
import twitterIcon from '@/icons/nucleo/twitter.svg'
import githubIcon from '@/icons/nucleo/github.svg'
import youtubeIcon from '@/icons/nucleo/youtube.svg'
import linkedinIcon from '@/icons/nucleo/linkedin.svg'
import dfinity from './images/logos/dfinity-logo.svg'
import udea from './images/logos/udea-logo.svg'

export const SOCIALS: SocialObjects = [
  {
    name: 'X',
    href: 'https://x.com/GabbiiDAO',
    label: 'Ver novedades',
    ariaLabel: 'Seguir en X',
    icon: twitterIcon,
  },
  {
    name: 'github',
    href: 'https://github.com/GovernCycle/govern-cycle',
    label: 'Mira cómo se hizo',
    ariaLabel: 'Seguir en Github',
    icon: githubIcon,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/gabbii-dao',
    label: 'Visita nuestro LinkedIn',
    ariaLabel: 'Seguir en LinkedIn',
    icon: linkedinIcon,
  },
]

export const CLIENTS: Clients = [
  { name: 'dfinity', logo: dfinity },
  { name: 'udea', logo: udea },
]
