import React, { useRef } from 'react';
import { UserIcon, ChevronDoubleDownIcon } from '@heroicons/react/16/solid';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';

interface ProfileHeaderProps {
  username: string;
}

export function ProfileHeader({ username }: ProfileHeaderProps) {
  const textHeaderRef = useRef<HTMLDivElement>(null);
  return (
    <Container className="pb-8 pt-12 sm:pb-16 lg:pt-16">
      <div className="relative z-10 mx-auto max-w-lg sm:max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-12 lg:items-start lg:gap-x-8 xl:grid-cols-2 xl:gap-x-12 2xl:gap-x-20">
        {/* Heading */}
        <div ref={textHeaderRef} className="lg:col-span-7 xl:col-span-1 flex items-center space-x-3">
          <UserIcon className="h-8 w-8 text-charcoal-500" />
          <h1 className="text-3xl font-bold leading-tight text-charcoal-500 sm:text-4xl lg:text-4xl">
            Perfil de usuario
          </h1>
        </div>

        {/* Text and button */}
        <div className="mt-5 lg:col-span-5 lg:mt-0 xl:col-span-1">
          <div className="lg:ml-auto lg:mt-2 lg:max-w-lg">
            <p className="text-sm leading-8 text-text-secondary">
              Estás en tu página de usuario. Aquí puedes ver las propuestas a las que has sido invitado y gestionar las activas, vencidas y accionadas.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
