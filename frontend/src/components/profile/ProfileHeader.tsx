import React, { useRef } from 'react';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';
import { State, User } from '@app/declarations/home/home.did';
import Link from 'next/link';

export function ProfileHeader({
  user,
  setUser,
}: {
  user: User;
  setUser: (user: User) => void
}) {
  const textHeaderRef = useRef<HTMLDivElement>(null);

  const renderState = (state: State) => {
    if ('Approved' in state) {
      return 'Aprobado'
    }
    if ('Pending' in state) {
      return 'Pendiente'
    }
    if ('Rejected' in state) {
      return 'Rechazado'
    }
  }

  return (
    <Container className="pb-8 pt-12 sm:pb-16 lg:pt-16">
      {user.role.length > 0 && (
        <div className="relative z-10 mx-auto max-w-lg sm:max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-12 lg:items-start lg:gap-x-8 xl:grid-cols-2 xl:gap-x-12 2xl:gap-x-20">

          {/* Header Section */}
          <div ref={textHeaderRef} className="lg:col-span-7 xl:col-span-1 flex items-center space-x-3">
            <img src={typeof user.logo === 'string' ? user.logo : `data:image/png;base64,${Buffer.from(user.logo).toString('base64')}`} alt="User Logo" className="h-16 w-16 rounded-full" />
            <h1 className="text-3xl font-bold leading-tight text-charcoal-500 sm:text-4xl lg:text-4xl">
              {user.name}
            </h1>
            <span className="flex items-center justify-center rounded-md p-2 bg-charcoal-500 text-white">
              Tu estado actual es:
              <strong className='ms-1'>{renderState(user.state)}</strong>
            </span>
          </div>

          {/* Description and Button Section */}
          <div className="mt-5 lg:col-span-5 lg:mt-0 xl:col-span-1">
            <div className="lg:ml-auto lg:mt-2 lg:max-w-lg">
              <p className="text-sm leading-8 text-text-secondary mb-4">
                Estás en tu página de usuario. Aquí puedes ver las propuestas a las que has sido invitado y gestionar las activas, vencidas y accionadas.
              </p>
              {/* Styled Button */}
              <Link href="/proposal">
                <Button className="mt-4 bg-charcoal-500 text-white hover:bg-charcoal-700 transition duration-300 rounded-md shadow-md p-2">
                  Ver nuevas propuestas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-carafe-100 to-cream-300 opacity-15 rounded-lg" />
    </Container>
  );
}
