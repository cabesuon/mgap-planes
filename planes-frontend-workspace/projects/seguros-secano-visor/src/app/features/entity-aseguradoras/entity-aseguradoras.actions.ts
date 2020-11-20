import { Action } from '@ngrx/store';

import { AseguradoraSegurosSecano } from './entity-aseguradoras.state';

export enum EntityAseguradorasActionTypes {
  ENTITYASEGURADORAS_LOAD_REQUEST = '[ENTITYASEGURADORAS] Load Request',
  ENTITYASEGURADORAS_LOAD_FAILURE = '[ENTITYASEGURADORAS] Load Failure',
  ENTITYASEGURADORAS_LOAD_SUCCESS = '[ENTITYASEGURADORAS] Load Success'
}

// load

export class EntityAseguradorasLoadRequestAction implements Action {
  readonly type = EntityAseguradorasActionTypes.ENTITYASEGURADORAS_LOAD_REQUEST;
}

export class EntityAseguradorasLoadFailureAction implements Action {
  readonly type = EntityAseguradorasActionTypes.ENTITYASEGURADORAS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityAseguradorasLoadSuccessAction implements Action {
  readonly type = EntityAseguradorasActionTypes.ENTITYASEGURADORAS_LOAD_SUCCESS;
  constructor(public payload: { items: AseguradoraSegurosSecano[] }) {}
}

// actions

export type EntityAseguradorasActions =
  | EntityAseguradorasLoadRequestAction
  | EntityAseguradorasLoadFailureAction
  | EntityAseguradorasLoadSuccessAction;
