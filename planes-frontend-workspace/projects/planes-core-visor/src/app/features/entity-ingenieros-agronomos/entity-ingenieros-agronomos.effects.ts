import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { IngenierosAgronomosCoreService } from 'planes-core-lib';
import * as entityIngenierosAgronomosActions from './entity-ingenieros-agronomos.actions';

@Injectable()
export class EntityIngenierosAgronomosEffects {
  constructor(
    private IngenierosAgronomosCoreService: IngenierosAgronomosCoreService,
    private actions$: Actions
  ) {
    this.IngenierosAgronomosCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityIngenierosAgronomosLoadRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<
      entityIngenierosAgronomosActions.EntityIngenierosAgronomosLoadRequestAction
    >(
      entityIngenierosAgronomosActions.EntityIngenierosAgronomosActionTypes
        .ENTITYINGENIEROSAGRONOMOS_LOAD_REQUEST
    ),
    map(action => action.payload.ingenierosAgronomosId),
    switchMap(ingenierosAgronomosId => {
      return this.IngenierosAgronomosCoreService.getIngenierosAgronomosCore(
        ingenierosAgronomosId
      ).pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityIngenierosAgronomosActions.EntityIngenierosAgronomosLoadSuccessAction(
                {
                  items: queryResults.ingenierosAgronomos
                }
              )
            : new entityIngenierosAgronomosActions.EntityIngenierosAgronomosLoadFailureAction(
                {
                  error: 'Error al obtener las ingenierosAgronomos.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityIngenierosAgronomosActions.EntityIngenierosAgronomosLoadFailureAction(
              {
                error: 'Error al obtener las ingenierosAgronomos.'
              }
            )
          )
        )
      );
    })
  );
}
