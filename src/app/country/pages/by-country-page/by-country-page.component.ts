import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  query = signal('');
  countryResource = rxResource({
    request: () => ({
      query:this.query()
    }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      return this.countryService.searchByCountry(request.query)
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
