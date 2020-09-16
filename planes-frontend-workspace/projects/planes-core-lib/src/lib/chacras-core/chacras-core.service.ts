import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ChacraCore, ChacrasCoreQueryResults } from './chacras-core.model';
import { ItemAddResult } from '../extras/extras-request';

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

  addChacrasCore(c: ChacraCore): Observable<ItemAddResult[]> {
    return this.http.post<ItemAddResult[]>(`${this.url}/addChacras`, {
      chacras: [{ ...c }]
    });
  }

  changeChacrasCore(c: ChacraCore): Observable<ChacraCore> {
    return this.http.post<ChacraCore>(`${this.url}/updateChacras`, {
      chacras: [{ ...c }]
    });
  }

  deleteChacrasCore(c: ChacraCore): Observable<ChacraCore> {
    return this.http.post<ChacraCore>(`${this.url}/deleteChacras`, {
      chacrasIds: [c.chacraId]
    });
  }
}
