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
          text: 'Comment added successfully',
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
        text: 'Error adding comment',
        icon: 'error',
      });
    }
  };

  return (
    <div className="max-w-4xl py-8">
      <div className="space-y-8">
        {/* Título de sección */}
        <h2 className="text-3xl font-bold text-gray-900">Comentarios</h2>

        {/* Lista de comentarios */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{comment.detail}</span>
                  <span className="text-sm text-gray-500">{comment.user.toString()}</span>
                </div>
                <p className="mt-2 text-gray-600">{comment.detail}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay comentarios aún.</p>
          )}
        </div>

        {/* Formulario para agregar comentario */}
        <form onSubmit={handleSubmitComment} className="mt-8 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <TextField
            name="tema"
            placeholder="Tema del comentario"
            required
          />
          <TextField
            name="detail"
            placeholder="Añade un comentario..."
            required
          />
          <Button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Agregar comentario
          </Button>
        </form>
      </div>
    </div>
  );
};
