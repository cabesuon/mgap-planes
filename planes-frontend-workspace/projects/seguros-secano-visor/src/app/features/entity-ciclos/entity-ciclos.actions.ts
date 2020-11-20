import { Action } from '@ngrx/store';

import { CicloSegurosSecano } from './entity-ciclos.state';

export enum EntityCiclosActionTypes {
  ENTITYCICLOS_LOAD_REQUEST = '[ENTITYCICLOS] Load Request',
  ENTITYCICLOS_LOAD_FAILURE = '[ENTITYCICLOS] Load Failure',
  ENTITYCICLOS_LOAD_SUCCESS = '[ENTITYCICLOS] Load Success'
}

// load

export class EntityCiclosLoadRequestAction implements Action {
  readonly type = EntityCiclosActionTypes.ENTITYCICLOS_LOAD_REQUEST;
}

export class EntityCiclosLoadFailureAction implements Action {
  readonly type = EntityCiclosActionTypes.ENTITYCICLOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityCiclosLoadSuccessAction implements Action {
  readonly type = EntityCiclosActionTypes.ENTITYCICLOS_LOAD_SUCCESS;
  constructor(public payload: { items: CicloSegurosSecano[] }) {}
}

// actions

export type EntityCiclosActions =
  | EntityCiclosLoadRequestAction
  | EntityCiclosLoadFailureAction
  | EntityCiclosLoadSuccessAction;
