import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  ComponenteProductivoSegurosSecano,
  ComponentesProductivosSegurosSecanoService
} from 'seguros-secano-lib';
import * as entityComponentesActions from './entity-componentes.actions';

@Injectable()
export class EntityComponentesEffects {
  constructor(
    private componentesService: ComponentesProductivosSegurosSecanoService,
    private actions$: Actions
  ) {
    this.componentesService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityComponentesLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesLoadRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes
        .ENTITYCOMPONENTES_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.componentesService
        .getComponentesProductivosSegurosSecano()
        .pipe(
          map(results => results.queryResults),
          map(queryResults => {
            return queryResults.success
              ? new entityComponentesActions.EntityComponentesLoadSuccessAction(
                  {
                    items: queryResults.componentes
                  }
                )
              : new entityComponentesActions.EntityComponentesLoadFailureAction(
                  {
                    error: 'Error al obtener los componentes.'
                  }
                );
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
        action.payload
    ),
    switchMap(payload => {
      return this.componentesService
        .addComponentesProductivosSegurosSecano(payload.item)
        .pipe(
          map(results => results.addResults),
          map(addResults => {
            return addResults.length === 1 && addResults[0].success
              ? new entityComponentesActions.EntityComponentesAddSuccessAction({
                  item: addResults[0].componente
                })
              : new entityComponentesActions.EntityComponentesAddFailureAction({
                  error: 'Error al crear el componente.'
                });
          }),
          catchError(error =>
            observableOf(
              new entityComponentesActions.EntityComponentesAddFailureAction({
                error:
                  'Error al crear la componente (fallo en conexion a servidor).'
              })
            )
          )
        );
    })
  );

  // change
  @Effect()
  EntityComponentesChangeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesChangeRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_REQUEST
    ),
    map(
      (action: entityComponentesActions.EntityComponentesChangeRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.componentesService.changeComponentesProductivosSegurosSecano(item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length === 1 && updateResults[0].success) {
            const uc: Update<ComponenteProductivoSegurosSecano> = {
              id: updateResults[0].componente.componenteId,
              changes: {
                ...updateResults[0].componente
              }
            };
            return new entityComponentesActions.EntityComponentesChangeSuccessAction({
              item: uc
            });
          }
          return new entityComponentesActions.EntityComponentesChangeFailureAction({
            error: 'Error al actualizar el componente productivo.'
          });
        }),
        catchError(error =>
          observableOf(
            new entityComponentesActions.EntityComponentesChangeFailureAction({
              error:
                'Error al actualizar el componente productivo (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  // delete
  @Effect()
  EntityComponentesDeleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityComponentesActions.EntityComponentesDeleteRequestAction>(
      entityComponentesActions.EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_REQUEST
    ),
    map(
      (action: entityComponentesActions.EntityComponentesDeleteRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.componentesService.deleteComponentesProductivosSegurosSecano(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults =>
          deleteResults.length === 1 && deleteResults[0].success
            ? new entityComponentesActions.EntityComponentesDeleteSuccessAction({
                item
              })
            : new entityComponentesActions.EntityComponentesDeleteFailureAction({
                error: 'Error al eliminar el componente productivo.'
              })
        ),
        catchError(error =>
          observableOf(
            new entityComponentesActions.EntityComponentesDeleteFailureAction({
              error: 'Error al eliminar el componente productivo (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );
}
