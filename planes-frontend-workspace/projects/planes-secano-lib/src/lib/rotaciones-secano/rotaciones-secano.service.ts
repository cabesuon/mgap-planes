import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RotacionSecano,
  RotacionesSecanoQueryResults,
  RotacionSecanoAddResult,
  RotacionSecanoUpdateResult,
  RotacionSecanoDeleteResult
} from './rotaciones-secano.model';

@Injectable({
  providedIn: 'root'
})
export class RotacionesSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getRotacionesSecano(): Observable<{
    queryResults: RotacionesSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: RotacionesSecanoQueryResults }>(
      `${this.url}/queryRotaciones`,
      {
        token: this.token
      }
    );
  }

  addRotacionesSecano(
    r: RotacionSecano
  ): Observable<{ addResults: RotacionSecanoAddResult[] }> {
    return this.http.post<{ addResults: RotacionSecanoAddResult[] }>(
      `${this.url}/addRotaciones`,
      {
        rotaciones: [{ ...r }]
      }
    );
  }

  changeRotacionesSecano(
    r: RotacionSecano
  ): Observable<{ updateResults: RotacionSecanoUpdateResult[] }> {
    return this.http.post<{ updateResults: RotacionSecanoUpdateResult[] }>(
      `${this.url}/updateRotaciones`,
      {
        rotaciones: [{ ...r }]
      }
    );
  }

  deleteRotacionesSecano(
    r: RotacionSecano
  ): Observable<{ deleteResults: RotacionSecanoDeleteResult[] }> {
    return this.http.post<{ deleteResults: RotacionSecanoDeleteResult[] }>(
      `${this.url}/deleteRotaciones`,
      {
        ids: [r.rotacionId]
      }
    );
  }
}
