import { Container } from '@/components/shared/Container'
import Image from 'next/image'
import teamPhoto from '@/images/team-photo.jpg'
import { StarField } from '@/components/shared/StarField'
import { ContentPill } from '@/components/shared/ContentPill'
import { BuildingOffice2Icon } from '@heroicons/react/16/solid'
import { HandThumbUpIcon, HandThumbDownIcon, GlobeAmericasIcon, UserGroupIcon } from '@heroicons/react/16/solid'
import { CommentSection } from './CommentSection '
import { InterestLinks } from './InterestLinks'
import { Proposal } from '@app/declarations/proposal/proposal.did'
import { useProposal } from '@app/hooks/useProposal'

const values = [

    {
        title: 'Global Empathy',
        description:
            'Understanding global needs drives us forward. Nebula is committed to fostering an inclusive environment, embracing diverse perspectives.',
        icon: <GlobeAmericasIcon className='h-6 w-6 text-zinc-200/95' />,
    },
    {
        title: 'Sustainable Growth',
        description:
            'Growth at Nebula is nurtured sustainably. We invest in long-term development, ensuring our impact is positive and enduring.',
        icon: <UserGroupIcon className='h-6 w-6 text-zinc-200/95' />,
    },
]


export const ProposalDetails = ({
    proposalId,
    proposal,
}: {
    proposalId: bigint,
    proposal: Proposal,


}) => {

    const { voteProposal } = useProposal();

    const renderImage = () => {
        const byteArr = new Uint8Array(proposal.photo);
        const blob = new Blob([byteArr], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return url;
    }
    
    const handleVote = async (choice: boolean) => {
        try {
            await voteProposal(choice, proposalId);
        } catch (error) {
            console.error('Error voting proposal:', error);
        }
    }


    return (
        <Container className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl'>
            {/* Imagen de la propuesta */}
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
                        <CommentSection />
                    </div>
                </div>
                <div className='mt-16 flex flex-col justify-center space-y-16 sm:mt-20 lg:col-span-5 lg:mt-0'>
                    <div className='mt-16 flex flex-col justify-center space-y-4 sm:mt-20 lg:col-span-5 lg:mt-0'>
                        {/* Sección de votación */}
                        <div className='flex flex-col items-center mt-10'>
                            <h3 className='text-lg font-bold'>Votar</h3>
                            <div className='flex space-x-4 mt-2'>
                                <button className='flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600'
                                    onClick={() => handleVote(true)}>
                                    <HandThumbUpIcon className='h-6 w-6 text-white' />
                                </button>
                                <button className='flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:bg-red-600'
                                    onClick={() => handleVote(false)}>
                                    <HandThumbDownIcon className='h-6 w-6 text-white' />
                                </button>
                            </div>
                        </div>
                        {values.map((value) => (
                            <div key={`value-${value.title}`} className='w-full px-2'>
                                <div className='h-11 w-11 rounded-lg bg-tan-500 shadow-btn-secondary'>
                                    <div className='flex h-full w-full items-center justify-center rounded-lg border border-tan-500'>
                                        {value.icon}
                                    </div>
                                </div>

                                <h3 className='mt-4 text-lg font-bold leading-8 text-text-primary'>
                                    {value.title}
                                </h3>

                                <p className='mt-1.5 text-lg leading-8 text-text-tertiary'>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Aquí se llama al componente InterestLinks */}
            <InterestLinks />
        </Container>
    );
};