import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../../core/notifications/notification.service';

import {
  ComponenteSecano,
  ComponentesSecanoService,
  PeriodoSecano
} from 'planes-secano-lib';

import * as entityComponentesActions from './entity-componentes.actions';

@Injectable()
export class EntityComponentesEffects {
  constructor(
    private notificationService: NotificationService,
    private componentesSecanoService: ComponentesSecanoService,
    private actions$: Actions
  ) {
    this.componentesSecanoService.url = environment.apiSecanoUrl;
  }

  // load
  @Effect()
  EntityComponentesLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesLoadRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.componentesSecanoService.getComponentesSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityComponentesActions.EntityComponentesLoadSuccessAction({
                items: queryResults.componentes
              })
            : new entityComponentesActions.EntityComponentesLoadFailureAction({
                error: 'Error al obtener los componentes.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityComponentesActions.EntityComponentesLoadFailureAction({
              error: 'Error al obtener los componentes.'
            })
          )
        )
      );
    })
  );

  // add
  @Effect()
  EntityComponentesAddRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesAddRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_ADD_REQUEST
    ),
    map(
      (action: entityComponentesActions.EntityComponentesAddRequestAction) =>
        action.payload.item
    ),
    switchMap(item => {
      return this.componentesSecanoService.addComponenteSecano(item).pipe(
        map(results => results.addResults),
        map(addResults => {
          if (addResults.length !== 1) {
            return new entityComponentesActions.EntityComponentesAddFailureAction(
              {
                error: 'Error al crear el componente.'
              }
            );
          }
          if (addResults[0].success) {
            return new entityComponentesActions.EntityComponentesAddSuccessAction(
              {
                item: addResults[0].componente
              }
            );
          }
          return new entityComponentesActions.EntityComponentesAddFailureAction(
            {
              error: addResults[0].error.description
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityComponentesActions.EntityComponentesAddFailureAction({
              error:
                'Error al crear el componente (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // change
  @Effect()
  EntityComponentesChangeRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesChangeRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_CHANGE_REQUEST
    ),
    map(
      (action: entityComponentesActions.EntityComponentesChangeRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.componentesSecanoService.changeComponenteSecano(item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length !== 1) {
            return new entityComponentesActions.EntityComponentesChangeFailureAction(
              {
                error: 'Error al actualizar la componente.'
              }
            );
          }
          if (updateResults[0].success) {
            const uc: Update<ComponenteSecano> = {
              id: updateResults[0].componente.componenteId,
              changes: {
                ...updateResults[0].componente
              }
            };
            return new entityComponentesActions.EntityComponentesChangeSuccessAction(
              {
                item: uc
              }
            );
          }
          return new entityComponentesActions.EntityComponentesChangeFailureAction(
            {
              error: updateResults[0].error.description
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityComponentesActions.EntityComponentesChangeFailureAction({
              error:
                'Error al actualizar el componente (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // delete
  @Effect()
  EntityComponentesDeleteRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesDeleteRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_DELETE_REQUEST
    ),
    map(
      (action: entityComponentesActions.EntityComponentesDeleteRequestAction) =>
        action.payload.componente
    ),
    switchMap(componente =>
      this.componentesSecanoService.deleteComponenteSecano(componente).pipe(
        map(results => results.deleteResults),
        map(deleteResults => {
          if (deleteResults.length !== 1) {
            return new entityComponentesActions.EntityComponentesDeleteFailureAction(
              {
                error: 'Error al eliminar el componente.'
              }
            );
          }
          if (deleteResults[0].success) {
            return new entityComponentesActions.EntityComponentesDeleteSuccessAction(
              {
                componente
              }
            );
          }
          return new entityComponentesActions.EntityComponentesDeleteFailureAction(
            {
              error: deleteResults[0].error.description
            }
          );
        }),
        catchError(error =>
          observableOf(
            new entityComponentesActions.EntityComponentesDeleteFailureAction({
              error:
                'Error al eliminar el componente (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // error

  @Effect({ dispatch: false })
  EntityComponentesFailureEffect$: Observable<any> = this.actions$.pipe(
    ofType(
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_LOAD_FAILURE,
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_ADD_FAILURE,
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_CHANGE_FAILURE,
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_DELETE_FAILURE
    ),
    map(
      (
        action:
          | entityComponentesActions.EntityComponentesLoadFailureAction
          | entityComponentesActions.EntityComponentesAddFailureAction
          | entityComponentesActions.EntityComponentesChangeFailureAction
          | entityComponentesActions.EntityComponentesDeleteFailureAction
      ) => action.payload.error
    ),
    tap((error: string) => this.notificationService.error(error))
  );
}
