import { Action } from '@ngrx/store';

import { PersonaCore } from './entity-personas.state';

export enum EntityPersonasActionTypes {
  ENTITYPERSONAS_LOAD_REQUEST = '[ENTITYPERSONAS] Load Request',
  ENTITYPERSONAS_LOAD_FAILURE = '[ENTITYPERSONAS] Load Failure',
  ENTITYPERSONAS_LOAD_SUCCESS = '[ENTITYPERSONAS] Load Success'
}

// load

export class EntityPersonasLoadRequestAction implements Action {
  readonly type = EntityPersonasActionTypes.ENTITYPERSONAS_LOAD_REQUEST;
  constructor(public payload: { personasId: number[] }) {}
}

export class EntityPersonasLoadFailureAction implements Action {
  readonly type = EntityPersonasActionTypes.ENTITYPERSONAS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPersonasLoadSuccessAction implements Action {
  readonly type = EntityPersonasActionTypes.ENTITYPERSONAS_LOAD_SUCCESS;
  constructor(public payload: { items: PersonaCore[] }) {}
}

// actions

export type EntityPersonasActions =
  | EntityPersonasLoadRequestAction
  | EntityPersonasLoadFailureAction
  | EntityPersonasLoadSuccessAction;
