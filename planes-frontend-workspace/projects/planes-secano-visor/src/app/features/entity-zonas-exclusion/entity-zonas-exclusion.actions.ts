import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ZonaExclusionCore } from './entity-zonas-exclusion.state';

export enum EntityZonasExclusionActionTypes {
  ENTITYZONASEXCLUSION_LOAD_REQUEST = '[ENTITYZONASEXCLUSION] Load Request',
  ENTITYZONASEXCLUSION_LOAD_FAILURE = '[ENTITYZONASEXCLUSION] Load Failure',
  ENTITYZONASEXCLUSION_LOAD_SUCCESS = '[ENTITYZONASEXCLUSION] Load Success',
  ENTITYZONASEXCLUSION_ADD_REQUEST = '[ENTITYZONASEXCLUSION] Add Request',
  ENTITYZONASEXCLUSION_ADD_FAILURE = '[ENTITYZONASEXCLUSION] Add Failure',
  ENTITYZONASEXCLUSION_ADD_SUCCESS = '[ENTITYZONASEXCLUSION] Add Success',
  ENTITYZONASEXCLUSION_CHANGE_REQUEST = '[ENTITYZONASEXCLUSION] Change Request',
  ENTITYZONASEXCLUSION_CHANGE_FAILURE = '[ENTITYZONASEXCLUSION] Change Failure',
  ENTITYZONASEXCLUSION_CHANGE_SUCCESS = '[ENTITYZONASEXCLUSION] Change Success',
  ENTITYZONASEXCLUSION_DELETE_REQUEST = '[ENTITYZONASEXCLUSION] Delete Request',
  ENTITYZONASEXCLUSION_DELETE_FAILURE = '[ENTITYZONASEXCLUSION] Delete Failure',
  ENTITYZONASEXCLUSION_DELETE_SUCCESS = '[ENTITYZONASEXCLUSION] Delete Success'
}

// load

export class EntityZonasExclusionLoadRequestAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_LOAD_REQUEST;
}

export class EntityZonasExclusionLoadFailureAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityZonasExclusionLoadSuccessAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_LOAD_SUCCESS;
  constructor(public payload: { items: ZonaExclusionCore[] }) {}
}

// add

export class EntityZonasExclusionAddRequestAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_ADD_REQUEST;
  constructor(public payload: { item: ZonaExclusionCore; dibujoId: number }) {}
}

export class EntityZonasExclusionAddFailureAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityZonasExclusionAddSuccessAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_ADD_SUCCESS;
  constructor(public payload: { item: ZonaExclusionCore; dibujoId: number }) {}
}

// change

export class EntityZonasExclusionChangeRequestAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_CHANGE_REQUEST;
  constructor(public payload: { item: ZonaExclusionCore; dibujoId: number }) {}
}

export class EntityZonasExclusionChangeFailureAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityZonasExclusionChangeSuccessAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_CHANGE_SUCCESS;
  constructor(
    public payload: { item: Update<ZonaExclusionCore>; dibujoId: number }
  ) {}
}

// delete

export class EntityZonasExclusionDeleteRequestAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_DELETE_REQUEST;
  constructor(public payload: { item: ZonaExclusionCore }) {}
}

export class EntityZonasExclusionDeleteFailureAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityZonasExclusionDeleteSuccessAction implements Action {
  readonly type =
    EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_DELETE_SUCCESS;
  constructor(public payload: { item: ZonaExclusionCore }) {}
}

// actions

export type EntityZonasExclusionActions =
  | EntityZonasExclusionLoadRequestAction
  | EntityZonasExclusionLoadFailureAction
  | EntityZonasExclusionLoadSuccessAction
  | EntityZonasExclusionAddRequestAction
  | EntityZonasExclusionAddFailureAction
  | EntityZonasExclusionAddSuccessAction
  | EntityZonasExclusionChangeRequestAction
  | EntityZonasExclusionChangeFailureAction
  | EntityZonasExclusionChangeSuccessAction
  | EntityZonasExclusionDeleteRequestAction
  | EntityZonasExclusionDeleteFailureAction
  | EntityZonasExclusionDeleteSuccessAction;
