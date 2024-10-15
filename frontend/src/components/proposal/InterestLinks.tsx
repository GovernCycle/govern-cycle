import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { ContentPill } from '@/components/shared/ContentPill';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { Link } from '@app/declarations/proposal/proposal.did';


export function InterestLinks({
  interestLinks,
}: {
  interestLinks: Link[];
}) {
  return (
    <section className='relative overflow-hidden py-20 sm:py-24'>

      <Container className='max-w-4xl'>
        {/* Links section */}
        <div className='mt-16 space-y-16 sm:mt-24'>
          {interestLinks.map((link) => (
            <div key={link.description} className='flex items-center space-x-4'>
              <ChevronRightIcon className='h-6 w-6 text-zinc-200/95' />
              <div className='flex flex-col space-y-2'>
                <h3 className='text-lg font-bold text-zinc-900'>{link.description}</h3>
                <p className='text-base text-zinc-600'>{link.url}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
