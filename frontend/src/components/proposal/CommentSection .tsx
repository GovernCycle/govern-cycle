import { Button } from '@/components/shared/Button';
import { TextField } from '@/components/forms/TextField';
import { Comment } from '@app/declarations/proposal/proposal.did';
import { useProposal } from '@app/hooks/useProposal';
import Swal from 'sweetalert2';
import { handleProposalResult } from '@app/utils';

export const CommentSection = ({
  comments,
  proposalId,
  loadProposal,
}: {
  comments: Comment[]
  proposalId: bigint,
  loadProposal: () => Promise<void>
}) => {
  const { addComment } = useProposal();

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const topic = data.tema as string;
    const detail = data.detail as string;

    try {
      const result = await addComment(topic, detail, proposalId);
      if ('ok' in result) {
        Swal.fire({
          title: 'Success',
          text: 'Comentario agregado exitosamente',
          icon: 'success',
        });
        await loadProposal();
      }
      if ('err' in result) {
        const handleError = handleProposalResult(result.err);
        Swal.fire({
          title: 'Error',
          text: handleError,
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al agregar el comentario',
        icon: 'error',
      });
    }
  };

  return (
    <div className="max-w-4xl py-8">
      <div className="space-y-8">
        {/* Título de sección */}
        <h2 className="text-3xl font-bold text-carafe">Comentarios</h2>

        {/* Lista de comentarios */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm bg-tan-50 border-tan-900[0.1] hover:scale-105 transition-transform duration-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-charcoal">{comment.tema}</span>
                  <span className="text-sm text-carafe-500">{comment.user.toString().slice(0,5)}</span>
                </div>
                <p className="mt-2 text-text-secondary">{comment.detail}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay comentarios aún.</p>
          )}
        </div>

      {/* Formulario para agregar comentario */}
<form onSubmit={handleSubmitComment} className="mt-8 space-y-6  p-6 rounded-lg ">
    <h4 className="text-xl font-bold text-gray-700 text-center">Deja tu comentario</h4>
    
    <TextField
        name="tema"
        placeholder="Tema del comentario"
        className="w-full p-3 rounded-lg focus:ring focus:ring-cream-200 focus:outline-none"
        required
    />

    <TextField
        name="detail"
        placeholder="Escribe tu comentario aquí..."
        multiline
        rows={4}
        className="w-full p-3 rounded-lg focus:ring focus:ring-cream-200 focus:outline-none"
        required
    />

    <Button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 hover:bg-charcoal-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
        Agregar comentario
    </Button>
</form>

      </div>
    </div>
  );
};
