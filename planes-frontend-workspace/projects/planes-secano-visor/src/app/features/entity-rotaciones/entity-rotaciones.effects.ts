import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { RotacionSecano, RotacionesSecanoService } from 'planes-secano-lib';
import * as entityRotacionesActions from './entity-rotaciones.actions';

@Injectable()
export class EntityRotacionesEffects {
  constructor(
    private rotacionesSecanoService: RotacionesSecanoService,
    private actions$: Actions
  ) {
    this.rotacionesSecanoService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityRotacionesLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityRotacionesActions.EntityRotacionesLoadRequestAction>(
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.rotacionesSecanoService.getRotacionesSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityRotacionesActions.EntityRotacionesLoadSuccessAction({
                items: queryResults.rotaciones
              })
            : new entityRotacionesActions.EntityRotacionesLoadFailureAction({
                error: 'Error al obtener los rotaciones.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityRotacionesActions.EntityRotacionesLoadFailureAction({
              error: 'Error al obtener los rotaciones.'
            })
          )
        )
      );
    })
  );
}
