import Image from 'next/image';
import { StarField } from '@/components/shared/StarField';
import Confetti from 'react-confetti';
import { useState } from 'react';
import eventImage from '@/images/Event_Image.jpg'; // Imagen del evento
import backgroundImg from '/mnt/data/image.png'; // Nueva imagen de fondo

export function InvestorTestimonials() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Manejar el clic en la imagen para mostrar el confetti
  const handleImageClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Detener confetti tras 3s
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 py-16 overflow-hidden">
      {/* Efecto de Confetti */}
      {showConfetti && <Confetti />}

      {/* Imagen de Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={eventImage}
          alt="Background Image"
          className="w-full h-full object-cover opacity-10"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      {/* Contenedor Principal en Flex */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Sección de Descripción */}
        <div className="md:w-1/2 p-8 bg-[var(--color-background-ternary)] from-gray-900 to-gray-800 rounded-lg shadow-lg relative group">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <StarField density="high" maxRadius={1.75} minRadius={1} />
          </div>

          <p className="text-lg text-zinc-200 leading-8">
            Únete a nosotros para el evento COP16 organizado por Gabbii DAO y KaidáO con el apoyo de Internet Computer. Vive la tecnología, la cultura y la innovación con la Universidad de Antioquia como nuestra aliada.
          </p>

          <div className="mt-6 flex items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={eventImage}
                alt="GABBII Event"

                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-white">Cali, Colombia</p>
              <p className="text-sm text-zinc-400">Organized by Gabbii DAO</p>
            </div>
          </div>
        </div>

        {/* Imagen del Evento a la Derecha */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            onClick={handleImageClick} // 
            src={eventImage}
            alt="GABBII Event Image"
            className="w-3/4 h-auto rounded-lg shadow-lg"
            sizes="(max-width: 1024px) 100vw, 512px"
          />
        </div>
      </div>
    </div>
  );
}
