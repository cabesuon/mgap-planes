import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  UnidadManejoSegurosSecano,
  UnidadesManejosSegurosSecanoService
} from 'seguros-secano-lib';
import * as entityUnidadesManejosActions from './entity-unidades.actions';

@Injectable()
export class EntityUnidadesManejosEffects {
  constructor(
    private unidadesManejosService: UnidadesManejosSegurosSecanoService,
    private actions$: Actions
  ) {
    this.unidadesManejosService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityUnidadesManejosLoadRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityUnidadesManejosActions.EntityUnidadesManejosLoadRequestAction>(
      entityUnidadesManejosActions.EntityUnidadesManejosActionTypes
        .ENTITYUNIDADESMANEJOS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.unidadesManejosService.getUnidadesManejosSegurosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityUnidadesManejosActions.EntityUnidadesManejosLoadSuccessAction(
                {
                  items: queryResults.unidades
                }
              )
            : new entityUnidadesManejosActions.EntityUnidadesManejosLoadFailureAction(
                {
                  error: 'Error al obtener las unidades de manejos.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityUnidadesManejosActions.EntityUnidadesManejosLoadFailureAction(
              {
                error: 'Error al obtener las unidades de manejos.'
              }
            )
          )
        )
      );
    })
  );

  // add
  @Effect()
  EntityUnidadesManejosAddRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityUnidadesManejosActions.EntityUnidadesManejosAddRequestAction>(
      entityUnidadesManejosActions.EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_REQUEST
    ),
    map(
      (action: entityUnidadesManejosActions.EntityUnidadesManejosAddRequestAction) =>
        action.payload.item
    ),
    switchMap(item => {
      return this.unidadesManejosService.addUnidadesManejosSegurosSecano(item).pipe(
        map(results => results.addResults),
        map(addResults =>
          addResults.length === 1 && addResults[0].success
            ? new entityUnidadesManejosActions.EntityUnidadesManejosAddSuccessAction({
                item: addResults[0].unidades
              })
            : new entityUnidadesManejosActions.EntityUnidadesManejosAddFailureAction({
                error: 'Error al crear la unidad de manejo.'
              })
        ),
        catchError(error =>
          observableOf(
            new entityUnidadesManejosActions.EntityUnidadesManejosAddFailureAction({
              error: 'Error al crear la unidad de manejo (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // change
  @Effect()
  EntityUnidadesManejosChangeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityUnidadesManejosActions.EntityUnidadesManejosChangeRequestAction>(
      entityUnidadesManejosActions.EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_REQUEST
    ),
    map(
      (action: entityUnidadesManejosActions.EntityUnidadesManejosChangeRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.unidadesManejosService.changeUnidadesManejosSecano(item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length === 1 && updateResults[0].success) {
            const uc: Update<UnidadManejoSegurosSecano> = {
              id: updateResults[0].unidades.unidadId,
              changes: {
                ...updateResults[0].unidades
              }
            };
            return new entityUnidadesManejosActions.EntityUnidadesManejosChangeSuccessAction({
              item: uc
            });
          }
          return new entityUnidadesManejosActions.EntityUnidadesManejosChangeFailureAction({
            error: 'Error al actualizar la unidad de manejo.'
          });
        }),
        catchError(error =>
          observableOf(
            new entityUnidadesManejosActions.EntityUnidadesManejosChangeFailureAction({
              error:
                'Error al actualizar la unidad de manejo (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // delete
  @Effect()
  EntityPlanesDeleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityUnidadesManejosActions.EntityUnidadesManejosDeleteRequestAction>(
      entityUnidadesManejosActions.EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_REQUEST
    ),
    map(
      (action: entityUnidadesManejosActions.EntityUnidadesManejosDeleteRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.unidadesManejosService.deleteUnidadesManejosSegurosSecano(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults =>
          deleteResults.length === 1 && deleteResults[0].success
            ? new entityUnidadesManejosActions.EntityUnidadesManejosDeleteSuccessAction({
                item
              })
            : new entityUnidadesManejosActions.EntityUnidadesManejosDeleteFailureAction({
                error: 'Error al eliminar la unidad de manejo.'
              })
        ),
        catchError(error =>
          observableOf(
            new entityUnidadesManejosActions.EntityUnidadesManejosDeleteFailureAction({
              error: 'Error al eliminar la unidad de manejo (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );
}

