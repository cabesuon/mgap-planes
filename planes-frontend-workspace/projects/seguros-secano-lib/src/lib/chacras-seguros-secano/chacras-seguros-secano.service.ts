import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ChacraSegurosSecano,
  ChacrasSegurosSecanoQueryResults,
  ChacraSegurosSecanoAddResult,
  ChacraSegurosSecanoUpdateResult,
  ChacraSegurosSecanoDeleteResult
} from './chacras-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ChacrasSegurosSecanoService {
  url: string;

  constructor(private http: HttpClient) {}

  getChacrasSegurosSecano(): Observable<{
    queryResults: ChacrasSegurosSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: ChacrasSegurosSecanoQueryResults }>(
      `${this.url}/queryChacras`,
      {}
    );
  }

  addChacrasSegurosSecano(
    c: ChacraSegurosSecano
  ): Observable<{ addResults: ChacraSegurosSecanoAddResult[] }> {
    return this.http.post<{ addResults: ChacraSegurosSecanoAddResult[] }>(
      `${this.url}/addChacras`,
      {
        chacras: [{ ...c }]
      }
    );
  }

  changeChacrasSegurosSecano(
    c: ChacraSegurosSecano
  ): Observable<{ updateResults: ChacraSegurosSecanoUpdateResult[] }> {
    return this.http.post<{ updateResults: ChacraSegurosSecanoUpdateResult[] }>(
      `${this.url}/updateChacras`,
      {
        chacras: [{ ...c }]
      }
    );
  }

  deleteChacrasSegurosSecano(
    c: ChacraSegurosSecano
  ): Observable<{ deleteResults: ChacraSegurosSecanoDeleteResult[] }> {    
    return this.http.post<{ deleteResults: ChacraSegurosSecanoDeleteResult[] }>(
      `${this.url}/deleteChacras`,
      {
        chacrasIds: [c.chacraId]
      }
    );
  }
}
