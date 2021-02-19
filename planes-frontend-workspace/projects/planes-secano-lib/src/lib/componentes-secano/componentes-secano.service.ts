import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ComponenteSecano,
  ComponentesSecanoQueryResults,
  ComponenteSecanoAddResult,
  ComponenteSecanoUpdateResult,
  ComponenteSecanoDeleteResult
} from './componentes-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentesSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getComponentesSecano(): Observable<{
    queryResults: ComponentesSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: ComponentesSecanoQueryResults }>(
      `${this.url}/queryRotacionComponentes`,
      {
        token: this.token
      }
    );
  }

  addComponenteSecano(
    c: ComponenteSecano
  ): Observable<{ addResults: ComponenteSecanoAddResult[] }> {
    return this.http.post<{ addResults: ComponenteSecanoAddResult[] }>(
      `${this.url}/addRotacionComponentes`,
      {
        rotacionComponentes: [{ ...c }]
      }
    );
  }

  changeComponenteSecano(
    c: ComponenteSecano
  ): Observable<{ updateResults: ComponenteSecanoUpdateResult[] }> {
    return this.http.post<{ updateResults: ComponenteSecanoUpdateResult[] }>(
      `${this.url}/updateRotacionComponentes`,
      {
        rotacionComponentes: [{ ...c }]
      }
    );
  }

  deleteComponenteSecano(
    c: ComponenteSecano
  ): Observable<{ deleteResults: ComponenteSecanoDeleteResult[] }> {
    return this.http.post<{ deleteResults: ComponenteSecanoDeleteResult[] }>(
      `${this.url}/deleteRotacionComponentes`,
      {
        componentes: [c]
      }
    );
  }
}
