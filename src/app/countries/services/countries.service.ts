import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, pipe, tap } from 'rxjs';
import { CountryResponse } from '../interfaces/CountryResponse.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.types';

@Injectable({providedIn: 'root'})
export class CountryService {

  private base_url: string = "https://restcountries.com/v3.1"

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }


  constructor(private http: HttpClient ) {
    this.loadLocalStorage()
   }

  private saveLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }


  private getCountryRequest(url:string): Observable<CountryResponse[]> {
    return this.http.get<CountryResponse[]>(url)
    .pipe(
      catchError(() => of([])),
    )
  }

  getCapital(query: string): Observable<CountryResponse[]> {
    const url = `${this.base_url}/capital/${query}`
    return this.getCountryRequest(url)
      .pipe(
        tap((countries) => this.cacheStore.byCapital = { term: query, countries}),
        tap(()=> this.saveLocalStorage())
      )

  }
  getCountry(query: string): Observable<CountryResponse[]> {
    const url = `${this.base_url}/name/${query}`
    return this.getCountryRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byCountries = { term: query, countries}),
      tap(()=> this.saveLocalStorage())
    )
  }
  getRegion(query: Region): Observable<CountryResponse[]> {
    const url = `${this.base_url}/region/${query}`
    return this.getCountryRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byRegion = { region: query, countries}),
      tap(()=> this.saveLocalStorage())
    )
  }

  getByAlphaCode(id: string): Observable<CountryResponse | null > {
    return this.http.get<CountryResponse[]>(`${this.base_url}/alpha/${id}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    )
  }
}
