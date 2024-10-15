import React from 'react';
import { Container } from '@/components/shared/Container';

interface Proposal {
  id: string;
  status: 'activa' | 'vencida' | 'accionada';
}

interface ProfileDetailsProps {
  proposals: Proposal[];
}

export function ProfileDetails({ proposals }: ProfileDetailsProps) {
  const activeProposals = proposals.filter((p) => p.status === 'activa');
  const expiredProposals = proposals.filter((p) => p.status === 'vencida');
  const actionedProposals = proposals.filter((p) => p.status === 'accionada');

  const getProposalIds = (proposals: Proposal[]) => proposals.map((p) => p.id);

  return (
    <Container className="pb-8 sm:pb-16 lg:pt-16 ">

    <div className='-mx-5 -my-2 mt-5 overflow-x-auto sm:-mx-6 sm:mt-16 lg:-mx-8'>
      <div className='inline-block min-w-full px-5 py-2 align-middle sm:px-6 lg:px-8'>
        <div className='min-w-full space-y-12'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-charcoal-500'>
                <th className='text-left text-sm font-semibold text-text-secondary sm:pl-2'>
                  Estado
                </th>
                <th className='text-center text-sm font-semibold text-text-secondary'>
                  Propuestas Activas
                </th>
                <th className='text-center text-sm font-semibold text-text-secondary'>
                  Propuestas Vencidas
                </th>
                <th className='text-center text-sm font-semibold text-text-secondary'>
                  Propuestas Accionadas
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='w-full border-b border-charcoal-500'>
                <td className='whitespace-nowrap py-5 font-semibold pl-6 text-left text-sm  text-text-secondary sm:py-6 sm:pl-8'>
                  
                </td>
                <td className='px-4 py-5 text-center text-sm text-text-tertiary'>
                  {activeProposals.length}
                </td>
                <td className='px-4 py-5 text-center text-sm text-text-tertiary'>
                  {expiredProposals.length}
                </td>
                <td className='px-4 py-5 text-center text-sm text-charcoal-500'>
                  {actionedProposals.length}
                </td>
              </tr>
              <tr className='w-full border-b border-charcoal-500'>
                <td className='whitespace-nowrap font-semibold py-5 pl-6 text-left text-sm  text-text-secondary sm:py-6 sm:pl-8'>
                  
                </td>
                <td className='px-4 py-5 text-center text-sm text-text-tertiary'>
                  {getProposalIds(activeProposals).join(', ') || 'ID Propuesta: No hay propuestas activas'}
                </td>
                <td className='px-4 py-5 text-center text-sm text-text-tertiary'>
                  {getProposalIds(expiredProposals).join(', ') || 'ID Propuesta:  No hay propuestas vencidas'}
                </td>
                <td className='px-4 py-5 text-center text-sm text-text-tertiary'>
                  {getProposalIds(actionedProposals).join(', ') || 'ID Propuesta: No hay propuestas accionadas'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Container>
  );
}
