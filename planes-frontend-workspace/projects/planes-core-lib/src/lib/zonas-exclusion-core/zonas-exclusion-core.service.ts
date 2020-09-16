import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ZonaExclusionCore,
  ZonaExclusionCoreQueryResults
} from './zonas-exclusion-core.model';

@Injectable({
  providedIn: 'root'
})
export class ZonasExclusionCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getZonasExclusionCore(): Observable<{
    queryResults: ZonaExclusionCoreQueryResults;
  }> {
    return this.http.post<{ queryResults: ZonaExclusionCoreQueryResults }>(
      `${this.url}/queryZonasExclusion`,
      {}
    );
  }

  addZonasExclusionCore(z: ZonaExclusionCore): Observable<ZonaExclusionCore> {
    return this.http.post<ZonaExclusionCore>(`${this.url}/addZonasExclusion`, {
      ZonaExclusiones: [{ ...z }]
    });
  }

  changeZonasExclusionCore(
    z: ZonaExclusionCore
  ): Observable<ZonaExclusionCore> {
    return this.http.post<ZonaExclusionCore>(
      `${this.url}/updateZonasExclusion`,
      {
        ZonaExclusiones: [{ ...z }]
      }
    );
  }

  deleteZonasExclusionCore(
    z: ZonaExclusionCore
  ): Observable<ZonaExclusionCore> {
    return this.http.post<ZonaExclusionCore>(
      `${this.url}/deleteZonasExclusion`,
      {
        ZonasExclusionIds: [z.zonaExclusionId]
      }
    );
  }
}
