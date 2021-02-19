import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { RendimientosSecanoService } from 'planes-secano-lib';
import * as entityRendimientosActions from './entity-rendimientos.actions';

@Injectable()
export class EntityRendimientosEffects {
  constructor(
    private rendimientosSecanoService: RendimientosSecanoService,
    private actions$: Actions
  ) {
    this.rendimientosSecanoService.url = environment.apiSecanoUrl;
  }

  // load
  @Effect()
  EntityRendimientosLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityRendimientosActions.EntityRendimientosLoadRequestAction>(
      entityRendimientosActions.EntityRendimientosActionTypes
        .ENTITYRENDIMIENTOS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.rendimientosSecanoService.getRendimientosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityRendimientosActions.EntityRendimientosLoadSuccessAction(
                {
                  items: queryResults.rendimientos
                }
              )
            : new entityRendimientosActions.EntityRendimientosLoadFailureAction(
                {
                  error: 'Error al obtener los rendimientos.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityRendimientosActions.EntityRendimientosLoadFailureAction({
              error: 'Error al obtener los rendimientos.'
            })
          )
        )
      );
    })
  );
}
