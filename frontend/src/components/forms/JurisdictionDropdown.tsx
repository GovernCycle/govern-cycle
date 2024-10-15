import React, { useEffect, useState } from 'react';
import { useCountry } from '@app/hooks/useCountry';
import { Button } from '../shared/Button';
import { regions } from '@app/utils/region';
import { Label } from './Label';
import { debounce } from 'lodash'; // Importamos lodash para usar debounce

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
    const { getByRegion, getCities } = useCountry();
    const [cities, setCities] = useState<string[]>([]);
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [selectedContinent, setSelectedContinent] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [showCountries, setShowCountries] = useState<boolean>(false);
    const [showCities, setShowCities] = useState<boolean>(false);
    const [loadingCities, setLoadingCities] = useState<boolean>(false); // Estado de loading para ciudades

    const handleContinentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const continent = e.target.value;
        setSelectedContinent(continent);
        setShowCountries(false);
        setShowCities(false);
        setSelectedCountry('');
        setSelectedCity('');

        if (continent) {
            try {
                const data = await getByRegion(continent);
                const formattedCountries = data.map((country: any) => ({
                    name: country.name.common,
                    capital: country.capital || ['N/A'],
                }));

                setCountries(formattedCountries);
                setShowCountries(true);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        }
    };

    // Usamos debounce para retrasar la llamada a la API de ciudades hasta que el usuario deje de interactuar
    const debouncedCityFetch = debounce(async (countryName: string) => {
        try {
            setLoadingCities(true); // Mostrar el estado de cargando mientras se obtienen las ciudades
            const response = await getCities(countryName);
            setCities(response.data);
            setShowCities(true);
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoadingCities(false); // Ocultar el estado de cargando
        }
    }, 500); 

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryName = e.target.value;
        setSelectedCountry(countryName);
        setShowCities(false);
        setSelectedCity('');

        if (countryName) {
            debouncedCityFetch(countryName); // Llamamos a la función debounced para obtener ciudades
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };

    const addJurisdiction = () => {
        const newJurisdiction: SelectedJurisdiction = {
            continent: selectedContinent,
            country: selectedCountry,
            city: selectedCity,
        };

        if (!selectedJurisdictions.some(
            (j) =>
                j.continent === selectedContinent &&
                j.country === selectedCountry &&
                j.city === selectedCity
        )) {
            setSelectedJurisdictions([...selectedJurisdictions, newJurisdiction]);
            setSelectedCountry('');
            setSelectedCity('');
            setSelectedContinent('');
            setShowCountries(false);
            setShowCities(false);
        }
    };

    const removeJurisdiction = (jurisdiction: SelectedJurisdiction) => {
        setSelectedJurisdictions(selectedJurisdictions.filter((j) => j !== jurisdiction));
    };

    return (
        <div className="space-y-2">
            <div className="space-y-5 mb-2">
                <div className="flex space-x-4">
                    {/* Región */}
                    <div className="w-full flex flex-col space-y-2">
                        <Label name="Ubicación">Ubicación por continente</Label>
                        <select onChange={handleContinentChange} className="common-input">
                            <option value="" disabled>
                                Selecciona un Continente
                            </option>
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* País (aparece solo si hay región seleccionada) */}
                    {showCountries && (
                        <div className="w-full flex flex-col space-y-2">
                            <Label name="Ubicación">País</Label>
                            <select onChange={handleCountryChange} className="common-input">
                                <option value="" disabled>
                                    Selecciona un País
                                </option>
                                {countries.map((country) => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Ciudad (aparece solo si hay país seleccionado) */}
                    {showCities && (
                        <div className="w-full flex flex-col space-y-2">
                            <Label name="Ubicación">Ciudad</Label>
                            {loadingCities ? ( // Mostrar un indicador de cargando si aún no tenemos las ciudades
                                <p>Loading cities...</p>
                            ) : (
                                <select onChange={handleCityChange} className="common-input">
                                    <option value="" disabled>
                                        Selecciona una ciudad
                                    </option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}

                </div>

            </div>
            <Button type="button" className='' onClick={addJurisdiction}>
                Agregar Ubicación
            </Button>

            {/* Lista de jurisdicciones seleccionadas */}
            {selectedJurisdictions.length > 0 && (
                <div>
                    <Label name=''>
                        Selected Jurisdictions:
                    </Label>
                    <ul className="grid lg:grid-cols-3 sn:lg:grid-cols-2 gap-3">
                        {selectedJurisdictions.map((jurisdiction, index) => (
                            <li
                                key={index}
                                className="block text-sm text-white py-2.5 px-2.5"
                            >
                                {jurisdiction.continent ? `${jurisdiction.continent}, ` : ''}
                                {jurisdiction.country ? `${jurisdiction.country}, ` : ''}
                                {jurisdiction.city ? jurisdiction.city : ''}
                                <button
                                    type="button"
                                    onClick={() => removeJurisdiction(jurisdiction)}
                                    className="ml-4 py-1 px-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 cursor-pointer"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
