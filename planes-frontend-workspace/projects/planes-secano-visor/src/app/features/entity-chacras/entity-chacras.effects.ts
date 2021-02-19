import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ChacrasCoreService } from 'planes-core-lib';
import { ChacraSecano, ChacrasSecanoService } from 'planes-secano-lib';
import * as entityChacrasActions from './entity-chacras.actions';

import { deleteDibujos } from '../entity-dibujos/entity-dibujos.actions';

import { NotificationService } from '../../core/notifications/notification.service';

@Injectable()
export class EntityChacrasEffects {
  constructor(
    private notificationService: NotificationService,
    private chacrasSecanoService: ChacrasSecanoService,
    private chacrasCoreService: ChacrasCoreService,
    private actions$: Actions
  ) {
    this.chacrasSecanoService.url = environment.apiSecanoUrl;
    this.chacrasCoreService.url = environment.apiNucleoUrl;
  }

  // load
  @Effect()
  EntityChacrasLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasLoadRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.chacrasSecanoService.getChacrasSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          if (queryResults.success) {
            return new entityChacrasActions.EntityChacrasLoadSuccessAction({
              items: queryResults.chacras
            });
          }
          return new entityChacrasActions.EntityChacrasLoadFailureAction({
            error: queryResults.error.description
          });
        }),
        catchError(error => {
          return observableOf(
            new entityChacrasActions.EntityChacrasLoadFailureAction({
              error:
                'Error al obtener las chacras (fallo en conexion a servidor).'
            })
          );
        })
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
      return this.chacrasSecanoService.addChacrasSecano(payload.item).pipe(
        map(results => results.addResults),
        map(addResults => {
          if (addResults.length != 1) {
            return new entityChacrasActions.EntityChacrasAddFailureAction({
              error: 'Error al crear la chacra.'
            });
          }
          if (addResults[0].success) {
            return new entityChacrasActions.EntityChacrasAddSuccessAction({
              item: addResults[0].chacra,
              dibujosId: payload.dibujosId
            });
          }
          return new entityChacrasActions.EntityChacrasAddFailureAction({
            error: addResults[0].error.description
          });
        }),
        catchError(error => {
          return observableOf(
            new entityChacrasActions.EntityChacrasAddFailureAction({
              error: 'Error al crear la chacra (fallo en conexion a servidor).'
            })
          );
        })
      );
    })
  );

  @Effect()
  EntityChacraAddSuccessEffect$: Observable<any> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasAddSuccessAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_ADD_SUCCESS
    ),
    switchMap((action: entityChacrasActions.EntityChacrasAddSuccessAction) => {
      return observableOf(
        deleteDibujos({ ids: action.payload.dibujosId }),
        new entityChacrasActions.EntityChacrasGetPadronesRequestAction({
          item: action.payload.item
        }),
        new entityChacrasActions.EntityChacrasGetSuelosRequestAction({
          item: action.payload.item
        }),
        new entityChacrasActions.EntityChacrasGetLSRequestAction({
          item: action.payload.item
        })
      );
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
      this.chacrasSecanoService.changeChacrasSecano(payload.item).pipe(
        map(results => results.updateResults),
        map(updateResults => {
          if (updateResults.length !== 1) {
            this.notificationService.error('Error al actualizar la chacra.');
          }
          if (updateResults[0].success) {
            const uc: Update<ChacraSecano> = {
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
            error: updateResults[0].error.description
          });
        }),
        catchError(error => {
          return observableOf(
            new entityChacrasActions.EntityChacrasChangeFailureAction({
              error:
                'Error al actualizar la chacra (fallo en conexion a servidor).'
            })
          );
        })
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
      this.chacrasSecanoService.deleteChacrasSecano(item).pipe(
        map(results => results.deleteResults),
        map(deleteResults => {
          if (deleteResults.length !== 1) {
            return new entityChacrasActions.EntityChacrasDeleteFailureAction({
              error: 'Error al eliminar la chacra.'
            });
          }
          if (deleteResults[0].success) {
            return new entityChacrasActions.EntityChacrasDeleteSuccessAction({
              chacraId: item.chacraId
            });
          }
          return new entityChacrasActions.EntityChacrasDeleteFailureAction({
            error: deleteResults[0].error.description
          });
        }),
        catchError(error => {
          return observableOf(
            new entityChacrasActions.EntityChacrasDeleteFailureAction({
              error:
                'Error al eliminar la chacra (fallo en conexion a servidor).'
            })
          );
        })
      )
    )
  );

  // get padrones
  @Effect()
  EntityChacrasGetPadronesRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasGetPadronesRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes
        .ENTITYCHACRAS_GETPADRONES_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasGetPadronesRequestAction) =>
        action.payload
    ),
    switchMap(payload =>
      this.chacrasCoreService
        .getPadronesChacraCore({
          ...payload.item,
          chacraId: payload.item.chacraNucleoId
        })
        .pipe(
          map(results => results.getResults),
          map(getResults => {
            if (getResults.success) {
              const uc: Update<ChacraSecano> = {
                id: payload.item.chacraId,
                changes: {
                  padrones: getResults.padrones
                }
              };
              return new entityChacrasActions.EntityChacrasGetPadronesSuccessAction(
                {
                  item: uc
                }
              );
            }
            return new entityChacrasActions.EntityChacrasGetPadronesFailureAction(
              {
                error: getResults.error.description
              }
            );
          }),
          catchError(error => {
            return observableOf(
              new entityChacrasActions.EntityChacrasGetPadronesFailureAction({
                error:
                  'Error al obtener padrones sugeridos de la chacra (fallo en conexion a servidor).'
              })
            );
          })
        )
    )
  );

  // get suelos
  @Effect()
  EntityChacrasGetSuelosRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasGetSuelosRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes
        .ENTITYCHACRAS_GETSUELOS_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasGetSuelosRequestAction) =>
        action.payload
    ),
    switchMap(payload =>
      this.chacrasCoreService
        .getSuelosChacraCore({
          ...payload.item,
          chacraId: payload.item.chacraNucleoId
        })
        .pipe(
          map(results => results.getResults),
          map(getResults => {
            if (getResults.success) {
              const uc: Update<ChacraSecano> = {
                id: payload.item.chacraId,
                changes: {
                  suelos: getResults.suelos
                }
              };
              return new entityChacrasActions.EntityChacrasGetSuelosSuccessAction(
                {
                  item: uc
                }
              );
            }
            return new entityChacrasActions.EntityChacrasGetSuelosFailureAction(
              {
                error: getResults.error.description
              }
            );
          }),
          catchError(error => {
            return observableOf(
              new entityChacrasActions.EntityChacrasGetSuelosFailureAction({
                error:
                  'Error al obtener suelos sugeridos de la chacra (fallo en conexion a servidor).'
              })
            );
          })
        )
    )
  );

  // get LS
  @Effect()
  EntityChacrasGetLSRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChacrasActions.EntityChacrasGetLSRequestAction>(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_REQUEST
    ),
    map(
      (action: entityChacrasActions.EntityChacrasGetLSRequestAction) =>
        action.payload
    ),
    switchMap(payload =>
      this.chacrasCoreService
        .getLSChacraCore({
          ...payload.item,
          chacraId: payload.item.chacraNucleoId
        })
        .pipe(
          map(results => results.getResults),
          map(getResults => {
            if (getResults.success) {
              const uc: Update<ChacraSecano> = {
                id: payload.item.chacraId,
                changes: {
                  chacraFactorLSGeometriaLimitante: getResults.Geometry,
                  chacraFactorLSLimitante: Number(getResults.FactorLS),
                  chacraFactorLLimitante: Number(getResults.FactorL),
                  chacraPendienteLimitante: getResults.Slope,
                  chacraLargoLimitante: getResults.SlopeLength
                }
              };
              return new entityChacrasActions.EntityChacrasGetLSSuccessAction({
                item: uc
              });
            }
            return new entityChacrasActions.EntityChacrasGetLSFailureAction({
              error: getResults.error.description
            });
          }),
          catchError(error => {
            return observableOf(
              new entityChacrasActions.EntityChacrasGetLSFailureAction({
                error:
                  'Error al obtener factor LS sugerido para la chacra (fallo en conexion a servidor).'
              })
            );
          })
        )
    )
  );

  // error

  @Effect({ dispatch: false })
  EntityChacrasFailureEffect$: Observable<any> = this.actions$.pipe(
    ofType(
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_FAILURE,
      entityChacrasActions.EntityChacrasActionTypes.ENTITYCHACRAS_ADD_FAILURE,
      entityChacrasActions.EntityChacrasActionTypes
        .ENTITYCHACRAS_CHANGE_FAILURE,
      entityChacrasActions.EntityChacrasActionTypes
        .ENTITYCHACRAS_DELETE_FAILURE,
      entityChacrasActions.EntityChacrasActionTypes
        .ENTITYCHACRAS_GETPADRONES_FAILURE,
      entityChacrasActions.EntityChacrasActionTypes
        .ENTITYCHACRAS_GETSUELOS_FAILURE
    ),
    map(
      (
        action:
          | entityChacrasActions.EntityChacrasLoadFailureAction
          | entityChacrasActions.EntityChacrasAddFailureAction
          | entityChacrasActions.EntityChacrasChangeFailureAction
          | entityChacrasActions.EntityChacrasDeleteFailureAction
          | entityChacrasActions.EntityChacrasGetPadronesFailureAction
          | entityChacrasActions.EntityChacrasGetSuelosFailureAction
      ) => action.payload.error
    ),
    tap((error: string) => this.notificationService.error(error))
  );
}
