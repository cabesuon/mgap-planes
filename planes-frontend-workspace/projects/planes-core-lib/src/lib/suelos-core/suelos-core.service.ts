import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  SueloCore,
  SueloCoreMeta,
  metaToSuelosCore,
  SUELOS_CORE_META
} from './suelos-core.model';
import { SuelosCoreQueryResults } from './suelos-core.model';

@Injectable({
  providedIn: 'root'
})
export class SuelosCoreService {
  url: string;
  urlMeta: string;

  constructor(private http: HttpClient) {}

  getSuelosCore(
    geometria: string
  ): Observable<{ queryResults: SuelosCoreQueryResults }> {
    return this.http.post<{ queryResults: SuelosCoreQueryResults }>(
      `${this.url}/querySuelos`,
      { geometria }
    );
  }

  getSuelosCoreMeta(): Observable<SueloCore[]> {
    return of(metaToSuelosCore(SUELOS_CORE_META.features));
    // return this.http.post(
    //   this.urlMeta,
    //   {
    //     where: '1=1',
    //     outFields: ['CODIGO', 'SUELO_R6', 'FACTOR_K', 'T'],
    //     returnGeometry: false,
    //     returnDistinctValues: true,
    //     f: 'json'
    //   }
    // ).pipe(
    //   map((r: SueloCoreMeta) => metaToSuelosCore(r.features)),
    //   catchError(_ => of(metaToSuelosCore(SUELOS_CORE_META.features)))
    // );
  }
}
