import type { Country } from '../interfaces/country.interfaces';
import type { RestCountry } from '../interfaces/rest-country.interface';
export class CountryMapper {


  //static RestCountry => Country
  static mapCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      capital: restCountry.capital.join(', '),
      population: restCountry.population
    };
  }


  //static RestCountry[] => Country[]
  static mapCountryToCountryArray(countries: RestCountry[]): Country[] {
    return countries.map(this.mapCountryToCountry);
  }
}
