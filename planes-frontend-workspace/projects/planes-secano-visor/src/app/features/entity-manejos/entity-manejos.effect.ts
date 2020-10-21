import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ManejosSecanoService } from 'planes-secano-lib';
import * as entityManejosActions from './entity-manejos.actions';

@Injectable()
export class EntityManejosEffects {
  constructor(
    private manejosSecanoService: ManejosSecanoService,
    private actions$: Actions
  ) {
    this.manejosSecanoService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityManejosLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityManejosActions.EntityManejosLoadRequestAction>(
      entityManejosActions.EntityManejosActionTypes.ENTITYMANEJOS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.manejosSecanoService.getManejosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityManejosActions.EntityManejosLoadSuccessAction({
                items: queryResults.manejos
              })
            : new entityManejosActions.EntityManejosLoadFailureAction({
                error: 'Error al obtener los manejos.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityManejosActions.EntityManejosLoadFailureAction({
              error: 'Error al obtener los manejos.'
            })
          )
        )
      );
    })
  );
}
