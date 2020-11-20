import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
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
}
