import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { RotacionSecano } from './entity-rotaciones.state';

export enum EntityRotacionesActionTypes {
  ENTITYROTACIONES_LOAD_REQUEST = '[ENTITYROTACIONES] Load Request',
  ENTITYROTACIONES_LOAD_FAILURE = '[ENTITYROTACIONES] Load Failure',
  ENTITYROTACIONES_LOAD_SUCCESS = '[ENTITYROTACIONES] Load Success',
  ENTITYROTACIONES_ADD_REQUEST = '[ENTITYROTACIONES] Add Request',
  ENTITYROTACIONES_ADD_FAILURE = '[ENTITYROTACIONES] Add Failure',
  ENTITYROTACIONES_ADD_SUCCESS = '[ENTITYROTACIONES] Add Success',
  ENTITYROTACIONES_CHANGE_REQUEST = '[ENTITYROTACIONES] Change Request',
  ENTITYROTACIONES_CHANGE_FAILURE = '[ENTITYROTACIONES] Change Failure',
  ENTITYROTACIONES_CHANGE_SUCCESS = '[ENTITYROTACIONES] Change Success',
  ENTITYROTACIONES_DELETE_REQUEST = '[ENTITYROTACIONES] Delete Request',
  ENTITYROTACIONES_DELETE_FAILURE = '[ENTITYROTACIONES] Delete Failure',
  ENTITYROTACIONES_DELETE_SUCCESS = '[ENTITYROTACIONES] Delete Success'
}

// load

export class EntityRotacionesLoadRequestAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_LOAD_REQUEST;
}

export class EntityRotacionesLoadFailureAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityRotacionesLoadSuccessAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_LOAD_SUCCESS;
  constructor(public payload: { items: RotacionSecano[] }) {}
}

// add

export class EntityRotacionesAddRequestAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_ADD_REQUEST;
  constructor(
    public payload: {
      item: RotacionSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

export class EntityRotacionesAddFailureAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityRotacionesAddSuccessAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_ADD_SUCCESS;
  constructor(
    public payload: {
      item: RotacionSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

// change

export class EntityRotacionesChangeRequestAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_CHANGE_REQUEST;
  constructor(
    public payload: {
      item: RotacionSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

export class EntityRotacionesChangeFailureAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityRotacionesChangeSuccessAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_CHANGE_SUCCESS;
  constructor(
    public payload: {
      item: Update<RotacionSecano> /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

// delete

export class EntityRotacionesDeleteRequestAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_DELETE_REQUEST;
  constructor(public payload: { item: RotacionSecano }) {}
}

export class EntityRotacionesDeleteFailureAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityRotacionesDeleteSuccessAction implements Action {
  readonly type = EntityRotacionesActionTypes.ENTITYROTACIONES_DELETE_SUCCESS;
  constructor(public payload: { item: RotacionSecano }) {}
}

// actions

export type EntityRotacionesActions =
  | EntityRotacionesLoadRequestAction
  | EntityRotacionesLoadFailureAction
  | EntityRotacionesLoadSuccessAction
  | EntityRotacionesAddRequestAction
  | EntityRotacionesAddFailureAction
  | EntityRotacionesAddSuccessAction
  | EntityRotacionesChangeRequestAction
  | EntityRotacionesChangeFailureAction
  | EntityRotacionesChangeSuccessAction
  | EntityRotacionesDeleteRequestAction
  | EntityRotacionesDeleteFailureAction
  | EntityRotacionesDeleteSuccessAction;
