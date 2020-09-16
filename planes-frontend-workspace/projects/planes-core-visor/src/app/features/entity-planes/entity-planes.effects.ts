import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  PlanCore,
  PlanesCoreService,
  PlanesCoreQueryResults
} from 'planes-core-lib';
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
        map(queryResults =>
          queryResults.length === 1 && queryResults[0].success
            ? new entityPlanesActions.EntityPlanesAddSuccessAction({
                item: { ...item, planId: queryResults[0].id }
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
        map(planesCore => {
          const uc: Update<PlanCore> = {
            id: item.planId,
            changes: {
              ...planesCore
            }
          };
          return new entityPlanesActions.EntityPlanesChangeSuccessAction({
            item: uc
          });
        }),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesChangeFailureAction({
              error: 'planes-core-visor-planes-change-error'
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
        map(
          () =>
            new entityPlanesActions.EntityPlanesDeleteSuccessAction({
              item
            })
        ),
        catchError(error =>
          observableOf(
            new entityPlanesActions.EntityPlanesDeleteFailureAction({
              error: 'planes-core-visor-planes-delete-error'
            })
          )
        )
      )
    )
  );
}
