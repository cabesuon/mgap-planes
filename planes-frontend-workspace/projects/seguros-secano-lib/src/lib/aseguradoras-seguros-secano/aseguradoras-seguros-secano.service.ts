import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AseguradorasSegurosSecanoQueryResults
} from './aseguradoras-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class AseguradorasSegurosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getAseguradorasSegurosSecano(): Observable<{
    queryResults: AseguradorasSegurosSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: AseguradorasSegurosSecanoQueryResults }>(
      `${this.url}/queryAseguradoras`,
      {
        token: this.token
      }
    );
  }
}
