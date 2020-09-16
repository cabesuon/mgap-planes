import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ZonaExclusionCore, ZonasExclusionCoreService } from 'planes-core-lib';
import * as entityZonasExclusionActions from './entity-zonas-exclusion.actions';

@Injectable()
export class EntityZonasExclusionEffects {
  constructor(
    private zonasExclusionCoreService: ZonasExclusionCoreService,
    private actions$: Actions
  ) {
    this.zonasExclusionCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityZonasExclusionLoadRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityZonasExclusionActions.EntityZonasExclusionLoadRequestAction>(
      entityZonasExclusionActions.EntityZonasExclusionActionTypes
        .ENTITYZONASEXCLUSION_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.zonasExclusionCoreService.getZonasExclusionCore().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityZonasExclusionActions.EntityZonasExclusionLoadSuccessAction(
                {
                  items: queryResults.zonasExclusion
                }
              )
            : new entityZonasExclusionActions.EntityZonasExclusionLoadFailureAction(
                {
                  error: 'Error al obtener las ZonasExclusion.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityZonasExclusionActions.EntityZonasExclusionLoadFailureAction(
              {
                error: 'Error al obtener las ZonasExclusion.'
              }
            )
          )
        )
      );
    })
  );

  // add
  @Effect()
  EntityZonasExclusionAddRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityZonasExclusionActions.EntityZonasExclusionAddRequestAction>(
      entityZonasExclusionActions.EntityZonasExclusionActionTypes
        .ENTITYZONASEXCLUSION_ADD_REQUEST
    ),
    map(
      (
        action: entityZonasExclusionActions.EntityZonasExclusionAddRequestAction
      ) => action.payload.item
    ),
    switchMap(item => {
      return this.zonasExclusionCoreService.addZonasExclusionCore(item).pipe(
        map(
          planesCore =>
            new entityZonasExclusionActions.EntityZonasExclusionAddSuccessAction(
              {
                item: planesCore
              }
            )
        ),
        catchError(error =>
          observableOf(
            new entityZonasExclusionActions.EntityZonasExclusionAddFailureAction(
              {
                error: 'planes-core-visor-zonas-exclusion-add-error'
              }
            )
          )
        )
      );
    })
  );

  // change
  @Effect()
  EntityZonasExclusionChangeRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityZonasExclusionActions.EntityZonasExclusionChangeRequestAction>(
      entityZonasExclusionActions.EntityZonasExclusionActionTypes
        .ENTITYZONASEXCLUSION_CHANGE_REQUEST
    ),
    map(
      (
        action: entityZonasExclusionActions.EntityZonasExclusionChangeRequestAction
      ) => action.payload.item
    ),
    switchMap(item =>
      this.zonasExclusionCoreService.changeZonasExclusionCore(item).pipe(
        map(planesCore => {
          const uc: Update<ZonaExclusionCore> = {
            id: item.chacraId,
            changes: {
              ...planesCore
            }
          };
          return new entityZonasExclusionActions.EntityZonasExclusionChangeSuccessAction(
            {
              item: uc
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityZonasExclusionActions.EntityZonasExclusionChangeFailureAction(
              {
                error: 'planes-core-visor-zonas-exclusion-change-error'
              }
            )
          )
        )
      )
    )
  );

  // delete
  @Effect()
  EntityZonasExclusionDeleteRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityZonasExclusionActions.EntityZonasExclusionDeleteRequestAction>(
      entityZonasExclusionActions.EntityZonasExclusionActionTypes
        .ENTITYZONASEXCLUSION_DELETE_REQUEST
    ),
    map(
      (
        action: entityZonasExclusionActions.EntityZonasExclusionDeleteRequestAction
      ) => action.payload.item
    ),
    switchMap(item =>
      this.zonasExclusionCoreService.deleteZonasExclusionCore(item).pipe(
        map(
          () =>
            new entityZonasExclusionActions.EntityZonasExclusionDeleteSuccessAction(
              {
                item
              }
            )
        ),
        catchError(error =>
          observableOf(
            new entityZonasExclusionActions.EntityZonasExclusionDeleteFailureAction(
              {
                error: 'planes-core-visor-zonas-exclusion-delete-error'
              }
            )
          )
        )
      )
    )
  );
}
