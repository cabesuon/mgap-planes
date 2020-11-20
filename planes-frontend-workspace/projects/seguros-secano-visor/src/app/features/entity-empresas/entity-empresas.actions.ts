import { Action } from '@ngrx/store';

import { EmpresaCore } from './entity-empresas.state';

export enum EntityEmpresasActionTypes {
  ENTITYEMPRESAS_LOAD_REQUEST = '[ENTITYEMPRESAS] Load Request',
  ENTITYEMPRESAS_LOAD_FAILURE = '[ENTITYEMPRESAS] Load Failure',
  ENTITYEMPRESAS_LOAD_SUCCESS = '[ENTITYEMPRESAS] Load Success'
}

// load

export class EntityEmpresasLoadRequestAction implements Action {
  readonly type = EntityEmpresasActionTypes.ENTITYEMPRESAS_LOAD_REQUEST;
}

export class EntityEmpresasLoadFailureAction implements Action {
  readonly type = EntityEmpresasActionTypes.ENTITYEMPRESAS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityEmpresasLoadSuccessAction implements Action {
  readonly type = EntityEmpresasActionTypes.ENTITYEMPRESAS_LOAD_SUCCESS;
  constructor(public payload: { items: EmpresaCore[] }) {}
}

// actions

export type EntityEmpresasActions =
  | EntityEmpresasLoadRequestAction
  | EntityEmpresasLoadFailureAction
  | EntityEmpresasLoadSuccessAction;
