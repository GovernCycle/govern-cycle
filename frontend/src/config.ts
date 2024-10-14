import type { SocialObjects, Clients } from './types.ts'
import dailyNews from './images/logos/daily-news.svg'
import netflix from './images/logos/netflix.svg'
import github from './images/logos/github.svg'
import tinder from './images/logos/tinder.svg'
import apple from './images/logos/apple.svg'
import ticketmaster from './images/logos/ticketmaster.svg'
import amazon from './images/logos/amazon.svg'
import stripe from './images/logos/stripe.svg'
import facebook from './images/logos/facebook.svg'
import oracle from './images/logos/oracle.svg'

import twitterIcon from '@/icons/nucleo/twitter.svg'
import githubIcon from '@/icons/nucleo/github.svg'
import youtubeIcon from '@/icons/nucleo/youtube.svg'
import discordIcon from '@/icons/nucleo/discord.svg'
import instagramIcon from '@/icons/nucleo/instagram.svg'

export const SOCIALS: SocialObjects = [
  {
    name: 'X',
    href: '#',
    label: 'Ver novedades',
    ariaLabel: 'Seguir en X',
    icon: twitterIcon,
  },
  {
    name: 'github',
    href: '#',
    label: 'Mira cómo se hizo',
    ariaLabel: 'Seguir en Github',
    icon: githubIcon,
  },
  {
    name: 'youtube',
    href: '#',
    label: 'Ver tutoriales',
    ariaLabel: 'Seguir en Youtube',
    icon: youtubeIcon,
  },
  // {
  //   name: 'discord',
  //   href: '#',
  //   label: 'Talk to us',
  //   ariaLabel: 'Join our Discord',
  //   icon: discordIcon,
  // },
  {
    name: 'instagram',
    href: '#',
    label: 'Siguenos en Instagram',
    ariaLabel: 'Seguir en Instagram',
    icon: instagramIcon,
  },
]

export const CLIENTS: Clients = [
  { name: 'Daily News', logo: dailyNews },
  { name: 'Netflix', logo: netflix },
  { name: 'Github', logo: github },
  { name: 'Tinder', logo: tinder },
  { name: 'Facebook', logo: facebook },
  { name: 'Ticketmaster', logo: ticketmaster },
  { name: 'Amazon', logo: amazon },
  { name: 'Stripe', logo: stripe },
  { name: 'Apple', logo: apple },
  { name: 'Oracle', logo: oracle },
]
