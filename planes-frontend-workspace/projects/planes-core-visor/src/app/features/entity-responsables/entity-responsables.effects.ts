import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ResponsablesCoreService } from 'planes-core-lib';
import * as entityResponsablesActions from './entity-responsables.actions';

@Injectable()
export class EntityResponsablesEffects {
  constructor(
    private ResponsablesCoreService: ResponsablesCoreService,
    private actions$: Actions
  ) {
    this.ResponsablesCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityResponsablesPropietarioLoadRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<
      entityResponsablesActions.EntityResponsablesPropietarioLoadRequestAction
    >(
      entityResponsablesActions.EntityResponsablesActionTypes
        .ENTITYRESPONSABLES_PROPIETARIO_LOAD_REQUEST
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.ResponsablesCoreService.getPropietariosResponsablesCore(
        payload.personasId
      ).pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityResponsablesActions.EntityResponsablesLoadSuccessAction(
                {
                  items: queryResults.responsables
                }
              )
            : new entityResponsablesActions.EntityResponsablesLoadFailureAction(
                {
                  error: 'Error al obtener los Propietarios Responsables.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityResponsablesActions.EntityResponsablesLoadFailureAction({
              error:
                'Error al obtener los Propietarios Responsables (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );

  // load
  @Effect()
  EntityResponsablesArrendatarioLoadRequestEffect$: Observable<
    Action
  > = this.actions$.pipe(
    ofType<
      entityResponsablesActions.EntityResponsablesArrendatarioLoadRequestAction
    >(
      entityResponsablesActions.EntityResponsablesActionTypes
        .ENTITYRESPONSABLES_ARRENDATARIO_LOAD_REQUEST
    ),
    map(action => action.payload),
    switchMap(payload => {
      return this.ResponsablesCoreService.getArrendatariosResponsablesCore(
        payload.personasId
      ).pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityResponsablesActions.EntityResponsablesLoadSuccessAction(
                {
                  items: queryResults.responsables
                }
              )
            : new entityResponsablesActions.EntityResponsablesLoadFailureAction(
                {
                  error: 'Error al obtener los Arrendatarios Responsables.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityResponsablesActions.EntityResponsablesLoadFailureAction({
              error:
                'Error al obtener los Arrendatarios Responsables (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );
}
