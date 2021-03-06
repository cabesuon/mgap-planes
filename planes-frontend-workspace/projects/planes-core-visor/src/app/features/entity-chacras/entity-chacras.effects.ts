import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ChacraCore, ChacrasCoreService } from 'planes-core-lib';
import * as entityChacrasActions from './entity-chacras.actions';

import { deleteDibujos } from '../entity-dibujos/entity-dibujos.actions';

@Injectable()
export class EntityChacrasEffects {
  constructor(
    private chacrasCoreService: ChacrasCoreService,
    private actions$: Actions
  ) {
    this.chacrasCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityChacrasLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasLoadRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.chacrasCoreService.getChacrasCore().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityChacrasActions.EntityChacrasLoadSuccessAction({
                items: queryResults.chacras
              })
            : new entityChacrasActions.EntityChacrasLoadFailureAction({
                error: 'Error al obtener las chacras.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityChacrasActions.EntityChacrasLoadFailureAction({
              error:
                'Error al obtener las chacras (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // add
  @Effect()
  EntityChacrasAddRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasAddRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_ADD_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasAddRequestAction) =>
        action.payload
    ),
    switchMap(payload => {
      return this.chacrasCoreService.addChacrasCore(payload.item).pipe(
        map(results => results.addResults),
        map(addResults => {
          return addResults.length === 1 && addResults[0].success
            ? new entityChacrasActions.EntityChacrasAddSuccessAction({
                item: addResults[0].chacra,
                dibujosId: payload.dibujosId
              })
            : new entityChacrasActions.EntityChacrasAddFailureAction({
                error: 'Error al crear la chacra.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityChacrasActions.EntityChacrasAddFailureAction({
              error: 'Error al crear la chacra (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  @Effect()
  EntityChacraAddSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasAddSuccessAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_ADD_SUCCESS
    ),
    map((action: entityChacrasActions.EntityChacrasAddSuccessAction) => {
      return deleteDibujos({ ids: action.payload.dibujosId });
    })
  );

  // change
  @Effect()
  EntityChacrasChangeRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasChangeRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasChangeRequestAction) =>
        action.payload
    ),
    switchMap(payload =>
      this.chacrasCoreService.changeChacrasCore(payload.item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length === 1 && updateResults[0].success) {
            const uc: Update<ChacraCore> = {
              id: updateResults[0].chacra.chacraId,
              changes: {
                ...updateResults[0].chacra
              }
            };
            return new entityChacrasActions.EntityChacrasChangeSuccessAction({
              item: uc,
              dibujosId: payload.dibujosId
            });
          }
          return new entityChacrasActions.EntityChacrasChangeFailureAction({
            error: 'Error al actualizar la chacra.'
          });
        }),
        catchError(error =>
          observableOf(
            new entityChacrasActions.EntityChacrasChangeFailureAction({
              error:
                'Error al actualizar la chacra (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );

  @Effect()
  EntityChacraChangeSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasChangeSuccessAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_SUCCESS
    ),
    map((action: entityChacrasActions.EntityChacrasChangeSuccessAction) => {
      return deleteDibujos({ ids: action.payload.dibujosId });
    })
  );

  // delete
  @Effect()
  EntityChacrasDeleteRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasDeleteRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasDeleteRequestAction) =>
        action.payload.item
    ),
    switchMap(item =>
      this.chacrasCoreService.deleteChacrasCore(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults =>
          deleteResults.length === 1 && deleteResults[0].success
            ? new entityChacrasActions.EntityChacrasDeleteSuccessAction({
                item
              })
            : new entityChacrasActions.EntityChacrasDeleteFailureAction({
                error: 'Error al eliminar la chacra.'
              })
        ),
        catchError(error =>
          observableOf(
            new entityChacrasActions.EntityChacrasDeleteFailureAction({
              error:
                'Error al eliminar la chacra (fallo en conexion a servidor).'
            })
          )
        )
      )
    )
  );
}
