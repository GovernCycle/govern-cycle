import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { TextField } from '@/components/forms/TextField';

export const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      username: 'Rony Johnson',
      text: 'Esta propuesta es muy interesante. Me gustaría saber más detalles sobre la implementación.',
      timestamp: '2 horas atrás',
    },
    {
      username: 'Jaime Pérez',
      text: 'Estoy de acuerdo, me parece que tiene mucho potencial para el equipo.',
      timestamp: '1 hora atrás',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          username: 'YourUsername', // Cambia esto por el nombre del usuario actual
          text: newComment,
          timestamp: 'Justo ahora',
        },
      ]);
      setNewComment(''); // Limpia el campo de comentario
    }
  };

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
                    <span className='font-semibold text-text-tertiary'>{comment.username}</span> 
                    <span className='text-sm text-text-primary'>{comment.timestamp}</span>
                  </div>
                  <p className='mt-2 text-text-secondary'>{comment.text}</p>
                </div>
              ))}
            </div>

            {/* Formulario de nuevo comentario */}
            <form onSubmit={handleSubmitComment} className='mt-8 space-y-6 '>
              <TextField
                label='Escribe tu comentario'
                name='comment'
                placeholder='Añade un comentario.   ..'
                required
                value={newComment}
                onChange={handleCommentChange}
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
