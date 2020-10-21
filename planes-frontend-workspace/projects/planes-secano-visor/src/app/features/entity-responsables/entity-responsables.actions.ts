import { Action } from '@ngrx/store';

import { ResponsableSecano } from './entity-responsables.state';

export enum EntityResponsablesActionTypes {
  ENTITYRESPONSABLES_LOAD_REQUEST = '[ENTITYRESPONSABLES] Load Request',
  ENTITYRESPONSABLES_LOAD_FAILURE = '[ENTITYRESPONSABLES] Load Failure',
  ENTITYRESPONSABLES_LOAD_SUCCESS = '[ENTITYRESPONSABLES] Load Success'
}

// load

export class EntityResponsablesLoadRequestAction implements Action {
  readonly type = EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_REQUEST;
}

export class EntityResponsablesLoadFailureAction implements Action {
  readonly type = EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityResponsablesLoadSuccessAction implements Action {
  readonly type = EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_SUCCESS;
  constructor(public payload: { items: ResponsableSecano[] }) {}
}

// actions

export type EntityResponsablesActions =
  | EntityResponsablesLoadRequestAction
  | EntityResponsablesLoadFailureAction
  | EntityResponsablesLoadSuccessAction;
