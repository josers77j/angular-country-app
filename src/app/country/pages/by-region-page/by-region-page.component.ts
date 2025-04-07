import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import type { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';


function validatedRegionParam(queryParam: string):Region{
  queryParam = queryParam.toLowerCase();

  const validRegions : Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  }

  return validRegions[queryParam] || 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  countryService = inject(CountryService);


  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region>(() => validatedRegionParam(this.queryParam));

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    request:() => ({
      region: this.selectedRegion()
    }),
    loader:({ request}) => {
      console.log(this.selectedRegion());
      if(!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        }
      })

      return this.countryService.searchByRegion(request.region)
    }
  })
 }
