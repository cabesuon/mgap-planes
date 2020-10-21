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
        map(results => results.addResults),
        map(addResults =>
          addResults.length === 1 && addResults[0].success
            ? new entityZonasExclusionActions.EntityZonasExclusionAddSuccessAction(
                {
                  item: addResults[0].zonasExclusion
                }
              )
            : new entityZonasExclusionActions.EntityZonasExclusionAddFailureAction(
                {
                  error: 'Error al crear la zona de exclusion.'
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
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length === 1 && updateResults[0].success) {
            const uc: Update<ZonaExclusionCore> = {
              id: updateResults[0].zonasExclusion.zonaExclusionId,
              changes: {
                ...updateResults[0].zonasExclusion
              }
            };
            return new entityZonasExclusionActions.EntityZonasExclusionChangeSuccessAction(
              {
                item: uc
              }
            );
          }
          return new entityZonasExclusionActions.EntityZonasExclusionChangeFailureAction(
            {
              error: 'Error al actualizar la zona de exclusión.'
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityZonasExclusionActions.EntityZonasExclusionChangeFailureAction(
              {
                error:
                  'Error al actualizar la zona de exclusión (fallo en conexion a servidor).'
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
        map(results => results.deleteResults),
        map(deleteResults =>
          deleteResults.length === 1 && deleteResults[0].success
            ? new entityZonasExclusionActions.EntityZonasExclusionDeleteSuccessAction(
                {
                  item
                }
              )
            : new entityZonasExclusionActions.EntityZonasExclusionDeleteFailureAction(
                {
                  error: 'Error al eliminar la zona de exclusión.'
                }
              )
        ),
        catchError(error =>
          observableOf(
            new entityZonasExclusionActions.EntityZonasExclusionDeleteFailureAction(
              {
                error:
                  'Error al eliminar la zona de exclusión (fallo en conexion a servidor).'
              }
            )
          )
        )
      )
    )
  );
}
