import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = `${environment.apiUrl}pokemon/`;

  constructor(private http: HttpClient) { }

  searchPokemons(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?name=${query}`);
  }
  
  getPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
