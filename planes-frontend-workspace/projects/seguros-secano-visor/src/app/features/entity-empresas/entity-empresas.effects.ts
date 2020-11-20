import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { EmpresasCoreService } from 'planes-core-lib';
import * as entityEmpresasActions from './entity-empresas.actions';

@Injectable()
export class EntityEmpresasEffects {
  constructor(
    private empresasCoreService: EmpresasCoreService,
    private actions$: Actions
  ) {
    this.empresasCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityEmpresasLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityEmpresasActions.EntityEmpresasLoadRequestAction>(
      entityEmpresasActions.EntityEmpresasActionTypes
        .ENTITYEMPRESAS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.empresasCoreService.getEmpresasCore().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityEmpresasActions.EntityEmpresasLoadSuccessAction({
                items: queryResults.empresas
              })
            : new entityEmpresasActions.EntityEmpresasLoadFailureAction({
                error: 'Error al obtener las empresas.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityEmpresasActions.EntityEmpresasLoadFailureAction({
              error: 'Error al obtener las empresas.'
            })
          )
        )
      );
    })
  );
}
