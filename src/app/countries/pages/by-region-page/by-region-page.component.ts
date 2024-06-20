import { Component } from '@angular/core';
import { CountryResponse } from '../../interfaces/CountryResponse.interface';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.types';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  private countryByRegionList: CountryResponse[] = []
  public isLoading: boolean = false
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  public selectedRegion?: Region

  ngOnInit(): void {
    this.countryByRegionList = this.countryService.cacheStore.byRegion.countries
    this.selectedRegion = this.countryService.cacheStore.byRegion.region
  }

  constructor(private countryService: CountryService){}

  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region
    this.countryService.getRegion(region).subscribe(data => {
      this.countryByRegionList = data
      this.isLoading = false;
    })
  }

  get countryByRegionListApi(): CountryResponse[] {
    return this.countryByRegionList
  }


}
