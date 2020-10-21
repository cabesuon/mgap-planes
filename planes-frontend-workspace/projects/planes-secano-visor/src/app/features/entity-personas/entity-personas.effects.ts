import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { PersonasCoreService } from 'planes-core-lib';
import * as entityPersonasActions from './entity-personas.actions';

@Injectable()
export class EntityPersonasEffects {
  constructor(
    private personasCoreService: PersonasCoreService,
    private actions$: Actions
  ) {
    this.personasCoreService.url = environment.apiUrl;
  }

  // load
  @Effect()
  EntityPersonasLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityPersonasActions.EntityPersonasLoadRequestAction>(
      entityPersonasActions.EntityPersonasActionTypes
        .ENTITYPERSONAS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.personasCoreService.getPersonasCore().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityPersonasActions.EntityPersonasLoadSuccessAction({
                items: queryResults.personas
              })
            : new entityPersonasActions.EntityPersonasLoadFailureAction({
                error: 'Error al obtener las personas.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityPersonasActions.EntityPersonasLoadFailureAction({
              error: 'Error al obtener las personas.'
            })
          )
        )
      );
    })
  );
}
