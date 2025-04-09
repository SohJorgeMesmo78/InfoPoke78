import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PokemonTable } from '../interfaces/pokemon.model';
import { Paginacao } from '../interfaces/paginacao.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = `${environment.apiUrl}pokemon`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public getPokemons(
    pagina: number,
    limite: number,
    nome: string,
    tipos: string[] = []
  ): Observable<Paginacao<PokemonTable>> {
    let params = new HttpParams()
      .set('pagina', pagina)
      .set('limite', limite);
  
    if (nome) {
      params = params.set('nome', nome.toLowerCase());
    }
  
    if (tipos.length) {
      params = params.set('tipo', tipos.join(','));
    }
  
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      type: 'application/json',
    });
  
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
  
    return this.http.get<Paginacao<PokemonTable>>(this.apiUrl, { headers, params });
  } 

  public getPokemonById(id: number): Observable<PokemonTable> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      type: 'application/json',
    });
  
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
  
    return this.http.get<PokemonTable>(`${this.apiUrl}/${id}`, { headers });
  }
  
  
}
