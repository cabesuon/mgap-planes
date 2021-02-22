import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ComponenteProductivoSegurosSecano,
  ComponentesProductivosSegurosSecanoQueryResults,
  ComponentesProductivosSegurosSecanoAddResult,
  ComponentesProductivosSegurosSecanoUpdateResult,
  ComponentesProductivosSegurosSecanoDeleteResult
} from './componentes-productivos-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentesProductivosSegurosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getComponentesProductivosSegurosSecano(): Observable<{
    queryResults: ComponentesProductivosSegurosSecanoQueryResults;
  }> {
    return this.http.post<{
      queryResults: ComponentesProductivosSegurosSecanoQueryResults;
    }>(`${this.url}/queryComponentesProductivos`, {
      token: this.token
    });
  }

  addComponentesProductivosSegurosSecano(
    c: ComponenteProductivoSegurosSecano
  ): Observable<{
    addResults: ComponentesProductivosSegurosSecanoAddResult[];
  }> {
    return this.http.post<{
      addResults: ComponentesProductivosSegurosSecanoAddResult[];
    }>(`${this.url}/addComponentesProductivos`, {
      componentes: [{ ...c }]
    });
  }

  changeComponentesProductivosSegurosSecano(
    c: ComponenteProductivoSegurosSecano[]
  ): Observable<{
    updateResults: ComponentesProductivosSegurosSecanoUpdateResult[];
  }> {
    return this.http.post<{
      updateResults: ComponentesProductivosSegurosSecanoUpdateResult[];
    }>(`${this.url}/updateComponentesProductivos`, {
      componentes: [{ ...c }]
    });
  }

  deleteComponentesProductivosSegurosSecano(
    c: ComponenteProductivoSegurosSecano
  ): Observable<{
    deleteResults: ComponentesProductivosSegurosSecanoDeleteResult[];
  }> {
    return this.http.post<{
      deleteResults: ComponentesProductivosSegurosSecanoDeleteResult[];
    }>(`${this.url}/deleteComponentesProductivos`, {
      componentesIds: [c.componenteId]
    });
  }
}
