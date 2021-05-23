import { createContext } from 'react';

const CountriesDataContext = createContext({
    countriesData: [],
    setCountriesData: (_) => {}
})

export default CountriesDataContext;