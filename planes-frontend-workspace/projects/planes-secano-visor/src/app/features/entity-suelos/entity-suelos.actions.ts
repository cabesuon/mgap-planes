import { Action } from '@ngrx/store';

import { SueloCore } from './entity-suelos.state';

export enum EntitySuelosActionTypes {
  ENTITYSUELOS_LOAD_REQUEST = '[ENTITYSUELOS] Load Request',
  ENTITYSUELOS_LOAD_FAILURE = '[ENTITYSUELOS] Load Failure',
  ENTITYSUELOS_LOAD_SUCCESS = '[ENTITYSUELOS] Load Success'
}

// load

export class EntitySuelosLoadRequestAction implements Action {
  readonly type = EntitySuelosActionTypes.ENTITYSUELOS_LOAD_REQUEST;
}

export class EntitySuelosLoadFailureAction implements Action {
  readonly type = EntitySuelosActionTypes.ENTITYSUELOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntitySuelosLoadSuccessAction implements Action {
  readonly type = EntitySuelosActionTypes.ENTITYSUELOS_LOAD_SUCCESS;
  constructor(public payload: { items: SueloCore[] }) {}
}

// actions

export type EntitySuelosActions =
  | EntitySuelosLoadRequestAction
  | EntitySuelosLoadFailureAction
  | EntitySuelosLoadSuccessAction;
