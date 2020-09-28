import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ZonaExclusionCore,
  ZonasExclusionCoreQueryResults,
  ZonaExclusionCoreAddResult,
  ZonaExclusionCoreUpdateResult,
  ZonaExclusionCoreDeleteResult
} from './zonas-exclusion-core.model';

@Injectable({
  providedIn: 'root'
})
export class ZonasExclusionCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getZonasExclusionCore(): Observable<{
    queryResults: ZonasExclusionCoreQueryResults;
  }> {
    return this.http.post<{ queryResults: ZonasExclusionCoreQueryResults }>(
      `${this.url}/queryZonasExclusion`,
      {}
    );
  }

  addZonasExclusionCore(
    z: ZonaExclusionCore
  ): Observable<{ addResults: ZonaExclusionCoreAddResult[] }> {
    return this.http.post<{
      addResults: ZonaExclusionCoreAddResult[];
    }>(`${this.url}/addZonasExclusion`, {
      ZonaExclusiones: [{ ...z }]
    });
  }

  changeZonasExclusionCore(
    z: ZonaExclusionCore
  ): Observable<{ updateResults: ZonaExclusionCoreUpdateResult[] }> {
    return this.http.post<{ updateResults: ZonaExclusionCoreUpdateResult[] }>(
      `${this.url}/updateZonasExclusion`,
      {
        ZonaExclusiones: [{ ...z }]
      }
    );
  }

  deleteZonasExclusionCore(
    z: ZonaExclusionCore
  ): Observable<{ deleteResults: ZonaExclusionCoreDeleteResult[] }> {
    return this.http.post<{ deleteResults: ZonaExclusionCoreDeleteResult[] }>(
      `${this.url}/deleteZonasExclusion`,
      {
        ZonasExclusionIds: [z.zonaExclusionId]
      }
    );
  }
}
