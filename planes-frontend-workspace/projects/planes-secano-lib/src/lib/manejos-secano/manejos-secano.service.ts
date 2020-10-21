import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManejosSecanoQueryResults } from './manejos-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ManejosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getManejosSecano(): Observable<{ queryResults: ManejosSecanoQueryResults }> {
    return this.http.post<{ queryResults: ManejosSecanoQueryResults }>(
      `${this.url}/queryManejos`,
      {
        token: this.token
      }
    );
  }
}
