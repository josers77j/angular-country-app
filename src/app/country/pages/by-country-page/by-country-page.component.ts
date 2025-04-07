import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({
      query:this.query()
    }),
    loader: ({ request }) => {

      const {query} = request;

      if (!query) return of([]);

      this.router.navigate(['country/by-country'],{
        queryParams:{
          query,
        }
      })

      return this.countryService.searchByCountry(query)
    }
  })

  /*
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(value: string) {
    if(this.isLoading()) return ;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCountry(value).subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);
    });

  } */

 }
