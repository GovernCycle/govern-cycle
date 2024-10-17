import { Container } from '@/components/shared/Container';
import { StarField } from '@/components/shared/StarField';
import { ContentPill } from '@/components/shared/ContentPill';
import { BuildingOffice2Icon } from '@heroicons/react/16/solid';
import { HandThumbUpIcon, HandThumbDownIcon, ArrowLeftIcon } from '@heroicons/react/16/solid';
import { CommentSection } from './CommentSection ';
import { InterestLinks } from './InterestLinks';
import { Proposal, StateProposal } from '@app/declarations/proposal/proposal.did';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { handleProposalResult } from '@app/utils';
import { useProposal } from '@app/hooks/useProposal';

export const ProposalDetails = ({
    proposalId,
    proposal,
    loadProposal,
}: {
    proposalId: bigint,
    proposal: Proposal,
    loadProposal: () => Promise<void>
}) => {
    const router = useRouter();
    const { voteProposal } = useProposal();

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
    };

    const getVotesCount = (type: boolean) => {
        return proposal.votes.filter((vote) => vote.approved === type).length;
    };

    const getStateText = (state: StateProposal): string => {
        if ('Approved' in state) return 'Aprobada';
        if ('Rejected' in state) return 'Rechazada';
        if ('Pending' in state) return 'Pendiente';
        return '';
    };

    const getStateStyle = (state: StateProposal) => {
        if ('Approved' in state) return 'bg-green-500 text-white';
        if ('Rejected' in state) return 'bg-red-500 text-white';
        if ('Pending' in state) return 'bg-yellow-500 text-white';
        return '';
    };

    return (
        <Container className="max-w-lg py-5 sm:max-w-xl lg:max-w-6xl relative bg-gray-100 p-6 rounded-lg shadow-lg">
            {/* Botón para regresar */}
            <div className='mb-16'>

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Regresar</span>
                </button>
            </div>

            {/* Imagen */}
            <div className="relative col-span-12 h-64 lg:col-span-5 lg:h-auto xl:col-span-1 mb-8">
                <div className="relative h-96 w-full rounded-2xl bg-gray-50 shadow-inner-blur m-3">
                    <img src={proposal.photo} alt="Team photo" className="object-cover w-full h-full rounded-2xl shadow-md" />
                </div>
            </div>

            {/* Stars */}
            <div className="absolute left-0 top-0 z-0 h-72 w-72" aria-hidden="true">
                <StarField density="high" maxRadius={2.5} minRadius={1.25} />
            </div>

            {/* Información de la propuesta */}
            <div className="mx-auto max-w-lg px-5 sm:max-w-2xl sm:px-6 lg:grid lg:max-w-screen-xl lg:grid-cols-12 lg:gap-14 lg:px-8 xl:gap-16 2xl:gap-20">
                <div className="flex items-center lg:col-span-7">
                    <div className="relative z-10 flex flex-col">
                        <div className="text-lg font-semibold text-indigo-600">
                            <span>Fecha de cierre de votaciones: </span>
                            <span className="font-bold">
                                {new Date(proposal.deadline).toLocaleString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <h2 className="mt-5 text-4xl font-bold leading-tight text-gray-800 lg:text-[2.75rem] xl:leading-tight">
                            {proposal.name}
                        </h2>

                        {/* Estado de la propuesta */}
                        <div className={`mt-3 inline-block px-4 py-2 rounded-full text-sm font-semibold shadow-md ${getStateStyle(proposal.state)}`}>
                            {getStateText(proposal.state)}
                        </div>

                        {/* Descripción */}
                        <div className="mt-6">
                            <p className="text-lg leading-8 text-gray-600 lg:text-[17px] xl:text-lg xl:leading-8">
                                {proposal.description}
                            </p>
                        </div>

                        {/* Comentarios */}
                        <CommentSection comments={proposal.comments} proposalId={proposalId} loadProposal={loadProposal} />
                    </div>
                </div>

                {/* Votación */}
                <div className="mt-16 flex flex-col justify-center space-y-16 sm:mt-20 lg:col-span-5 lg:mt-0">
                    <div className="flex flex-col items-center mt-10">
                        <h3 className="text-lg font-semibold text-gray-800">Votar</h3>
                        <div className="flex space-x-6 mt-4 items-center">
                            <button
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
                                onClick={() => handleVote(true)}
                            >
                                <HandThumbUpIcon className="h-6 w-6 text-white" />
                            </button>
                            <button
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
                                onClick={() => handleVote(false)}
                            >
                                <HandThumbDownIcon className="h-6 w-6 text-white" />
                            </button>

                            {/* Conteo de votos */}
                            <div className="flex flex-col space-y-3 text-gray-800">
                                <div className="flex items-center space-x-4">
                                    <span>Votos a favor:</span>
                                    <span className="text-lg font-bold">{getVotesCount(true)}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span>Votos en contra:</span>
                                    <span className="text-lg font-bold">{getVotesCount(false)}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span>Umbral mínimo:</span>
                                    <span className="text-lg font-bold">{proposal.threshold.toString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links de interés */}
            <InterestLinks interestLinks={proposal.links} />
        </Container>
    );
};
