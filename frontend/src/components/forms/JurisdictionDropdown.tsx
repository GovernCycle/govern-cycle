import React, { useEffect, useState } from 'react';
import { Label } from './Label';
import { useCountry } from '@app/hooks/useCountry';
import { Button } from '../shared/Button';
import { regions } from '@app/utils/region';

interface CountryOption {
    name: string;
    capital: string[];
}


interface SelectedJurisdiction {
    continent: string;
    country: string;
    city: string;
}

export const JurisdictionDropdown = ({
    selectedJurisdictions,
    setSelectedJurisdictions,
}: {
    selectedJurisdictions: SelectedJurisdiction[];
    setSelectedJurisdictions: React.Dispatch<React.SetStateAction<SelectedJurisdiction[]>>;
}) => {
    const { getAll, getCities } = useCountry();
    const [cities, setCities] = useState<string[]>([]);
    const [countryJurisdiction, setCountryJurisdiction] = useState<string>('');
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [selectedContinent, setselectedContinent] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getAll();
                const formattedData = data.map((country: any) => ({
                    name: country.name.common,
                    capital: country.capital || ['N/A'],
                }));

                formattedData.sort((a: CountryOption, b: CountryOption) =>
                    a.name.localeCompare(b.name)
                );

                setCountries(formattedData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, [getAll]);

    const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedContinent(e.target.value);
    };

    const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryName = e.target.value;
        setSelectedCountry(countryName);

        // const response = await getCities(countryName);
        // setCities(response.data);
    };

    const handleCountryByCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountryJurisdiction(e.target.value);
        const response = await getCities(e.target.value);
        setCities(response.data);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        console.log(e.target.value);
    };

    const addJurisdiction = () => {
        if (selectedCountry || selectedCity || selectedContinent) {
            const newJurisdiction: SelectedJurisdiction = { country: selectedCountry, city: selectedCity, continent: selectedContinent };
            if (!selectedJurisdictions.some(j => j.country === selectedCountry && j.city === selectedCity && j.continent === selectedContinent)) {
                setSelectedJurisdictions([...selectedJurisdictions, newJurisdiction]);
                setSelectedCountry('');
                setSelectedCity('');
                setselectedContinent('');
            }
        }
    };

    const removeJurisdiction = (jurisdiction: SelectedJurisdiction) => {
        setSelectedJurisdictions(selectedJurisdictions.filter(j => j !== jurisdiction));
    };

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <div className="flex space-x-2">
                    <div className='w-full flex flex-col space-y-1 items-center'>

                        <label>Jurisdicción por continente</label>
                        <select onChange={handleContinentChange}
                            className='block w-full text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5 rounded-md border-0 bg-form-input'>
                            <option value="" disabled>Select a Continent</option>
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-full flex flex-col space-y-1 items-center'>
                        <label>Jurisdicción por país</label>
                        <select
                            onChange={handleCountryChange}
                            className="block w-full text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5 rounded-md border-0 bg-form-input"
                        >
                            <option value="" disabled>Select a country</option>
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-full flex flex-col space-y-1 items-center'>
                        <label>Jurisdicción por ciudad</label>
                        <select
                            onChange={handleCountryByCityChange}
                            className="block w-full text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5 rounded-md border-0 bg-form-input"
                        >
                            <option value="" disabled>Select a country</option>
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {countryJurisdiction && (
                            <div>
                                <select onChange={handleCityChange}
                                    className='block w-full text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5 rounded-md border-0 bg-form-input'>
                                    <option value="" disabled>Select a city</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                </div>
                <Button type="button"
                    onClick={addJurisdiction}>Agregar Jurisdicción</Button>
            </div>


            {selectedJurisdictions.length > 0 && (
                <div>
                    <p className="text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5">Selected Jurisdictions:</p>
                    <ul className="grid grid-cols-2 gap-4">
                        {selectedJurisdictions.map((jurisdiction, index) => (
                            <li key={index} className="block text-sm text-[var(--color-text-ternary)] py-2.5 px-2.5">
                                {jurisdiction.continent || 'N/A'} - {jurisdiction.country || 'N/A'} - {jurisdiction.city || 'N/A'}
                                <button
                                    type="button"
                                    onClick={() => removeJurisdiction(jurisdiction)}
                                    className="ml-4 py-1 px-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 cursor-pointer"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

