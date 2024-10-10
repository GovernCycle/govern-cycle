type Country = {
    name: {
      common: string;
      official: string;
      nativeName: Record<string, { official: string; common: string }>;
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Record<string, { name: string; symbol: string }>;
    idd: {
      root: string;
      suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: Record<string, string>;
    translations: Record<string, { official: string; common: string }>;
    latlng: [number, number];
    demonyms: {
      eng: { f: string; m: string };
      fra: { f: string; m: string };
    };
    landlocked: boolean;
    borders: string[];
    area: number;
    flag: string;
    flags: {
      png: string;
      svg: string;
      alt: string;
    };
    coatOfArms: {
      png: string;
      svg: string;
    };
    maps: {
      googleMaps: string;
      openStreetMaps: string;
    };
    population: number;
    gini: Record<string, number>;
    fifa: string;
    timezones: string[];
    continents: string[];
    startOfWeek: string;
    capitalInfo: {
      latlng: [number, number];
    };
  };
  