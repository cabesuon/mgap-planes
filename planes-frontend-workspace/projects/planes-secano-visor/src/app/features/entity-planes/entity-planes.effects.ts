import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { PlanSecano, PlanesSecanoService } from 'planes-secano-lib';
import * as entityPlanesActions from './entity-planes.actions';

import { NotificationService } from '../../core/notifications/notification.service';
import { PlanSecanoUrlType } from 'projects/planes-secano-lib/src/public-api';

@Injectable()
export class EntityPlanesEffects {
  constructor(
    private notificationService: NotificationService,
    private planesSecanoService: PlanesSecanoService,
    private actions$: Actions
  ) {
    this.planesSecanoService.url = environment.apiSecanoUrl;
  }

  // load
  @Effect()
  EntityPlanesLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesLoadRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.planesSecanoService.getPlanesSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          if (queryResults.success) {
            return new entityPlanesActions.EntityPlanesLoadSuccessAction({
              items: queryResults.planes
            });
          }
          return new entityPlanesActions.EntityPlanesLoadFailureAction({
            error: queryResults.error.description
          });
        }),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesLoadFailureAction({
              error:
                'Error al obtener los planes (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // add
  @Effect()
  EntityPlanesAddRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesAddRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_ADD_REQUEST
    ),
    map(
      (action: entityPlanesActions.EntityPlanesAddRequestAction) =>
        action.payload.item
    ),
    switchMap(item => {
      return this.planesSecanoService.addPlanesSecano(item).pipe(
        map(results => results.addResults),
        map(addResults => {
          if (addResults.length !== 1) {
            return new entityPlanesActions.EntityPlanesAddFailureAction({
              error: 'Error al crear el plan.'
            });
          }
          if (addResults[0].success) {
            return new entityPlanesActions.EntityPlanesAddSuccessAction({
              item: addResults[0].plan
            });
          }
          return new entityPlanesActions.EntityPlanesAddFailureAction({
            error: addResults[0].error.description
          });
        }),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesAddFailureAction({
              error: 'Error al crear el plan (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // change
  @Effect()
  EntityPlanesChangeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesChangeRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_CHANGE_REQUEST
    ),
    map(
      (action: entityPlanesActions.EntityPlanesChangeRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.planesSecanoService.changePlanesSecano(item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length !== 1) {
            return new entityPlanesActions.EntityPlanesChangeFailureAction({
              error: 'Error al actualizar el plan.'
            });
          }
          if (updateResults[0].success) {
            const uc: Update<PlanSecano> = {
              id: updateResults[0].plan.planId,
              changes: {
                ...updateResults[0].plan
              }
            };
            return new entityPlanesActions.EntityPlanesChangeSuccessAction({
              item: uc
            });
          }
          return new entityPlanesActions.EntityPlanesChangeFailureAction({
            error: updateResults[0].error.description
          });
        }),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesChangeFailureAction({
              error:
                'Error al actualizar el plan (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // delete
  @Effect()
  EntityPlanesDeleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesDeleteRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_DELETE_REQUEST
    ),
    map(
      (action: entityPlanesActions.EntityPlanesDeleteRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.planesSecanoService.deletePlanesSecano(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults => {
          if (deleteResults.length !== 1) {
            return new entityPlanesActions.EntityPlanesDeleteFailureAction({
              error: 'Error al eliminar el plan.'
            });
          }
          if (deleteResults[0].success) {
            return new entityPlanesActions.EntityPlanesDeleteSuccessAction({
              planId: item.planId
            });
          }
          return new entityPlanesActions.EntityPlanesDeleteFailureAction({
            error: deleteResults[0].error.description
          });
        }),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesDeleteFailureAction({
              error: 'Error al eliminar el plan (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // copy
  @Effect()
  EntityPlanesCopyRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesCopyRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_COPY_REQUEST
    ),
    map(
      (action: entityPlanesActions.EntityPlanesCopyRequestAction) =>
        action.payload.item
    ),
    switchMap(item => {
      return this.planesSecanoService.copyPlanesSecano(item).pipe(
        map(results => results.addResults),
        map(addResults => {
          if (addResults.length !== 1) {
            return new entityPlanesActions.EntityPlanesCopyFailureAction({
              error: 'Error al copiar el plan.'
            });
          }
          if (addResults[0].success) {
            return new entityPlanesActions.EntityPlanesCopySuccessAction({
              item: addResults[0].plan
            });
          }
          return new entityPlanesActions.EntityPlanesCopyFailureAction({
            error: addResults[0].error.description
          });
        }),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesCopyFailureAction({
              error: 'Error al copiar el plan (fallo en conexión a servidor).'
            })
          )
        )
      );
    })
  );

  // get url
  @Effect()
  EntityPlanesGetUrlRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesGetUrlRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_GETURL_REQUEST
    ),
    map(
      (action: entityPlanesActions.EntityPlanesGetUrlRequestAction) =>
        action.payload
    ),
    switchMap(payload => {
      return this.planesSecanoService
        .getUrlPlanSecano(payload.item, payload.urlType)
        .pipe(
          map(results => results.getResult),
          map(getResult =>
            getResult.success
              ? new entityPlanesActions.EntityPlanesGetUrlSuccessAction({
                  url: getResult.url
                })
              : new entityPlanesActions.EntityPlanesGetUrlFailureAction({
                  error: getResult.error.description
                })
          ),
          catchError(error =>
            observableOf(
              new entityPlanesActions.EntityPlanesGetUrlFailureAction({
                error:
                  payload.urlType === PlanSecanoUrlType.PASARELA_PAGOS
                    ? 'Error al obtener enlace a pasarela de pagos (fallo en conexión a servidor).'
                    : 'Error al obtener enlace a reporte (fallo en conexión a servidor).'
              })
            )
          )
        );
    })
  );

  @Effect()
  EntityPlanesGetUrlSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesGetUrlSuccessAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_GETURL_SUCCESS
    ),
    tap((action: entityPlanesActions.EntityPlanesGetUrlSuccessAction) =>
      // revisar
      window.open(action.payload.url, '_blank')
    )
  );

  // error

  @Effect({ dispatch: false })
  EntityPlanesFailureEffect$: Observable<any> = this.actions$.pipe(
    ofType(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_LOAD_FAILURE,
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_ADD_FAILURE,
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_CHANGE_FAILURE,
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_DELETE_FAILURE,
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_COPY_FAILURE,
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_GETURL_FAILURE
    ),
    map(
      (
        action:
          | entityPlanesActions.EntityPlanesLoadFailureAction
          | entityPlanesActions.EntityPlanesAddFailureAction
          | entityPlanesActions.EntityPlanesChangeFailureAction
          | entityPlanesActions.EntityPlanesDeleteFailureAction
          | entityPlanesActions.EntityPlanesCopyFailureAction
          | entityPlanesActions.EntityPlanesGetUrlFailureAction
      ) => action.payload.error
    ),
    tap((error: string) => this.notificationService.error(error))
  );
}
