import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  PlanSecano,
  PlanesSecanoQueryResults,
  PlanSecanoAddResult,
  PlanSecanoUpdateResult,
  PlanSecanoDeleteResult,
  PlanSecanoGetUrlResult,
  PlanSecanoUrlType
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
    console.log(`[deletePlanesSecano] planId: ${p.planId}`);
    return this.http.post<{ deleteResults: PlanSecanoDeleteResult[] }>(
      `${this.url}/deletePlanes`,
      {
        ids: [p.planId]
      }
    );
  }

  copyPlanesSecano(
    p: PlanSecano
  ): Observable<{ addResults: PlanSecanoAddResult[] }> {
    return this.http.post<{ addResults: PlanSecanoAddResult[] }>(
      `${this.url}/copyPlanes`,
      {
        ids: [p.planId]
      }
    );
  }

  getUrlPlanSecano(
    p: PlanSecano,
    urlType: PlanSecanoUrlType
  ): Observable<{ getResult: PlanSecanoGetUrlResult }> {
    switch (urlType) {
      case PlanSecanoUrlType.PASARELA_PAGOS:
        return this.http
          .post<{ resultado: PlanSecanoGetUrlResult }>(
            `${this.url}/armarURLPasarelaPagos`,
            {
              planId: p.planId
            }
          )
          .pipe(
            map(results => results.resultado),
            map(getResult => ({
              getResult: {
                ...getResult
              }
            }))
          );
      case PlanSecanoUrlType.REPORT:
        return this.http
          .post<{ getResults: PlanSecanoGetUrlResult }>(
            `${this.url}/getReportePlan`,
            {
              planId: p.planId
            }
          )
          .pipe(
            map(results => results.getResults),
            map(getResult => ({
              getResult: {
                ...getResult
              }
            }))
          );
    }
  }
}
