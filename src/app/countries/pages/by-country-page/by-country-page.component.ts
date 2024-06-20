import { Component, OnInit } from '@angular/core';
import { CountryResponse } from '../../interfaces/CountryResponse.interface';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {

  private countryList: CountryResponse[] = []
  public isLoading: boolean = false

  public initialValueComponent: string = ''

  ngOnInit(): void {
    this.countryList = this.countryService.cacheStore.byCountries.countries
    this.initialValueComponent = this.countryService.cacheStore.byCountries.term
  }

  constructor(private countryService: CountryService){}

  searchCountry(country: string): void {
    this.isLoading = true;
    this.countryService.getCountry(country).subscribe(data => {
      this.countryList = data
      this.isLoading = false;
    })
  }

  get countryListApi(): CountryResponse[] {
    return this.countryList
  }


}
