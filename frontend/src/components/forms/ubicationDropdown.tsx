import React, { useState } from 'react';
import { MenuButton, Transition, Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface UbicationDropdownProps {
  options: string[];
}

const UbicationDropdown: React.FC<UbicationDropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="group flex items-center justify-between h-full px-3 py-2.5 text-sm font-semibold text-text-tertiary outline-none drop-shadow-[-4px_-4px_6px_rgba(255, 254, 239,0.2)] duration-200 ease-in-out hover:text-charcoal-500">
        <span>{selectedOption || 'Ubicación'}</span>
        <ChevronDownIcon className="ml-1 h-4.5 w-4.5 text-text-tertiary duration-300 group-data-[open]:rotate-180" />
      </MenuButton>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 mt-4 w-full rounded-md bg-tan-500/70 shadow-lg"> {/* Ajusta el margen aquí */}
          {options.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  className={`block w-full px-4 py-2 text-left text-sm font-medium text-text-tertiary duration-200 ease-in-out hover:bg-cream-600 ${active ? 'bg-cream-600 text-text-tertiary' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UbicationDropdown;
