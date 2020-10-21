import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PlanSecano,
  PlanesSecanoQueryResults,
  PlanSecanoAddResult,
  PlanSecanoUpdateResult,
  PlanSecanoDeleteResult
} from './planes-secano.model';

@Injectable({
  providedIn: 'root'
})
export class PlanesSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getPlanesSecano(): Observable<{ queryResults: PlanesSecanoQueryResults }> {
    return this.http.post<{ queryResults: PlanesSecanoQueryResults }>(
      `${this.url}/queryPlanes`,
      {
        token: this.token
      }
    );
  }

  addPlanesSecano(
    p: PlanSecano
  ): Observable<{ addResults: PlanSecanoAddResult[] }> {
    return this.http.post<{ addResults: PlanSecanoAddResult[] }>(
      `${this.url}/addPlanes`,
      {
        planes: [{ ...p }]
      }
    );
  }

  changePlanesSecano(
    p: PlanSecano
  ): Observable<{ updateResults: PlanSecanoUpdateResult[] }> {
    return this.http.post<{ updateResults: PlanSecanoUpdateResult[] }>(
      `${this.url}/updatePlanes`,
      {
        planes: [{ ...p }]
      }
    );
  }

  deletePlanesSecano(
    p: PlanSecano
  ): Observable<{ deleteResults: PlanSecanoDeleteResult[] }> {
    return this.http.post<{ deleteResults: PlanSecanoDeleteResult[] }>(
      `${this.url}/deletePlanes`,
      {
        planesIds: [p.planId]
      }
    );
  }
}
