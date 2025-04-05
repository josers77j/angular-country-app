import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NorFoundComponent {

  location = inject(Location);

  goback(){
    this.location.back();
  }
}
