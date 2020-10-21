import { Action } from '@ngrx/store';

import { ManejoSecano } from './entity-manejos.state';

export enum EntityManejosActionTypes {
  ENTITYMANEJOS_LOAD_REQUEST = '[ENTITYMANEJOS] Load Request',
  ENTITYMANEJOS_LOAD_FAILURE = '[ENTITYMANEJOS] Load Failure',
  ENTITYMANEJOS_LOAD_SUCCESS = '[ENTITYMANEJOS] Load Success'
}

// load

export class EntityManejosLoadRequestAction implements Action {
  readonly type = EntityManejosActionTypes.ENTITYMANEJOS_LOAD_REQUEST;
}

export class EntityManejosLoadFailureAction implements Action {
  readonly type = EntityManejosActionTypes.ENTITYMANEJOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityManejosLoadSuccessAction implements Action {
  readonly type = EntityManejosActionTypes.ENTITYMANEJOS_LOAD_SUCCESS;
  constructor(public payload: { items: ManejoSecano[] }) {}
}

// actions

export type EntityManejosActions =
  | EntityManejosLoadRequestAction
  | EntityManejosLoadFailureAction
  | EntityManejosLoadSuccessAction;
