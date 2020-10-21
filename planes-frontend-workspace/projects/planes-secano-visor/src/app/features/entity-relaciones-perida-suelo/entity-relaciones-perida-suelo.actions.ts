import { Action } from '@ngrx/store';

import { RelacionPerdidaSueloSecano } from './entity-relaciones-perdida-suelo.state';

export enum EntityRelacionesPerdidaSueloActionTypes {
  ENTITYRELACIONESPERDIDASUELO_LOAD_REQUEST = '[ENTITYRELACIONESPERDIDASUELO] Load Request',
  ENTITYRELACIONESPERDIDASUELO_LOAD_FAILURE = '[ENTITYRELACIONESPERDIDASUELO] Load Failure',
  ENTITYRELACIONESPERDIDASUELO_LOAD_SUCCESS = '[ENTITYRELACIONESPERDIDASUELO] Load Success'
}

// load

export class EntityRelacionesPerdidaSueloLoadRequestAction implements Action {
  readonly type =
    EntityRelacionesPerdidaSueloActionTypes.ENTITYRELACIONESPERDIDASUELO_LOAD_REQUEST;
}

export class EntityRelacionesPerdidaSueloLoadFailureAction implements Action {
  readonly type =
    EntityRelacionesPerdidaSueloActionTypes.ENTITYRELACIONESPERDIDASUELO_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityRelacionesPerdidaSueloLoadSuccessAction implements Action {
  readonly type =
    EntityRelacionesPerdidaSueloActionTypes.ENTITYRELACIONESPERDIDASUELO_LOAD_SUCCESS;
  constructor(public payload: { items: RelacionPerdidaSueloSecano[] }) {}
}

// actions

export type EntityRelacionesPerdidaSueloActions =
  | EntityRelacionesPerdidaSueloLoadRequestAction
  | EntityRelacionesPerdidaSueloLoadFailureAction
  | EntityRelacionesPerdidaSueloLoadSuccessAction;
