import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
})
export class CountryInformationComponent {
  country = input.required<Country>()

  currentYear = computed(() => new Date().getFullYear())
}
