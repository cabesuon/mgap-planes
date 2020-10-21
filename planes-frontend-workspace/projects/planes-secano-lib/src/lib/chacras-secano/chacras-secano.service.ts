import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ChacraSecano,
  ChacrasSecanoQueryResults,
  ChacraSecanoAddResult,
  ChacraSecanoUpdateResult,
  ChacraSecanoDeleteResult
} from './chacras-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ChacrasSecanoService {
  url: string;

  constructor(private http: HttpClient) {}

  getChacrasSecano(): Observable<{ queryResults: ChacrasSecanoQueryResults }> {
    return this.http.post<{ queryResults: ChacrasSecanoQueryResults }>(
      `${this.url}/queryChacras`,
      {}
    );
  }

  addChacrasSecano(
    c: ChacraSecano
  ): Observable<{ addResults: ChacraSecanoAddResult[] }> {
    return this.http.post<{ addResults: ChacraSecanoAddResult[] }>(
      `${this.url}/addChacras`,
      {
        chacras: [{ ...c }]
      }
    );
  }

  changeChacrasSecano(
    c: ChacraSecano
  ): Observable<{ updateResults: ChacraSecanoUpdateResult[] }> {
    return this.http.post<{ updateResults: ChacraSecanoUpdateResult[] }>(
      `${this.url}/updateChacras`,
      {
        chacras: [{ ...c }]
      }
    );
  }

  deleteChacrasSecano(
    c: ChacraSecano
  ): Observable<{ deleteResults: ChacraSecanoDeleteResult[] }> {
    return this.http.post<{ deleteResults: ChacraSecanoDeleteResult[] }>(
      `${this.url}/deleteChacras`,
      {
        chacrasIds: [c.chacraId]
      }
    );
  }
}
