import { useState } from 'react';
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

    }
    catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error adding comment',
        icon: 'error',
      });
    }
  }

  return (
    <div className='max-w-lg py-5 sm:max-w-xl lg:max-w-6xl '>
      <div className='lg:grid lg:grid-cols-1 lg:gap-x-8 xl:gap-x-36'>
        <div className='relative z-10 flex flex-col'>
          <div className='space-y-8'>
            <h2 className='text-2xl font-bold text-text-tertiary'>Comentarios</h2>

            {/* Lista de comentarios */}
            <div className='space-y-4'>
              {comments.map((comment, index) => (
                <div key={index} className='border-b border-charcoal-500/10 py-4'>
                  <div className='flex items-center justify-between'>
                    <span className='font-semibold text-text-tertiary'>{comment.detail}</span>
                    <span className='text-sm text-text-primary'>{comment.user.toString()}</span>
                  </div>
                  <p className='mt-2 text-text-secondary'>{comment.detail}</p>
                </div>
              ))}
            </div>

            {/* Formulario de nuevo comentario */}
            <form onSubmit={handleSubmitComment} className='mt-8 space-y-6 '>
              <TextField
                label='Tema'
                name='tema'
                placeholder='Tema del comentario'
                required
              />
              <TextField
                label='Escribe tu comentario'
                name='detail'
                placeholder='Añade un comentario.   ..'
                required
              />
              <Button type='submit' className='sm:px-5'>
                <span>Agregar comentario</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
