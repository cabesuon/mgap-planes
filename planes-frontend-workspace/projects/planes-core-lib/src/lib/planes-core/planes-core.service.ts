import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlanCore, PlanesCoreQueryResults } from './planes-core.model';
import { ItemAddResult } from '../extras/extras-request';

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

  addPlanesCore(p: PlanCore): Observable<ItemAddResult[]> {
    return this.http.post<ItemAddResult[]>(`${this.url}/addPlanes`, {
      planes: [{ ...p }]
    });
  }

  changePlanesCore(p: PlanCore): Observable<PlanCore> {
    return this.http.post<PlanCore>(`${this.url}/updatePlanes`, {
      planes: [{ ...p }]
    });
  }

  deletePlanesCore(p: PlanCore): Observable<PlanCore> {
    return this.http.post<PlanCore>(`${this.url}/deletePlanes`, {
      planesIds: [p.planId]
    });
  }
}
