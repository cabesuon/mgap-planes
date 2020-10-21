import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelacionesPerdidaSuelosSecanoQueryResults } from './relaciones-perdida-suelo-secano.model';

@Injectable({
  providedIn: 'root'
})
export class RelacionesPerdidaSueloSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getRelacionesPerdidaSueloSecano(): Observable<{
    queryResults: RelacionesPerdidaSuelosSecanoQueryResults;
  }> {
    return this.http.post<{
      queryResults: RelacionesPerdidaSuelosSecanoQueryResults;
    }>(`${this.url}/queryRelacionPerdidaSuelos`, {
      token: this.token
    });
  }
}
