import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CultivosSecanoQueryResults } from './cultivos-secano.model';

@Injectable({
  providedIn: 'root'
})
export class CultivosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getCultivosSecano(): Observable<{
    queryResults: CultivosSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: CultivosSecanoQueryResults }>(
      `${this.url}/queryCultivos`,
      {
        token: this.token
      }
    );
  }
}
