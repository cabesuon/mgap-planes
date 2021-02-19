import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { RelacionesPerdidaSueloSecanoService } from 'planes-secano-lib';
import * as entityRelacionesPerdidaSueloSecanoActions from './entity-relaciones-perida-suelo.actions';

@Injectable()
export class EntityRelacionesPerdidaSueloSecanoEffects {
  constructor(
    private relacionesPerdidaSueloSecanoService: RelacionesPerdidaSueloSecanoService,
    private actions$: Actions
  ) {
    this.relacionesPerdidaSueloSecanoService.url = environment.apiSecanoUrl;
  }

  // load
  @Effect()
  EntityRelacionesPerdidaSueloLoadRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<
      entityRelacionesPerdidaSueloSecanoActions.EntityRelacionesPerdidaSueloLoadRequestAction
    >(
      entityRelacionesPerdidaSueloSecanoActions
        .EntityRelacionesPerdidaSueloActionTypes
        .ENTITYRELACIONESPERDIDASUELO_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.relacionesPerdidaSueloSecanoService
        .getRelacionesPerdidaSueloSecano()
        .pipe(
          map(results => results.queryResults),
          map(queryResults => {
            return queryResults.success
              ? new entityRelacionesPerdidaSueloSecanoActions.EntityRelacionesPerdidaSueloLoadSuccessAction(
                  {
                    items: queryResults.relacionPerdidaSuelos
                  }
                )
              : new entityRelacionesPerdidaSueloSecanoActions.EntityRelacionesPerdidaSueloLoadFailureAction(
                  {
                    error: 'Error al obtener los relaciones perdida suelo.'
                  }
                );
          }),
          catchError(error =>
            observableOf(
              new entityRelacionesPerdidaSueloSecanoActions.EntityRelacionesPerdidaSueloLoadFailureAction(
                {
                  error: 'Error al obtener los relaciones perdida suelo.'
                }
              )
            )
          )
        );
    })
  );
}
