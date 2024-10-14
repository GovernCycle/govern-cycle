import { Container } from '@/components/shared/Container'
import { StarField } from '@/components/shared/StarField'
import { ContentPill } from '@/components/shared/ContentPill'
import { BuildingOffice2Icon } from '@heroicons/react/16/solid'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/16/solid'
import { CommentSection } from './CommentSection '
import { InterestLinks } from './InterestLinks'
import { Proposal } from '@app/declarations/proposal/proposal.did'
import { useProposal } from '@app/hooks/useProposal'
import Swal from 'sweetalert2'
import { useAuth } from '@bundly/ares-react'
import { handleProposalResult } from '@app/utils'


export const ProposalDetails = ({
    proposalId,
    proposal,
    loadProposal,
}: {
    proposalId: bigint,
    proposal: Proposal,
    loadProposal: () => Promise<void>


}) => {

    const { voteProposal } = useProposal();
    const { isAuthenticated } = useAuth();

    const renderImage = () => {
        const byteArr = new Uint8Array(proposal.photo);
        const blob = new Blob([byteArr], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleVote = async (choice: boolean) => {
        try {
            const result = await voteProposal(choice, proposalId);
            if ('ok' in result) {
                Swal.fire({
                    title: 'Success',
                    text: 'Voted successfully',
                    icon: 'success',
                });
                await loadProposal();
            }
            if ('err' in result) {
                const errorResult = handleProposalResult(result.err);
                Swal.fire({
                    title: 'Error',
                    text: errorResult,
                    icon: 'error',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error voting',
                icon: 'error',
            });
        }
    }

    const getVotesCount = (type: boolean) => {
        return proposal.votes.filter((vote) => vote.approved === type).length;
    }


    return (
        <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl'>

            <div className='relative col-span-12 h-64 lg:col-span-5 lg:h-auto xl:col-span-1'>
                <div className='relative mt-12 h-96 w-full rounded-2xl bg-tan/[.01] shadow-inner-blur m-3 sm:mt-14'>
                    <div className='h-full w-full rounded-2xl border border-charcoal-500[0.2] p-2'>
                        <div className='absolute'></div>
                        <img src={renderImage()} alt='Team photo' className='object-cover w-full h-full rounded-2xl' />
                    </div>
                </div>
            </div>

            {/* Stars */}
            <div className='absolute left-0 top-0 z-0 h-72 w-72' aria-hidden='true'>
                <StarField density='high' maxRadius={2.5} minRadius={1.25} />
            </div>
            <div className='mx-auto max-w-lg px-5 sm:max-w-2xl sm:px-6 lg:grid lg:max-w-screen-xl lg:grid-cols-12 lg:gap-14 lg:px-8 xl:gap-16 2xl:gap-20'>

                <div className='flex items-center lg:col-span-7'>
                    <div className='relative z-10 flex flex-col'>
                        <ContentPill Icon={BuildingOffice2Icon} text={`${proposal.deadline}`} />
                        <h2 className='mt-5 text-4xl font-bold leading-extratight text-text-tertiary lg:text-[2.75rem] xl:leading-extratight'>
                            {proposal.name}
                        </h2>

                        {/* Text content */}
                        <div className='mt-6'>
                            <span className='text-lg leading-8 text-text-secondary lg:text-[17px] xl:text-lg xl:leading-8'>
                                {proposal.description}
                            </span>
                        </div>
                        {/*Comments section */}
                        <CommentSection comments={proposal.comments} proposalId={proposalId} loadProposal={loadProposal} />
                    </div>
                </div>
                <div className='mt-16 flex flex-col justify-center space-y-16 sm:mt-20 lg:col-span-5 lg:mt-0'>
                    <div className='mt-16 flex flex-col justify-center space-y-4 sm:mt-20 lg:col-span-5 lg:mt-0'>
                        {/* Sección de votación */}
                        <div className='flex flex-col items-center mt-10'>
                            <h3 className='text-lg font-bold'>Votar</h3>
                            <div className='flex space-x-6 mt-2 items-center'>
                                <button className='flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600'
                                    onClick={() => handleVote(true)}>
                                    <HandThumbUpIcon className='h-6 w-6 text-white' />
                                </button>
                                <button className='flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:bg-red-600'
                                    onClick={() => handleVote(false)}>
                                    <HandThumbDownIcon className='h-6 w-6 text-white' />
                                </button>
                                <div className='flex flex-col space-y-3'>

                                    <div className='flex items-center space-x-4 text-lime-800'>
                                        <span>Votos a favor</span>
                                        <span className='text-lg font-bold'>{getVotesCount(true)}</span>
                                    </div>
                                    <div className='flex items-center space-x-4 text-red-800'>
                                        <span>
                                            Votos en contra
                                        </span>
                                        <span className='text-lg font-bold'>{getVotesCount(false)}</span>
                                    </div>
                                    <div className='flex items-center space-x-4 text-amber-700'>
                                        <span>
                                            Cantidad mínima de votos para aprobar la propuesta
                                        </span>
                                        <span className='text-lg font-bold'>{proposal.threshold.toString()}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aquí se llama al componente InterestLinks */}
            <InterestLinks interestLinks={proposal.links} />

            {/* {
                !isAuthenticated && (
                    <Alert severity='warning'>
                        You need to login to view proposals
                    </Alert>
                )
            } */}
        </Container>
    );
};