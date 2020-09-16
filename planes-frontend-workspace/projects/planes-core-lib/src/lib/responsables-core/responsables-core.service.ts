import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ResponsablesCoreQueryResults } from './responsables-core.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getPropietariosResponsablesCore(
    personasId: number[]
  ): Observable<{ queryResults: ResponsablesCoreQueryResults }> {
    return this.http.post<{ queryResults: ResponsablesCoreQueryResults }>(
      `${this.url}/queryPropietariosResponsables`,
      { personasId }
    );
  }

  getArrendatariosResponsablesCore(
    personasId: number[]
  ): Observable<{ queryResults: ResponsablesCoreQueryResults }> {
    return this.http.post<{ queryResults: ResponsablesCoreQueryResults }>(
      `${this.url}/queryArrendatariosResponsables`,
      { personasId }
    );
  }
}
