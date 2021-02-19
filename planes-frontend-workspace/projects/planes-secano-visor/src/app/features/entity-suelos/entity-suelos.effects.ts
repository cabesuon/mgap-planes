import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { SuelosCoreService } from 'planes-core-lib';
import * as entitySuelosActions from './entity-suelos.actions';

@Injectable()
export class EntitySuelosEffects {
  constructor(
    private suelosCoreService: SuelosCoreService,
    private actions$: Actions
  ) {
    this.suelosCoreService.url = environment.apiNucleoUrl;
    this.suelosCoreService.urlMeta = environment.sueloMetaUrl;
  }

  // load
  @Effect()
  EntitySuelosLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entitySuelosActions.EntitySuelosLoadRequestAction>(
      entitySuelosActions.EntitySuelosActionTypes.ENTITYSUELOS_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.suelosCoreService.getSuelosCoreMeta().pipe(
        map(
          suelos =>
            new entitySuelosActions.EntitySuelosLoadSuccessAction({
              items: suelos
            })
        ),
        catchError(error =>
          observableOf(
            new entitySuelosActions.EntitySuelosLoadFailureAction({
              error: 'Error al obtener lista de suelos.'
            })
          )
        )
      );
    })
  );
}
