import { Container } from '@/components/shared/Container';
import { StarField } from '@/components/shared/StarField';
import { HandThumbUpIcon, HandThumbDownIcon, ArrowLeftIcon } from '@heroicons/react/16/solid';
import { CommentSection } from './CommentSection ';
import { InterestLinks } from './InterestLinks';
import { Proposal, StateProposal } from '@app/declarations/proposal/proposal.did';
import { handleProposalResult } from '@app/utils';
import { useRouter } from 'next/router';
import { useProposal } from '@app/hooks/useProposal';
import { ContentPill } from '../shared/ContentPill';
import Swal from 'sweetalert2';

interface ProposalDetailsProps {
    proposalId: bigint;
    proposal: Proposal;
    loadProposal: () => Promise<void>;
}

export const ProposalDetails: React.FC<ProposalDetailsProps> = ({
    proposalId,
    proposal,
    loadProposal,
}) => {
    const router = useRouter();
    const { voteProposal } = useProposal();

    const getVotesCount = (type: boolean) => 
        proposal.votes.filter((vote) => vote.approved === type).length;

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

    const handleVote = async (choice: boolean) => {
        try {
            const result = await voteProposal(choice, proposalId);
            if ('ok' in result) {
                Swal.fire({
                    title: 'Success',
                    text: 'Voto registrado exitosamente',
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
                text: 'Hubo un error al registrar el voto',
                icon: 'error',
            });
        }
    };

    return (
        <Container className="max-w-lg py-5 sm:max-w-xl lg:max-w-6xl relative  p-6 rounded-lg shadow-lg">
            {/* Botón para regresar */}
            <div className='mb-16'>

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 flex items-center space-x-2 px-4 py-2 bg-charcoal-800 text-text-accent rounded-lg shadow-lg hover:bg-tan-500 transition duration-300"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Regresar</span>
                </button>
            </div>

            {/* Imagen */}
            <div className="relative col-span-12 h-64 lg:col-span-5 lg:h-auto xl:col-span-1 mb-8">
                <div className="relative h-96 w-full rounded-2xl bg-cream-50 shadow-inner-blur m-3">
                    <img src={`data:image/jpeg;base64,${Buffer.from(proposal.photo).toString('base64')}`} alt="Proposal photo" className="object-cover w-full h-full rounded-2xl shadow-md" />
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
                            <ContentPill
                                text={`Fecha de cierre de votaciones: ${new Date(proposal.deadline).toLocaleString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}`}
                            />
                        </div>
                        <h2 className="mt-5 text-4xl font-bold leading-tight text-text-tertiary lg:text-[2.0rem] xl:leading-tight">
                            {proposal.name}
                        </h2>

                        {/* Estado de la propuesta */}
                        <ContentPill
                            text={`Estado: ${getStateText(proposal.state)}`}
                        />


                        {/* Descripción */}
                        <div className="mt-6">
                            <p className="text-lg leading-7 text-text-secondary font-bol lg:text-[17px] xl:text-lg xl:leading-8">
                                {proposal.description}
                            </p>
                        </div>

                        {/* Comentarios */}
                        <CommentSection comments={proposal.comments} proposalId={proposalId} loadProposal={loadProposal} />
                    </div>
                </div>

                <div className="mt-16 flex flex-col justify-center space-y-16 sm:mt-20 lg:col-span-5 lg:mt-0">
                    {/* Sección de votación */}
                    <div className="flex flex-col items-center mt-10">
                        <h3 className="text-xl font-bold text-carafe-900">¡Vota aquí!</h3>

                        {/* Botones de votación con estilo empresarial */}
                        <div className="mt-6 flex flex-col space-y-4 w-full">
                            <button
                                className="flex items-center justify-between w-full px-6 py-4 border border-charcoal-500 rounded-md  text-carafe-700 hover:bg-tan-100 hover:border-tan-400 transition-colors duration-300 shadow-sm"
                                onClick={() => handleVote(false)}
                            >
                                <HandThumbUpIcon className="h-6 w-6 text-charcoal-600" />
                                <span className="ml-3 font-semibold">Votar a favor</span>
                            </button>
                            <button
                                className="flex items-center justify-between w-full px-6 py-4 border border-charcoal-500 rounded-md text-carafe-700 hover:bg-tan-100 hover:border-tan-400 transition-colors duration-300 shadow-sm"
                                onClick={() => handleVote(false)}
                           >
                                <HandThumbDownIcon className="h-6 w-6 text-tan-600" />
                                <span className="ml-3 font-semibold">Votar en contra</span>
                            </button>
                        </div>

                        <div className="mt-8 p-6 bg-cream  text-gray-900 space-y-6 text-center ">
                            <h4 className="text-2xl font-extrabold text-carafe-500">Votación en tiempo real</h4>

                            {/* Barra de progreso de votos a favor */}
                            <div className="relative pt-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-lg font-semibold text-carafe-900">A favor</span>
                                    <span className="font-bold text-charcoal-600">{getVotesCount(true)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-5">
                                    <div
                                        className="bg-indigo-500 h-5 rounded-full"
                                        style={{ width: `${(getVotesCount(false) / Number(proposal.threshold)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Barra de progreso de votos en contra */}
                            <div className="relative pt-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-lg font-semibold text-carafe-900">En contra</span>
                                    <span className="font-bold text-red-500">{getVotesCount(false)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-5">
                                    <div
                                        className="bg-red-500 h-5 rounded-full"
                                        style={{ width: `${(getVotesCount(false) / Number(proposal.threshold)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Animación tipo cuenta regresiva para mostrar el tiempo restante */}
                            <div className="mt-6">
                                <p className="text-sm font-bold text-text-secondary">Tiempo restante para votar</p>
                                <div className="text-sm font-extrabold text-charcoal-600 animate-pulse">
                                    {/* Reemplazar con el componente de countdown */}
                                    {new Date(proposal.deadline).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
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
