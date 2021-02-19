import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../../core/notifications/notification.service';

import { RotacionSecano, RotacionesSecanoService } from 'planes-secano-lib';
import * as entityRotacionesActions from './entity-rotaciones.actions';

@Injectable()
export class EntityRotacionesEffects {
  constructor(
    private notificationService: NotificationService,
    private rotacionesSecanoService: RotacionesSecanoService,
    private actions$: Actions
  ) {
    this.rotacionesSecanoService.url = environment.apiSecanoUrl;
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

  // add
  @Effect()
  EntityRotacionesAddRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityRotacionesActions.EntityRotacionesAddRequestAction>(
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_ADD_REQUEST
    ),
    map(
      (action: entityRotacionesActions.EntityRotacionesAddRequestAction) =>
        action.payload.item
    ),
    switchMap(item => {
      return this.rotacionesSecanoService.addRotacionesSecano(item).pipe(
        map(results => results.addResults),
        map(addResults => {
          if (addResults.length !== 1) {
            return new entityRotacionesActions.EntityRotacionesAddFailureAction(
              {
                error: 'Error al crear la rotación.'
              }
            );
          }
          if (addResults[0].success) {
            return new entityRotacionesActions.EntityRotacionesAddSuccessAction(
              {
                item: addResults[0].rotacion
              }
            );
          }
          return new entityRotacionesActions.EntityRotacionesAddFailureAction({
            error: addResults[0].error.description
          });
        }),
        catchError(error =>
          observableOf(
            new entityRotacionesActions.EntityRotacionesAddFailureAction({
              error:
                'Error al crear la rotación (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // change
  @Effect()
  EntityRotacionesChangeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityRotacionesActions.EntityRotacionesChangeRequestAction>(
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_CHANGE_REQUEST
    ),
    map(
      (action: entityRotacionesActions.EntityRotacionesChangeRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.rotacionesSecanoService.changeRotacionesSecano(item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length !== 1) {
            return new entityRotacionesActions.EntityRotacionesChangeFailureAction(
              {
                error: 'Error al actualizar la rotación.'
              }
            );
          }
          if (updateResults[0].success) {
            const uc: Update<RotacionSecano> = {
              id: updateResults[0].rotacion.rotacionId,
              changes: {
                ...updateResults[0].rotacion
              }
            };
            return new entityRotacionesActions.EntityRotacionesChangeSuccessAction(
              {
                item: uc
              }
            );
          }
          return new entityRotacionesActions.EntityRotacionesChangeFailureAction(
            {
              error: updateResults[0].error.description
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityRotacionesActions.EntityRotacionesChangeFailureAction({
              error:
                'Error al actualizar el rotación (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // delete
  @Effect()
  EntityRotacionesDeleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityRotacionesActions.EntityRotacionesDeleteRequestAction>(
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_DELETE_REQUEST
    ),
    map(
      (action: entityRotacionesActions.EntityRotacionesDeleteRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.rotacionesSecanoService.deleteRotacionesSecano(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults => {
          if (deleteResults.length !== 1) {
            return new entityRotacionesActions.EntityRotacionesDeleteFailureAction(
              {
                error: 'Error al eliminar la rotación.'
              }
            );
          }
          if (deleteResults[0].success) {
            return new entityRotacionesActions.EntityRotacionesDeleteSuccessAction(
              {
                rotacionId: item.rotacionId
              }
            );
          }
          return new entityRotacionesActions.EntityRotacionesDeleteFailureAction(
            {
              error: deleteResults[0].error.description
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityRotacionesActions.EntityRotacionesDeleteFailureAction({
              error:
                'Error al eliminar el rotación (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // error

  @Effect({ dispatch: false })
  EntityRotacionesFailureEffect$: Observable<any> = this.actions$.pipe(
    ofType(
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_LOAD_FAILURE,
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_ADD_FAILURE,
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_CHANGE_FAILURE,
      entityRotacionesActions.EntityRotacionesActionTypes
        .ENTITYROTACIONES_DELETE_FAILURE
    ),
    map(
      (
        action:
          | entityRotacionesActions.EntityRotacionesLoadFailureAction
          | entityRotacionesActions.EntityRotacionesAddFailureAction
          | entityRotacionesActions.EntityRotacionesChangeFailureAction
          | entityRotacionesActions.EntityRotacionesDeleteFailureAction
      ) => action.payload.error
    ),
    tap((error: string) => this.notificationService.error(error))
  );
}
