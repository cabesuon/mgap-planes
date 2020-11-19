import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CiclosSegurosSecanoQueryResults } from './ciclos-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class CiclosSegurosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getCiclosSegurosSecano(): Observable<{
    queryResults: CiclosSegurosSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: CiclosSegurosSecanoQueryResults }>(
      `${this.url}/queryCiclos`,
      {
        token: this.token
      }
    );
  }
}
