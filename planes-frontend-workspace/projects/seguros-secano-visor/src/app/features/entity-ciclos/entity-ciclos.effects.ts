import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  CicloSegurosSecano,
  CiclosSegurosSecanoService
} from 'seguros-secano-lib';
import * as entityCiclosActions from './entity-ciclos.actions';

@Injectable()
export class EntityCiclosEffects {
  constructor(
    private ciclosService: CiclosSegurosSecanoService,
    private actions$: Actions
  ) {
    this.ciclosService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityCiclosLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityCiclosActions.EntityCiclosLoadRequestAction>(
      entityCiclosActions.EntityCiclosActionTypes.ENTITYCICLOS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.ciclosService.getCiclosSegurosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityCiclosActions.EntityCiclosLoadSuccessAction({
                items: queryResults.ciclos
              })
            : new entityCiclosActions.EntityCiclosLoadFailureAction({
                error: 'Error al obtener los ciclos.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityCiclosActions.EntityCiclosLoadFailureAction({
              error: 'Error al obtener los ciclos.'
            })
          )
        )
      );
    })
  );
}
