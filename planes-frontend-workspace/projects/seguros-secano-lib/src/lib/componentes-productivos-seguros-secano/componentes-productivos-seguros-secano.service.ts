import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ComponenteProductivoSegurosSecano,
  ComponentesProductivosSegurosSecanoQueryResults,
  ComponentesProductivosSegurosSecanoAddResult,
  ComponentesProductivosSegurosSecanoUpdateResult,
  ComponentesProductivosSegurosSecanoDeleteResult
} from './componentes-productivos-seguros-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentesProductivosSegurosSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getComponentesProductivosSegurosSecano(): Observable<{
    queryResults: ComponentesProductivosSegurosSecanoQueryResults;
  }> {
    return this.http.post<{
      queryResults: ComponentesProductivosSegurosSecanoQueryResults;
    }>(`${this.url}/queryComponentesProductivos`, {
      token: this.token
    });
  }

  addComponentesProductivosSegurosSecano(
    c: ComponenteProductivoSegurosSecano
  ): Observable<{
    addResults: ComponentesProductivosSegurosSecanoAddResult[];
  }> {
    return this.http.post<{
      addResults: ComponentesProductivosSegurosSecanoAddResult[];
    }>(`${this.url}/addComponentesProductivos`, {
      componentes: [{ ...c }]
    });
  }

  changeComponentesProductivosSegurosSecano(
    c: ComponenteProductivoSegurosSecano[]
  ): Observable<{
    updateResults: ComponentesProductivosSegurosSecanoUpdateResult[];
  }> {
    return this.http.post<{
      updateResults: ComponentesProductivosSegurosSecanoUpdateResult[];
    }>(`${this.url}/updateComponentesProductivos`, {
      componentes: [{ ...c }]
    });
  }

  deleteComponentesProductivosSegurosSecano(
    c: ComponenteProductivoSegurosSecano
  ): Observable<{
    deleteResults: ComponentesProductivosSegurosSecanoDeleteResult[];
  }> {
    return this.http.post<{
      deleteResults: ComponentesProductivosSegurosSecanoDeleteResult[];
    }>(`${this.url}/deleteComponentesProductivos`, {
      componentesIds: [c.componenteId]
    });
  }

  isValidComponenteProductivo(c: ComponenteProductivoSegurosSecano): boolean {
    // verificar que no sean null los atributos obligatorios
    // las fechas ya estan verificadas
    // verificar que la sup de cosecha no se mayor a la siembra
    let ret = false;    
    if (c.cultivoId && 
        c.cicloId && 
        c.contratoSeguroZPId && 
        c.superficieSembrada && 
        c.superficieCosechada && 
        c.fechaSiembra && 
        c.fechaCosecha &&
        c.fertilizacionP2O5 &&
        c.fertilizacionK2O &&
        c.fertilizacionN &&
        c.fertilizacionS &&
        c.rendimiento){      
      if (c.superficieSembrada >= c.superficieCosechada){
          ret = true;          
      }
    }    
    return ret;       
  }
}
