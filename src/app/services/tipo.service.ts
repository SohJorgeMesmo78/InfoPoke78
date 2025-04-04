import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tipo } from '../interfaces/tipo.model';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private apiUrl = `${environment.apiUrl}tipos`;

  constructor(private http: HttpClient) {}

  public getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl);
  }
}
