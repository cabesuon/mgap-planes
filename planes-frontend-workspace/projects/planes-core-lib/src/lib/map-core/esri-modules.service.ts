import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { loadModules } from 'esri-loader';

@Injectable({
  providedIn: 'root'
})
export class EsriModulesService {
  private _modules: { [name: string]: any } = {};

  load(names: string[]): Observable<any[]> {
    if (!names || names.length === 0) {
      return null;
    }

    const missing: string[] = names.filter(n => !(n in this._modules));

    // load missing modules
    return from(loadModules(missing)).pipe(
      // save to modules dictionary
      tap((modules: any[]) => {
        for (let i = 0; i < missing.length; i++) {
          this._modules[missing[i]] = modules[i];
        }
      }),
      // return modules
      map(_ => this.get(names))
    );
  }

  private get(names: string[]): any[] {
    // return modules
    return names.map(n => this._modules[n]);
  }
}
