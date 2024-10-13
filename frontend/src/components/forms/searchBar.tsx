import React from "react";
import UbicationDropdown from "@app/components/forms/ubicationDropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"; 
import { Container } from '@/components/shared/Container';

const SearchBar: React.FC = () => {
    const options = ["Ubicación 1", "Ubicación 2", "Ubicación 3"]; 
  
    return (
      <Container className='pt-20 pb-0 sm:pb-0'> 
        <div className="flex items-center justify-center space-x-2">
            
          <div className="flex items-center bg-tan-500/70 border border-gray-300 rounded-full shadow-lg p-2"> 
            <UbicationDropdown options={options} />
            <div className="relative w-80"> 
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full h-10 px-4 text-sm text-gray-800 bg-transparent border-none placeholder-gray-600 focus:outline-none focus:ring-0"
                style={{ outline: 'none' }} 
              />
              
              <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-text-tertiary" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
};

export default SearchBar;
