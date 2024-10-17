import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { Link } from '@app/declarations/proposal/proposal.did';

export function InterestLinks({
  interestLinks,
}: {
  interestLinks: Link[];
}) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gray-50">
      <Container className="max-w-4xl">
        {/* Título de la sección */}
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Enlaces de Interés</h2>

        {/* Links section */}
        <div className="space-y-8">
          {interestLinks.map((link) => (
            <div
              key={link.description}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <ChevronRightIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                  {link.description}
                </h3>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">
                  {link.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
