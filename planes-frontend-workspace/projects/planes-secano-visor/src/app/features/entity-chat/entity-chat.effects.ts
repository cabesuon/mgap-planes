import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ChatSecanoService } from 'planes-secano-lib';
import * as entityChatSecanoActions from './entity-chat.actions';

@Injectable()
export class EntityChatEffects {
  constructor(
    private chatSecanoService: ChatSecanoService,
    private actions$: Actions
  ) {
    this.chatSecanoService.url = environment.apiSecanoUrl;
  }

  // load
  @Effect()
  EntityChatSecanoLoadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<entityChatSecanoActions.EntityChatLoadRequestAction>(
      entityChatSecanoActions.EntityChatActionTypes.ENTITYCHAT_LOAD_REQUEST
    ),
    switchMap(() => {
      return this.chatSecanoService.getChatSecano().pipe(
        map(results => results.queryResults),
        map(queryResults => {
          return queryResults.success
            ? new entityChatSecanoActions.EntityChatLoadSuccessAction({
                items: queryResults.mensajes
              })
            : new entityChatSecanoActions.EntityChatLoadFailureAction({
                error: 'Error al obtener el chat.'
              });
        }),
        catchError(error =>
          observableOf(
            new entityChatSecanoActions.EntityChatLoadFailureAction({
              error: 'Error al obtener el chat.'
            })
          )
        )
      );
    })
  );
}
