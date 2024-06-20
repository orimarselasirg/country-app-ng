import { Component, Input } from '@angular/core';
import { CountryResponse } from '../../interfaces/CountryResponse.interface';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {

  @Input()
  public countries: CountryResponse[] = []

}
