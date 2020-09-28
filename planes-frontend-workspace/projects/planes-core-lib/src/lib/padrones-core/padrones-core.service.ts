import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PadronesCoreQueryResults } from './padrones-core.model';

@Injectable({
  providedIn: 'root'
})
export class PadronesCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getPadronesCore(
    geometria: string
  ): Observable<{ queryResults: PadronesCoreQueryResults }> {
    return this.http.post<{ queryResults: PadronesCoreQueryResults }>(
      `${this.url}/queryPadrones`,
      { geometria }
    );
  }
}
