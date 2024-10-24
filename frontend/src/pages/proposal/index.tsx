import { HeroContainer } from '@/components/shared/HeroContainer'
import { Footer } from '@/components/shared/Footer'
import { ProposalCard } from '../../components/ProposalCard'
import { useProposal } from '@app/hooks/useProposal'
import { useEffect, useState } from 'react'
import { Proposal } from '@app/declarations/proposal/proposal.did'
import Swal from 'sweetalert2'
import { Button } from '@app/components/shared/Button'
import { PlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Loading from '@app/components/loading/Loading'



export default function Proposals() {
  const [proposals, setProposals] = useState<[bigint, Proposal][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllProposals } = useProposal();

  useEffect(() => {
    const retrieveProposals = async () => {
      try {
        const result = await getAllProposals();
        if ('ok' in result && 'FullProposal' in result.ok) {
          setProposals(result.ok.FullProposal);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al cargar las propuestas',
          icon: 'error',
        });
      }
      setIsLoading(false);
    };
    retrieveProposals();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroContainer
        className="overflow-visible overflow-x-clip"
        bgGradientClassName="inset-x-0 bottom-0 -top-32 opacity-80 sm:opacity-100"
      >
        {/* <ContactHero /> */}
      </HeroContainer>

      <div className="flex-grow flex flex-col items-center justify-center mt-10">
        {isLoading ? (
          <div className="flex justify-center w-full items-center">
            <Loading />
          </div>
        ) : (
          <Link href="/createProposal">
            <div className="flex flex-col space-y-5 justify-center items-center">
              <label className="text-2xl font-bold text-carafe-500">
                Crea una propuesta
              </label>
              <Button className="hover:bg-carafe-500 rounded-full w-fit">
                <PlusIcon className="text-white font-extrabold h-5 w-5" />
              </Button>
            </div>
          </Link>
        )}

        {proposals.length > 0 && (
          <div className="w-full">
            {proposals.map((proposal, index) => (
              <ProposalCard key={index} proposal={proposal} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
