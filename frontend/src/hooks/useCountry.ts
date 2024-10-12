import axios from 'axios';

export const useCountry = () => {
  const getCountry = async (country: string) => {
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${country}`);
    return response.data;
  };

  const getAll = async () => {
    const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all'); // Nota que aquí se especifica que se espera un array
    return response.data;
  }

  return {
    getCountry,
    getAll,
  };
};
