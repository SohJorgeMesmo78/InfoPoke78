// src/app/core/services/pokemon.service.ts
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

  getPokemon(pokemonName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${pokemonName}`);
  }
}
