import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { deleteDibujos } from '../entity-dibujos/entity-dibujos.actions';

import { ZonaExclusionCore, ZonasExclusionCoreService } from 'planes-core-lib';
import * as entityZonasExclusionActions from './entity-zonas-exclusion.actions';

@Injectable()
export class EntityZonasExclusionEffects {
  constructor(
    private zonasExclusionCoreService: ZonasExclusionCoreService,
    private actions$: Actions
  ) {
    this.zonasExclusionCoreService.url = environment.apiNucleoUrl;
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
      ) => action.payload
    ),
    switchMap(payload => {
      return this.zonasExclusionCoreService
        .addZonasExclusionCore(payload.item)
        .pipe(
          map(results => results.addResults),
          map(addResults => {
            if (addResults.length != 1) {
              return new entityZonasExclusionActions.EntityZonasExclusionAddFailureAction(
                {
                  error: 'Error al crear la chacra.'
                }
              );
            }
            if (addResults[0].success) {
              return new entityZonasExclusionActions.EntityZonasExclusionAddSuccessAction(
                {
                  item: addResults[0].zonasExclusion,
                  dibujoId: payload.dibujoId
                }
              );
            }
            return new entityZonasExclusionActions.EntityZonasExclusionAddFailureAction(
              {
                error: addResults[0].error.description
              }
            );
          }),
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

  @Effect()
  EntityZonaExclusionAddSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityZonasExclusionActions.EntityZonasExclusionAddSuccessAction>(
      entityZonasExclusionActions.EntityZonasExclusionActionTypes
        .ENTITYZONASEXCLUSION_ADD_SUCCESS
    ),
    map(
      (
        action: entityZonasExclusionActions.EntityZonasExclusionAddSuccessAction
      ) => {
        return deleteDibujos({ ids: [action.payload.dibujoId] });
      }
    )
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
      ) => action.payload
    ),
    switchMap(payload =>
      this.zonasExclusionCoreService
        .changeZonasExclusionCore(payload.item)
        .pipe(
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
                  item: uc,
                  dibujoId: payload.dibujoId
                }
              );
            }
            return new entityZonasExclusionActions.EntityZonasExclusionChangeFailureAction(
              {
                error: updateResults[0].error.description
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

  @Effect()
  EntityZonaExclusionChangeSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityZonasExclusionActions.EntityZonasExclusionChangeSuccessAction>(
      entityZonasExclusionActions.EntityZonasExclusionActionTypes
        .ENTITYZONASEXCLUSION_CHANGE_SUCCESS
    ),
    map(
      (
        action: entityZonasExclusionActions.EntityZonasExclusionChangeSuccessAction
      ) => {
        return deleteDibujos({ ids: [action.payload.dibujoId] });
      }
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
