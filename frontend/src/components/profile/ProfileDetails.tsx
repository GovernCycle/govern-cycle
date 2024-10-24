import React, {useEffect, useState } from 'react';
import { Container } from '@/components/shared/Container';
import { useHome } from '@app/hooks/useHome';
import Alert from '@mui/material/Alert';
import { Participation } from '@app/declarations/db/db.did';
import Swal from 'sweetalert2';
import Loading from '../loading/Loading';
import { ProposalRow } from './ProposalRow';
import { User } from '@app/declarations/home/home.did';

export function ProfileDetails({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void
}) {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [participations, setParticipations] = useState<Participation>();
  const { getMyParticipations } = useHome();


  useEffect(() => {
    const retrieveParticipations = async () => {
      if (user.role.length > 0) {
        setisLoading(true);
        try {
          const result = await getMyParticipations();
          if ('ok' in result && 'Participation' in result.ok) {
            setParticipations(result.ok.Participation);
          }
          if ('err' in result && 'UserNotFound' in result.err) {
          }

        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener las participaciones',
          });
        }
        setisLoading(false);
      }
    };
    retrieveParticipations();
  }, []);

  return (
    <Container className="pb-8 sm:pb-16 lg:pt-16 ">
      {user.role.length == 0 && (
        <Alert severity="info">Debes iniciar sesión o registrarte para ver tus propuestas</Alert>
      )}
      
      {isLoading && <Loading />}

      {participations && (
        <div className='flex-col justify-center space-y-4'>

          <Alert severity="info">
            Si el usuario está en estado Pendiente o Rechazado, no podrá participar en propuestas.
          </Alert>
          <div className='-mx-5 -my-2 mt-5 overflow-x-auto sm:-mx-6 sm:mt-16 lg:-mx-8'>
            <div className='inline-block min-w-full px-5 py-2 align-middle sm:px-6 lg:px-8'>
              <div className='min-w-full overflow-hidden border border-gray-300 rounded-lg shadow-sm'>
                <table className='min-w-full bg-white'>
                  <thead>
                    <tr className='bg-gray-50 border-b'>
                      <th className='text-left text-sm font-semibold text-gray-700 sm:pl-2 p-4'>
                        Estado
                      </th>
                      <th className='text-center text-sm font-semibold text-gray-700 p-4'>
                        Cantidad
                      </th>
                      <th className='text-center text-sm font-semibold text-gray-700 p-4'>
                        IDs de Propuestas
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Fila para propuestas activas */}
                    <tr className='border-b'>
                      <ProposalRow proposal={participations?.active || []} title='Propuestas Activas' />
                    </tr>

                    {/* Fila para propuestas inactivas */}
                    <tr className='border-b'>
                      <ProposalRow proposal={participations?.inactive || []} title='Propuestas Inactivas' />
                    </tr>

                    {/* Fila para propuestas accionadas */}
                    <tr>
                      <ProposalRow proposal={participations?.done || []} title='Propuestas Accionadas' />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
