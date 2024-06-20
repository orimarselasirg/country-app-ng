import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { CountryResponse } from '../../interfaces/CountryResponse.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{


  public country?: CountryResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap((params) => this.countryService.getByAlphaCode(params['id'])))
    .subscribe((res) => {
      if(!res) return this.router.navigateByUrl('')

      return this.country = res
    })
  }
}
