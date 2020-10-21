import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResponsablesSecanoQueryResults } from './responsables-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesSecanoService {
  url: string;

  constructor(private http: HttpClient) {}

  getResponsablesSecano(): Observable<{
    queryResults: ResponsablesSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: ResponsablesSecanoQueryResults }>(
      `${this.url}/queryResponsables`,
      {}
    );
  }
}
