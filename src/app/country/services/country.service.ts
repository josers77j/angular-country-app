import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RestCountry } from '../interfaces/rest-country.interface';
import type { Country } from '../interfaces/country.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapCountryToCountryArray(restCountries)),
        catchError(error => {
          console.log('Error en la peticion', error);
          return throwError(() => new Error('No se pudo obtener la lista de capitales'));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      delay(3000),
      map((resp) => CountryMapper.mapCountryToCountryArray(resp)),
      catchError((error) => {
        console.log('Error en la peticion', error);
        return throwError(() => new Error('No se pudo obtener la lista de paises'));
      })
    )
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RestCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapCountryToCountryArray(resp)),
      map(countries => countries.at(0)),
      catchError((error) => {
        console.log('Error en la peticion', error);
        return throwError(() => new Error(`No se pudo obtener el pais con el codigo ${code}`));
      })
    )
  }

}
