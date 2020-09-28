import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PlanCore,
  PlanesCoreQueryResults,
  PlanCoreAddResult,
  PlanCoreUpdateResult,
  PlanCoreDeleteResult
} from './planes-core.model';

@Injectable({
  providedIn: 'root'
})
export class PlanesCoreService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getPlanesCore(): Observable<{ queryResults: PlanesCoreQueryResults }> {
    return this.http.post<{ queryResults: PlanesCoreQueryResults }>(
      `${this.url}/queryPlanes`,
      {
        token: this.token
      }
    );
  }

  addPlanesCore(p: PlanCore): Observable<{ addResults: PlanCoreAddResult[] }> {
    return this.http.post<{ addResults: PlanCoreAddResult[] }>(
      `${this.url}/addPlanes`,
      {
        planes: [{ ...p }]
      }
    );
  }

  changePlanesCore(
    p: PlanCore
  ): Observable<{ updateResults: PlanCoreUpdateResult[] }> {
    return this.http.post<{ updateResults: PlanCoreUpdateResult[] }>(
      `${this.url}/updatePlanes`,
      {
        planes: [{ ...p }]
      }
    );
  }

  deletePlanesCore(
    p: PlanCore
  ): Observable<{ deleteResults: PlanCoreDeleteResult[] }> {
    return this.http.post<{ deleteResults: PlanCoreDeleteResult[] }>(
      `${this.url}/deletePlanes`,
      {
        planesIds: [p.planId]
      }
    );
  }
}
