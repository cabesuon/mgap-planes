import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ChacraSegurosSecano } from './entity-chacras.state';

import { ComponenteProductivoSegurosSecano } from '../entity-componentes/entity-componentes.state';

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
  ENTITYCHACRAS_DELETE_SUCCESS = '[ENTITYCHACRAS] Delete Success'
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
  constructor(public payload: { items: ChacraSegurosSecano[] }) {}
}

// add

export class EntityChacrasAddRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_ADD_REQUEST;
  constructor(
    public payload: { item: ChacraSegurosSecano; dibujosId: number[], componente: ComponenteProductivoSegurosSecano }
  ) {}
}

export class EntityChacrasAddFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasAddSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_ADD_SUCCESS;
  constructor(
    public payload: { item: ChacraSegurosSecano; dibujosId: number[], componente: ComponenteProductivoSegurosSecano }
  ) {}
}

// change

export class EntityChacrasChangeRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_REQUEST;
  constructor(
    public payload: { item: ChacraSegurosSecano; dibujosId: number[], componente: ComponenteProductivoSegurosSecano }
  ) {}
}

export class EntityChacrasChangeFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasChangeSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_SUCCESS;
  constructor(
    public payload: { item: Update<ChacraSegurosSecano>; dibujosId: number[] }
  ) {}
}

// delete

export class EntityChacrasDeleteRequestAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_REQUEST;
  constructor(public payload: { item: ChacraSegurosSecano }) {}
}

export class EntityChacrasDeleteFailureAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityChacrasDeleteSuccessAction implements Action {
  readonly type = EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_SUCCESS;
  constructor(public payload: { item: ChacraSegurosSecano }) {}
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
  | EntityChacrasDeleteSuccessAction;
