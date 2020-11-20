import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
  AseguradoraSegurosSecano,
  AseguradorasSegurosSecanoService
} from 'seguros-secano-lib';
import * as entityAseguradorasActions from './entity-aseguradoras.actions';

@Injectable()
export class EntityAseguradorasEffects {
  constructor(
    private aseguradorasService: AseguradorasSegurosSecanoService,
    private actions$: Actions
  ) {
    this.aseguradorasService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityAseguradorasLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityAseguradorasActions.EntityAseguradorasLoadRequestAction>(
      entityAseguradorasActions.EntityAseguradorasActionTypes
        .ENTITYASEGURADORAS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.aseguradorasService.getAseguradorasSegurosSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityAseguradorasActions.EntityAseguradorasLoadSuccessAction(
                {
                  items: queryResults.aseguradoras
                }
              )
            : new entityAseguradorasActions.EntityAseguradorasLoadFailureAction(
                {
                  error: 'Error al obtener las aseguradoras.'
                }
              );
        }),
        catchError(error =>
          observableOf(
            new entityAseguradorasActions.EntityAseguradorasLoadFailureAction({
              error: 'Error al obtener las aseguradoras.'
            })
          )
        )
      );
    })
  );
}
