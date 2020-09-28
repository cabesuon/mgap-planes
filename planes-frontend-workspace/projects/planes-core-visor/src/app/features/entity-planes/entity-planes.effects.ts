import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { PlanCore, PlanesCoreService } from 'planes-core-lib';
import * as entityPlanesActions from './entity-planes.actions';

@Injectable()
export class EntityPlanesEffects {
  constructor(
    private planesCoreService: PlanesCoreService,
    private actions$: Actions
  ) {
    this.planesCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityPlanesLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPlanesActions.EntityPlanesLoadRequestAction>(
      entityPlanesActions.EntityPlanesActionTypes.ENTITYPLANES_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.planesCoreService.getPlanesCore().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityPlanesActions.EntityPlanesLoadSuccessAction({
                items: queryResults.planes
              })
            : new entityPlanesActions.EntityPlanesLoadFailureAction({
                error: 'Error al obtener los planes.'
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
      return this.planesCoreService.addPlanesCore(item).pipe(
        map(results => results.addResults),
        map(addResults =>
          addResults.length === 1 && addResults[0].success
            ? new entityPlanesActions.EntityPlanesAddSuccessAction({
                item: addResults[0].plan
              })
            : new entityPlanesActions.EntityPlanesAddFailureAction({
                error: 'Error al crear el plan.'
              })
        ),
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
      this.planesCoreService.changePlanesCore(item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length === 1 && updateResults[0].success) {
            const uc: Update<PlanCore> = {
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
            error: 'Error al actualizar el plan.'
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
      this.planesCoreService.deletePlanesCore(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults =>
          deleteResults.length === 1 && deleteResults[0].success
            ? new entityPlanesActions.EntityPlanesDeleteSuccessAction({
                item
              })
            : new entityPlanesActions.EntityPlanesDeleteFailureAction({
                error: 'Error al eliminar el plan.'
              })
        ),
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
}
