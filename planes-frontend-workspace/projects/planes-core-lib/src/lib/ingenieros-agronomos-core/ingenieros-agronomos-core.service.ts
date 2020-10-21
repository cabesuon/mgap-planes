import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IngenierosAgronomosCoreQueryResults } from './ingenieros-agronomos-core.model';

@Injectable({
  providedIn: 'root'
})
export class IngenierosAgronomosCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getIngenierosAgronomosCore(): Observable<{
    queryResults: IngenierosAgronomosCoreQueryResults;
  }> {
    return this.http.post<{
      queryResults: IngenierosAgronomosCoreQueryResults;
    }>(`${this.url}/queryIngenierosAgronomos`, {});
  }
}
