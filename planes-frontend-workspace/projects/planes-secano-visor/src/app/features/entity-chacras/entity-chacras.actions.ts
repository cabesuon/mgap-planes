import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ChacraSecano } from './entity-chacras.state';

export enum EntityChacrasActionTypes {
  ENTITYCHACRAS_LOAD_REQUEST = '[ENTITYCHACRAS] Load Request',
  ENTITYCHACRAS_LOAD_FAILURE = '[ENTITYCHACRAS] Load Failure',
  ENTITYCHACRAS_LOAD_SUCCESS = '[ENTITYCHACRAS] Load Success',
  ENTITYCHACRAS_ADD_REQUEST = '[ENTITYCHACRAS] Add Request',
  ENTITYCHACRAS_ADD_FAILURE = '[ENTITYCHACRAS] Add Failure',
  ENTITYCHACRAS_ADD_SUCCESS = '[ENTITYCHACRAS] Add Success',
  ENTITYCHACRAS_CHANGE_REQUEST = '[ENTITYCHACRAS] Change Request',
  ENTITYCHACRAS_CHANGE_FAILURE = '[ENTITYCHACRAS] Change Failure',
  ENTITYCHACRAS_CHANGE_SUCCESS = '[ENTITYCHACRAS] Change Success',
  ENTITYCHACRAS_DELETE_REQUEST = '[ENTITYCHACRAS] Delete Request',
  ENTITYCHACRAS_DELETE_FAILURE = '[ENTITYCHACRAS] Delete Failure',
  ENTITYCHACRAS_DELETE_SUCCESS = '[ENTITYCHACRAS] Delete Success',
  ENTITYCHACRAS_GETPADRONES_REQUEST = '[ENTITYCHACRAS] Get Padrones Request',
  ENTITYCHACRAS_GETPADRONES_FAILURE = '[ENTITYCHACRAS] Get Padrones Failure',
  ENTITYCHACRAS_GETPADRONES_SUCCESS = '[ENTITYCHACRAS] Get Padrones Success',
  ENTITYCHACRAS_GETSUELOS_REQUEST = '[ENTITYCHACRAS] Get Suelos Request',
  ENTITYCHACRAS_GETSUELOS_FAILURE = '[ENTITYCHACRAS] Get Suelos Failure',
  ENTITYCHACRAS_GETSUELOS_SUCCESS = '[ENTITYCHACRAS] Get Suelos Success',
  ENTITYCHACRAS_GETLS_REQUEST = '[ENTITYCHACRAS] Get LS Request',
  ENTITYCHACRAS_GETLS_FAILURE = '[ENTITYCHACRAS] Get LS Failure',
  ENTITYCHACRAS_GETLS_SUCCESS = '[ENTITYCHACRAS] Get LS Success'
}

// load

export class EntityChacrasLoadRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_REQUEST;
}

export class EntityChacrasLoadFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasLoadSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_SUCCESS;
  constructor(public payload: { items: ChacraSecano[] }) {}
}

// add

export class EntityChacrasAddRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_ADD_REQUEST;
  constructor(public payload: { item: ChacraSecano; dibujosId: number[] }) {}
}

export class EntityChacrasAddFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasAddSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_ADD_SUCCESS;
  constructor(public payload: { item: ChacraSecano; dibujosId: number[] }) {}
}

// change

export class EntityChacrasChangeRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_REQUEST;
  constructor(public payload: { item: ChacraSecano; dibujosId: number[] }) {}
}

export class EntityChacrasChangeFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasChangeSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_SUCCESS;
  constructor(
    public payload: { item: Update<ChacraSecano>; dibujosId: number[] }
  ) {}
}

// delete

export class EntityChacrasDeleteRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_REQUEST;
  constructor(public payload: { item: ChacraSecano }) {}
}

export class EntityChacrasDeleteFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasDeleteSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_SUCCESS;
  constructor(public payload: { chacraId: string }) {}
}

// get padrones

export class EntityChacrasGetPadronesRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETPADRONES_REQUEST;
  constructor(public payload: { item: ChacraSecano }) {}
}

export class EntityChacrasGetPadronesFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETPADRONES_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasGetPadronesSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETPADRONES_SUCCESS;
  constructor(public payload: { item: Update<ChacraSecano> }) {}
}

// get suelos

export class EntityChacrasGetSuelosRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETSUELOS_REQUEST;
  constructor(public payload: { item: ChacraSecano }) {}
}

export class EntityChacrasGetSuelosFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETSUELOS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasGetSuelosSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETSUELOS_SUCCESS;
  constructor(public payload: { item: Update<ChacraSecano> }) {}
}

// get LS

export class EntityChacrasGetLSRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_REQUEST;
  constructor(public payload: { item: ChacraSecano }) {}
}

export class EntityChacrasGetLSFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasGetLSSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_SUCCESS;
  constructor(public payload: { item: Update<ChacraSecano> }) {}
}

// actions

export type EntityChacrasActions =
  | EntityChacrasLoadRequestAction
  | EntityChacrasLoadFailureAction
  | EntityChacrasLoadSuccessAction
  | EntityChacrasAddRequestAction
  | EntityChacrasAddFailureAction
  | EntityChacrasAddSuccessAction
  | EntityChacrasChangeRequestAction
  | EntityChacrasChangeFailureAction
  | EntityChacrasChangeSuccessAction
  | EntityChacrasDeleteRequestAction
  | EntityChacrasDeleteFailureAction
  | EntityChacrasDeleteSuccessAction
  | EntityChacrasGetPadronesRequestAction
  | EntityChacrasGetPadronesFailureAction
  | EntityChacrasGetPadronesSuccessAction
  | EntityChacrasGetSuelosRequestAction
  | EntityChacrasGetSuelosFailureAction
  | EntityChacrasGetSuelosSuccessAction
  | EntityChacrasGetLSRequestAction
  | EntityChacrasGetLSFailureAction
  | EntityChacrasGetLSSuccessAction;
