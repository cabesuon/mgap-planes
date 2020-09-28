import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SuelosCoreQueryResults } from './suelos-core.model';

@Injectable({
  providedIn: 'root'
})
export class SuelosCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getSuelosCore(
    geometria: string
  ): Observable<{ queryResults: SuelosCoreQueryResults }> {
    return this.http.post<{ queryResults: SuelosCoreQueryResults }>(
      `${this.url}/querySuelos`,
      { geometria }
    );
  }
}
