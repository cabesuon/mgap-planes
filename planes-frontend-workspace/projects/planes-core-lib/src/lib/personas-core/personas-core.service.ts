import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PersonasCoreQueryResults } from './personas-core.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getPersonasCore(
    personasId: number[]
  ): Observable<{ queryResults: PersonasCoreQueryResults }> {
    return this.http.post<{ queryResults: PersonasCoreQueryResults }>(
      `${this.url}/queryPersonas`,
      { personasId }
    );
  }
}
