import React, { useEffect, useState } from 'react';
import { Label } from './Label';
import { useCountry } from '@app/hooks/useCountry';
import { Button } from '../shared/Button';

interface CountryOption {
    name: string;
    capital: string[];
}

interface SelectedJurisdiction {
    country: string;
    capital: string;
}

export const JurisdictionDropdown: React.FC = () => {
    const { getAll } = useCountry();
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCapital, setSelectedCapital] = useState<string>('');
    const [selectedJurisdictions, setSelectedJurisdictions] = useState<SelectedJurisdiction[]>([]);

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

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryName = e.target.value;
        setSelectedCountry(countryName);

        const country = countries.find(c => c.name === countryName);
        if (country && country.capital.length > 0) {
            setSelectedCapital(country.capital[0]);
        }
    };

    const addJurisdiction = () => {
        if (selectedCountry && selectedCapital) {
            const newJurisdiction: SelectedJurisdiction = { country: selectedCountry, capital: selectedCapital };
            if (!selectedJurisdictions.some(j => j.country === selectedCountry && j.capital === selectedCapital)) {
                setSelectedJurisdictions([...selectedJurisdictions, newJurisdiction]);
                setSelectedCountry('');
                setSelectedCapital('');
            }
        }
    };

    const removeJurisdiction = (jurisdiction: SelectedJurisdiction) => {
        setSelectedJurisdictions(selectedJurisdictions.filter(j => j !== jurisdiction));
    };

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <Label name="country-dropdown">Select Country</Label>
                <div className="flex space-x-2">
                    <select
                        id="country-dropdown"
                        value={selectedCountry}
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
                    <Button type="button" onClick={addJurisdiction}>Add Jurisdiction</Button>
                </div>
            </div>

            {selectedJurisdictions.length > 0 && (
                <div>
                    <p className="text-sm text-[var(--color-text-ternary)] opacity-50 py-2.5">Selected Jurisdictions:</p>
                    <ul className="grid grid-cols-2 gap-4">
                        {selectedJurisdictions.map((jurisdiction, index) => (
                            <li key={index} className="block text-sm text-[var(--color-text-ternary)] py-2.5 px-2.5">
                                {jurisdiction.country} - {jurisdiction.capital}
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
