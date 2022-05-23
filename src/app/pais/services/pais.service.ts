import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interface/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private apiUrlRegion: string = 'https://restcountries.com/v2/regionalbloc';
  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,flags,population,cca2,alpha2Code');
  }

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(tap(console.log));
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(tap(console.log));
  }

  getPaisPorAlpha(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url).pipe(tap(console.log));
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrlRegion}/${region}`;
    return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(tap(console.log));
  }
}
