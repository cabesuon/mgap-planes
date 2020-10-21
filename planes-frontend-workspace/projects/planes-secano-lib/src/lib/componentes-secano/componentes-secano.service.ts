import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponentesSecanoQueryResults } from './componentes-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentesSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getComponentesSecano(): Observable<{
    queryResults: ComponentesSecanoQueryResults;
  }> {
    return this.http.post<{ queryResults: ComponentesSecanoQueryResults }>(
      `${this.url}/queryRotacionesComponentes`,
      {
        token: this.token
      }
    );
  }
}
