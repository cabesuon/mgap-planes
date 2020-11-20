import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  CultivoSegurosSecano,
  CultivosSegurosSecanoService
} from 'seguros-secano-lib';
import * as entityCultivosActions from './entity-cultivos.actions';

@Injectable()
export class EntityCultivosEffects {
  constructor(
    private cultivosService: CultivosSegurosSecanoService,
    private actions$: Actions
  ) {
    this.cultivosService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityCultivosLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityCultivosActions.EntityCultivosLoadRequestAction>(
      entityCultivosActions.EntityCultivosActionTypes
        .ENTITYCULTIVOS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.cultivosService.getCultivosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityCultivosActions.EntityCultivosLoadSuccessAction({
                items: queryResults.cultivos
              })
            : new entityCultivosActions.EntityCultivosLoadFailureAction({
                error: 'Error al obtener los cultivos.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityCultivosActions.EntityCultivosLoadFailureAction({
              error: 'Error al obtener los cultivos.'
            })
          )
        )
      );
    })
  );
}
