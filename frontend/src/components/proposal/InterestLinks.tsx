import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { ContentPill } from '@/components/shared/ContentPill';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

import longGradient from '@/images/long-gradient.png';

import windowCode from '@/icons/nucleo/window-code-16.svg';
import magicWand from '@/icons/nucleo/magic-wand-16.svg';
import trendUp from '@/icons/nucleo/trend-up-16.svg';

const interestLinks = [
  {
    category: 'Links de interes',
    icon: windowCode,
    links: [
      {
        title: 'Official React Documentation',
        url: 'https://reactjs.org/docs/getting-started.html',
      },
      {
        title: 'JavaScript Info',
        url: 'https://javascript.info/',
      },
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/',
      },
    ],
  },
];

export function InterestLinks() {
  return (
    <section className='relative overflow-hidden py-20 sm:py-24'>

      <Container className='max-w-4xl'>
        {/* Links section */}
        <div className='mt-16 space-y-16 sm:mt-24'>
          {interestLinks.map((linkGroup) => (
            <div key={`links-${linkGroup.category}`} className='space-y-6'>
              <ContentPill Icon={linkGroup.icon} text={linkGroup.category} />
              <ul role='list'>
                {linkGroup.links.map((link, index) => (
                  <li
                    key={`links-${linkGroup.category}-${index}`}
                    className='relative bg-zinc-950/[.01] shadow-inner-blur first:rounded-t-2xl last:rounded-b-2xl'
                  >
                    <div
                      className={cn(
                        'flex items-center justify-between space-x-3 border border-tan-200/[.06] border-t-transparent p-6 md:space-x-4 md:p-8',
                        index === 0 &&
                          'rounded-t-2xl border-b-tan-200/[.06] border-t-tan-200/[.06]',
                        linkGroup.links.length - 1 === index && 'rounded-b-2xl'
                      )}
                    >
                      <div className='flex sm:w-2/5'>
                        <p className='text-[15px] font-semibold text-text-primary md:text-base'>
                          {link.title}
                        </p>
                      </div>
                      <div className='flex items-center justify-between space-x-4 sm:w-3/5'>
                        <a
                          href={link.url}
                          className='flex items-center text-sm font-semibold leading-4 text-text-inverse duration-200 ease-in-out hover:text-text-tertiary'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <p className='hidden items-center sm:flex'>
                            Visit Link
                            <span className='ml-1 hidden md:block'></span>
                          </p>
                          <ChevronRightIcon className='ml-2 h-5 w-5 text-text-inverse duration-200 ease-in-out sm:h-4 sm:w-4' />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
