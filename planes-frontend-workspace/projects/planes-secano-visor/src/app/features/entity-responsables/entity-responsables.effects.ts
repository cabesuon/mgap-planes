import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ResponsablesSecanoService } from 'planes-secano-lib';

import * as entityResponsablesActions from './entity-responsables.actions';

@Injectable()
export class EntityResponsablesEffects {
  constructor(
    private responsablesSecanoService: ResponsablesSecanoService,
    private actions$: Actions
  ) {
    this.responsablesSecanoService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityResponsablesLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityResponsablesActions.EntityResponsablesLoadRequestAction>(
      entityResponsablesActions.EntityResponsablesActionTypes
        .ENTITYRESPONSABLES_LOAD_REQUEST
    ),
    switchMap(payload => {
      return this.responsablesSecanoService.getResponsablesSecano().pipe(
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
                'Error al obtener los Responsables (fallo en conexion a servidor).'
            })
          )
        )
      );
    })
  );
}
