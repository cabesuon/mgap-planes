import { Action } from '@ngrx/store';

import { RendimientoSecano } from './entity-rendimientos.state';

export enum EntityRendimientosActionTypes {
  ENTITYRENDIMIENTOS_LOAD_REQUEST = '[ENTITYRENDIMIENTOS] Load Request',
  ENTITYRENDIMIENTOS_LOAD_FAILURE = '[ENTITYRENDIMIENTOS] Load Failure',
  ENTITYRENDIMIENTOS_LOAD_SUCCESS = '[ENTITYRENDIMIENTOS] Load Success'
}

// load

export class EntityRendimientosLoadRequestAction implements Action {
  readonly type = EntityRendimientosActionTypes.ENTITYRENDIMIENTOS_LOAD_REQUEST;
}

export class EntityRendimientosLoadFailureAction implements Action {
  readonly type = EntityRendimientosActionTypes.ENTITYRENDIMIENTOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityRendimientosLoadSuccessAction implements Action {
  readonly type = EntityRendimientosActionTypes.ENTITYRENDIMIENTOS_LOAD_SUCCESS;
  constructor(public payload: { items: RendimientoSecano[] }) {}
}

// actions

export type EntityRendimientosActions =
  | EntityRendimientosLoadRequestAction
  | EntityRendimientosLoadFailureAction
  | EntityRendimientosLoadSuccessAction;
