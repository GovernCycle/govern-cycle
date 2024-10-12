import React, { useEffect, useState } from 'react';
import { useCountry } from '@app/hooks/useCountry'; // Esto depende de tu hook personalizado
import { Label } from './Label';

interface CountryOption {
    name: string;
    flag: string;
    callingCode: string;
}

export const PhoneNumberInput: React.FC = () => {
    const { getAll } = useCountry(); // Hook personalizado para obtener los datos del país
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getAll();
                const formattedData = data.map((country: any) => ({
                    name: country.name.common,
                    flag: country.flags.png, 
                    callingCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
                }));

                formattedData.sort((a: CountryOption, b: CountryOption) =>
                    a.callingCode.localeCompare(b.callingCode)
                );

                setCountries(formattedData);
                setSelectedCountry(formattedData[0]); 
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []); 

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const callingCode = e.target.value;
        const country = countries.find(c => c.callingCode === callingCode);
        if (country) {
            setSelectedCountry(country); 
        }
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { 
            setPhoneNumber(value);
        }
    };

    return (
        <div className="space-y-2">
            <Label name="phone-number">Phone Number</Label>
            <div className="flex items-center space-x-2">
                <div className="relative flex justify-center items-center w-60">
                    <select
                        id="country-code-dropdown"
                        value={selectedCountry?.callingCode || ''} 
                        onChange={handleCountryChange}
                        className="bg-form-input block w-full text-sm py-2.5 pr-8 rounded-md border-0 pl-10 "
                    >
                        {countries.map((country) => (
                            <option
                                key={`${country.callingCode}-${country.name}`} // Generar una clave única combinando el código de llamada con el nombre del país
                                value={country.callingCode}
                            >
                                {country.callingCode}
                            </option>
                        ))}
                    </select>
                    {selectedCountry && (
                        <img
                            src={selectedCountry.flag}
                            alt={`${selectedCountry.name} flag`}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 "
                        />
                    )}
                </div>
                <input
                    type="tel"
                    id="phone-number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    className="block w-full text-sm py-2.5 rounded-md border-0 bg-form-input"
                    pattern="[0-9]*" // Solo permite números
                />
            </div>
        </div>
    );
};
