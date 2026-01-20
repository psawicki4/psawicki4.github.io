import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country.type';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  httpClient = inject(HttpClient);

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(
      'https://restcountries.com/v3.1/all?fields=name,capital,population,region,area,unMember,languages'
    );
  }
}
