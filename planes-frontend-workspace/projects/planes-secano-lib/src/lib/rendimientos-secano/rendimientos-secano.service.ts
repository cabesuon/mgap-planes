import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendimientosSecanoQueryResults } from './rendimientos-secano.model';

@Injectable({
  providedIn: 'root'
})
export class RendimientosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getRendimientosSecano(): Observable<{
    queryResults: RendimientosSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: RendimientosSecanoQueryResults }>(
      `${this.url}/queryRendimientos`,
      {
        token: this.token
      }
    );
  }
}
