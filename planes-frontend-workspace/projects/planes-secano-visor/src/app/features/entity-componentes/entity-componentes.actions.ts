import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ComponenteSecano } from './entity-componentes.state';

export enum EntityComponentesActionTypes {
  ENTITYCOMPONENTES_LOAD_REQUEST = '[ENTITYCOMPONENTES] Load Request',
  ENTITYCOMPONENTES_LOAD_FAILURE = '[ENTITYCOMPONENTES] Load Failure',
  ENTITYCOMPONENTES_LOAD_SUCCESS = '[ENTITYCOMPONENTES] Load Success',
  ENTITYCOMPONENTES_ADD_REQUEST = '[ENTITYCOMPONENTES] Add Request',
  ENTITYCOMPONENTES_ADD_FAILURE = '[ENTITYCOMPONENTES] Add Failure',
  ENTITYCOMPONENTES_ADD_SUCCESS = '[ENTITYCOMPONENTES] Add Success',
  ENTITYCOMPONENTES_CHANGE_REQUEST = '[ENTITYCOMPONENTES] Change Request',
  ENTITYCOMPONENTES_CHANGE_FAILURE = '[ENTITYCOMPONENTES] Change Failure',
  ENTITYCOMPONENTES_CHANGE_SUCCESS = '[ENTITYCOMPONENTES] Change Success',
  ENTITYCOMPONENTES_DELETE_REQUEST = '[ENTITYCOMPONENTES] Delete Request',
  ENTITYCOMPONENTES_DELETE_FAILURE = '[ENTITYCOMPONENTES] Delete Failure',
  ENTITYCOMPONENTES_DELETE_SUCCESS = '[ENTITYCOMPONENTES] Delete Success'
}

// load

export class EntityComponentesLoadRequestAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_LOAD_REQUEST;
}

export class EntityComponentesLoadFailureAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityComponentesLoadSuccessAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_LOAD_SUCCESS;
  constructor(public payload: { items: ComponenteSecano[] }) {}
}

// add

export class EntityComponentesAddRequestAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_REQUEST;
  constructor(
    public payload: {
      item: ComponenteSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

export class EntityComponentesAddFailureAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityComponentesAddSuccessAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_SUCCESS;
  constructor(
    public payload: {
      item: ComponenteSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

// change

export class EntityComponentesChangeRequestAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_REQUEST;
  constructor(
    public payload: {
      item: ComponenteSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

export class EntityComponentesChangeFailureAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityComponentesChangeSuccessAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_SUCCESS;
  constructor(
    public payload: {
      item: Update<ComponenteSecano> /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

// delete

export class EntityComponentesDeleteRequestAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_REQUEST;
  constructor(public payload: { item: ComponenteSecano }) {}
}

export class EntityComponentesDeleteFailureAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityComponentesDeleteSuccessAction implements Action {
  readonly type = EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_SUCCESS;
  constructor(public payload: { item: ComponenteSecano }) {}
}

// actions

export type EntityComponentesActions =
  | EntityComponentesLoadRequestAction
  | EntityComponentesLoadFailureAction
  | EntityComponentesLoadSuccessAction
  | EntityComponentesAddRequestAction
  | EntityComponentesAddFailureAction
  | EntityComponentesAddSuccessAction
  | EntityComponentesChangeRequestAction
  | EntityComponentesChangeFailureAction
  | EntityComponentesChangeSuccessAction
  | EntityComponentesDeleteRequestAction
  | EntityComponentesDeleteFailureAction
  | EntityComponentesDeleteSuccessAction;
