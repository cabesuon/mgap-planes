import { Action } from '@ngrx/store';

import { ChatSecano } from './entity-chat.state';

export enum EntityChatActionTypes {
  ENTITYCHAT_LOAD_REQUEST = '[ENTITYCHAT] Load Request',
  ENTITYCHAT_LOAD_FAILURE = '[ENTITYCHAT] Load Failure',
  ENTITYCHAT_LOAD_SUCCESS = '[ENTITYCHAT] Load Success'
}

// load
export class EntityChatLoadRequestAction implements Action {
  readonly type = EntityChatActionTypes.ENTITYCHAT_LOAD_REQUEST;
}

export class EntityChatLoadFailureAction implements Action {
  readonly type = EntityChatActionTypes.ENTITYCHAT_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChatLoadSuccessAction implements Action {
  readonly type = EntityChatActionTypes.ENTITYCHAT_LOAD_SUCCESS;
  constructor(public payload: { items: ChatSecano[] }) {}
}

// actions
export type EntityChatActions =
  | EntityChatLoadRequestAction
  | EntityChatLoadFailureAction
  | EntityChatLoadSuccessAction;
