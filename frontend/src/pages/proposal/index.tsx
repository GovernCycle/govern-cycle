import { HeroContainer } from '@/components/shared/HeroContainer'
import { Footer } from '@/components/shared/Footer'
import { ProposalCard } from '../../components/ProposalCard'
import { useProposal } from '@app/hooks/useProposal'
import { useEffect, useState } from 'react'
import { Proposal } from '@app/declarations/proposal/proposal.did'
import Swal from 'sweetalert2'
import { useAuth } from '@bundly/ares-react'
import { Button } from '@app/components/shared/Button'
import { PlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'


export const metadata = {
  title: 'Propuestas',
  description:
    "Need assistance or have questions? Contact Nebula's team for prompt support and information.",
}

export default function Proposals() {

  const [proposals, setProposals] = useState<[bigint, Proposal][]>([]);
  const { getAllProposals } = useProposal();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'You need to login to view proposals',
    //     icon: 'error',
    //   });
    // }
    const retrieveProposals = async () => {
      try {
        const result = await getAllProposals();
        if ('ok' in result && 'FullProposal' in result.ok) {
          setProposals(result.ok.FullProposal);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Error retrieving proposals',
          icon: 'error',
        });
      }
    }
    retrieveProposals();
  }
    , []);


  return (
    <>
      <HeroContainer
        className='overflow-visible overflow-x-clip'
        bgGradientClassName='inset-x-0 bottom-0 -top-32 opacity-80 sm:opacity-100'
      >
        {/* <ContactHero /> */}
      </HeroContainer>
      <div className='w-full flex justify-center mt-10'>
        <Link href='/createProposal'>
          <Button className='hover:bg-carafe-500 rounded-full'>
            <PlusIcon className='text-white font-extrabold h-5 w-5' />
          </Button>
        </Link>
      </div>


      {
        proposals.length > 0 && (
          <>
            {
              proposals.map((proposal, index) => (
                <ProposalCard key={index} proposal={proposal} />
              ))
            }
          </>
        )
      }

      <Footer />
    </>
  )
}