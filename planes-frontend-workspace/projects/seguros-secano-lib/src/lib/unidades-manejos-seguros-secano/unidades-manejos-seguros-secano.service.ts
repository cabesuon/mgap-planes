import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  UnidadManejoSegurosSecano,
  UnidadesManejosSegurosSecanoQueryResults,
  UnidadesManejosSegurosSecanoAddResult,
  UnidadesManejosSegurosSecanoUpdateResult,
  UnidadesManejosSegurosSecanoDeleteResult
} from './unidades-manejos-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadesManejosSegurosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getUnidadesManejosSegurosSecano(): Observable<{
    queryResults: UnidadesManejosSegurosSecanoQueryResults;
  }> {
    return this.http.post<{
      queryResults: UnidadesManejosSegurosSecanoQueryResults;
    }>(`${this.url}/queryUnidades`, {
      token: this.token
    });
  }

  addUnidadesManejosSegurosSecano(
    u: UnidadManejoSegurosSecano
  ): Observable<{
    addResults: UnidadesManejosSegurosSecanoAddResult[];
  }> {
    return this.http.post<{
      addResults: UnidadesManejosSegurosSecanoAddResult[];
    }>(`${this.url}/addUnidades`, {
      unidades: [{ ...u }]
    });
  }

  changeUnidadesManejosSecano(
    u: UnidadManejoSegurosSecano
  ): Observable<{
    updateResults: UnidadesManejosSegurosSecanoUpdateResult[];
  }> {
    return this.http.post<{
      updateResults: UnidadesManejosSegurosSecanoUpdateResult[];
    }>(`${this.url}/updateUnidades`, {
      unidades: [{ ...u }]
    });
  }

  deleteUnidadesManejosSegurosSecano(
    u: UnidadManejoSegurosSecano
  ): Observable<{
    deleteResults: UnidadesManejosSegurosSecanoDeleteResult[];
  }> {
    return this.http.post<{
      deleteResults: UnidadesManejosSegurosSecanoDeleteResult[];
    }>(`${this.url}/deleteUnidades`, {
      unidadesIds: [u.unidadId]
    });
  }
}
