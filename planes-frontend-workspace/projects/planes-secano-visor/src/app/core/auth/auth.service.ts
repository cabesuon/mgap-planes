import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { GetTokensResult } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(token: string): Observable<{ personaId: number }> {
    console.log(`[login] ${environment.apiUrl}`);
    return this.http
      .post<{ queryResults: GetTokensResult }>(
        `${environment.apiUrl}/queryTokens`,
        {
          tokens: [token]
        }
      )
      .pipe(
        map(response => {
          console.log(response);
          if (response.queryResults.success) {
            return { personaId: response.queryResults.personasId[0] };
          }
          return null;
        })
      );
  }
}
