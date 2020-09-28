import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ChacraCore,
  ChacrasCoreQueryResults,
  ChacraCoreAddResult,
  ChacraCoreUpdateResult,
  ChacraCoreDeleteResult
} from './chacras-core.model';

@Injectable({
  providedIn: 'root'
})
export class ChacrasCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getChacrasCore(): Observable<{ queryResults: ChacrasCoreQueryResults }> {
    return this.http.post<{ queryResults: ChacrasCoreQueryResults }>(
      `${this.url}/queryChacras`,
      {}
    );
  }

  addChacrasCore(
    c: ChacraCore
  ): Observable<{ addResults: ChacraCoreAddResult[] }> {
    return this.http.post<{ addResults: ChacraCoreAddResult[] }>(
      `${this.url}/addChacras`,
      {
        chacras: [{ ...c }]
      }
    );
  }

  changeChacrasCore(
    c: ChacraCore
  ): Observable<{ updateResults: ChacraCoreUpdateResult[] }> {
    return this.http.post<{ updateResults: ChacraCoreUpdateResult[] }>(
      `${this.url}/updateChacras`,
      {
        chacras: [{ ...c }]
      }
    );
  }

  deleteChacrasCore(
    c: ChacraCore
  ): Observable<{ deleteResults: ChacraCoreDeleteResult[] }> {
    return this.http.post<{ deleteResults: ChacraCoreDeleteResult[] }>(
      `${this.url}/deleteChacras`,
      {
        chacrasIds: [c.chacraId]
      }
    );
  }
}
