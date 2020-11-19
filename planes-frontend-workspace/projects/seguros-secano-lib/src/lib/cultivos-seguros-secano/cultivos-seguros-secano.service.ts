import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CultivosSegurosSecanoQueryResults } from './cultivos-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class CultivosSegurosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getCultivosSecano(): Observable<{
    queryResults: CultivosSegurosSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: CultivosSegurosSecanoQueryResults }>(
      `${this.url}/queryCultivos`,
      {
        token: this.token
      }
    );
  }
}
