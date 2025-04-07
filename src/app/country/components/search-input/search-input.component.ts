import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input('Buscar')
  value = output<string>();
  debounceTime = signal(1000);
  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value)
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
