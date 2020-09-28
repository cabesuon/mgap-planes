import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmpresasCoreQueryResults } from './empresas-core.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasCoreService {
  url: string;

  constructor(private http: HttpClient) {}

  getEmpresasCore(): Observable<{ queryResults: EmpresasCoreQueryResults }> {
    return this.http.post<{ queryResults: EmpresasCoreQueryResults }>(
      `${this.url}/queryEmpresas`,
      {}
    );
  }
}
