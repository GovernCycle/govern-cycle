import { HeroContainer } from '@/components/shared/HeroContainer'
import { Divider } from '@/components/shared/Divider'
import { Footer } from '@/components/shared/Footer'
import SearchBar from '@app/components/forms/searchBar'
import { ProposalCard } from '../../components/ProposalCard'
import AuthLayout from '@app/pages/auth/layout'
import { useProposal } from '@app/hooks/useProposal'
import { useEffect, useState } from 'react'
import { Proposal } from '@app/declarations/proposal/proposal.did'
import Swal from 'sweetalert2'


export const metadata = {
  title: 'Propuestas',
  description:
    "Need assistance or have questions? Contact Nebula's team for prompt support and information.",
}

export default function Propuestas() {

  const [proposals, setProposals] = useState<[bigint, Proposal][]>([]);
  const { getAllProposals } = useProposal();

  useEffect(() => {
    const retrieveProposals = async () => {
      try {
        const result = await getAllProposals();
        if ('ok' in result && 'FullProposal' in result.ok) {
          setProposals(result.ok.FullProposal);
          console.log('Proposals:', result.ok.FullProposal);
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
      <AuthLayout>

        <HeroContainer
          className='overflow-visible overflow-x-clip'
          bgGradientClassName='inset-x-0 bottom-0 -top-32 opacity-80 sm:opacity-100'
        >
          {/* <ContactHero /> */}
        </HeroContainer>
        <SearchBar />
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
      </AuthLayout>
    </>
  )
}