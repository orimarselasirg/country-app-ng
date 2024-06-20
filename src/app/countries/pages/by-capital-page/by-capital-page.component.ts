import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { CountryResponse } from '../../interfaces/CountryResponse.interface';

@Component({
  selector: 'pages-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit{


  private capitalList: CountryResponse[] = []
  public isLoading: boolean = false
  public initialValueComponent: string = ''

  ngOnInit(): void {
    this.capitalList = this.countryService.cacheStore.byCapital.countries
    this.initialValueComponent = this.countryService.cacheStore.byCapital.term
  }

  constructor(private countryService: CountryService){}

  searchCapital(capital: string): void {
    this.isLoading = true
    this.countryService.getCapital(capital).subscribe(data => {
      this.capitalList = data
      this.isLoading = false
    })
  }

  get capitalListApi(): CountryResponse[] {
    return this.capitalList
  }

}
