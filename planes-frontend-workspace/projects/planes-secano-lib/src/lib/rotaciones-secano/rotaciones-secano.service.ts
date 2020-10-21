import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RotacionesSecanoQueryResults } from './rotaciones-secano.model';

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
}
