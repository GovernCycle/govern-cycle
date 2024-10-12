import { City, Country } from '@app/types/country';
import axios from 'axios';
import { get } from 'http';
import { useCallback } from 'react';

export const useCountry = () => {
  const getCountry = async (country: string) => {
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${country}`);
    return response.data;
  };

  const getAll = useCallback(async () => {
    const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all'); // Nota que aquí se especifica que se espera un array
    return response.data;
  }
    , []);


  const getByRegion = async (region: string) => {
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/region/${region}`);
    return response.data;
  }

  const getCities = useCallback(async (country: string) => {
    const response = await axios.post<City>('https://countriesnow.space/api/v0.1/countries/cities', {
      country,
    })
    return response.data;
  }
    , []);

  return {
    getCountry,
    getAll,
    getByRegion,
    getCities,
  };
};
