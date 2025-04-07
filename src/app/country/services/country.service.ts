import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RestCountry } from '../interfaces/rest-country.interface';
import type { Country } from '../interfaces/country.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  queryCacheCapital = new Map<string, Country[]>();
  queryCacheCountry = new Map<string, Country[]>();
  queryCacheRegion = new Map<string, Country[]>();


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    console.log(this.queryCacheCapital);

    if(this.queryCacheCapital.has(query))
      return of(this.queryCacheCapital.get(query) ?? [])

      console.log(`Buscando ${query} en el cache de busqueda por capital`);
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapCountryToCountryArray(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error en la peticion', error);
          return throwError(() => new Error('No se pudo obtener la lista de capitales'));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if(this.queryCacheCountry.has(query))
      return of(this.queryCacheCountry.get(query) ?? [])


    console.log(this.queryCacheCountry);

    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapCountryToCountryArray(resp)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(3000),
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

  searchByRegion(region: string): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;
    if(this.queryCacheRegion.has(region))
      return of(this.queryCacheRegion.get(region) ?? [])

    console.log('by country here -> ', this.queryCacheRegion);

    return this.http.get<RestCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapCountryToCountryArray(resp)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error en la peticion', error);
        return throwError(() => new Error('No se pudo obtener la lista de regiones'));
      })
    )
  }

}
