import { Action } from '@ngrx/store';

import { ResponsableCore } from './entity-responsables.state';

export enum ResponsableType {
  PROPIETARIO = 'Propietario',
  ARRENDATARIO = 'Arrendatario'
}

export enum EntityResponsablesActionTypes {
  ENTITYRESPONSABLES_PROPIETARIO_LOAD_REQUEST = '[ENTITYRESPONSABLES][PROPIETARIO] Load Request',
  ENTITYRESPONSABLES_ARRENDATARIO_LOAD_REQUEST = '[ENTITYRESPONSABLES][ARRENDATARIO] Load Request',
  ENTITYRESPONSABLES_LOAD_FAILURE = '[ENTITYRESPONSABLES] Load Failure',
  ENTITYRESPONSABLES_LOAD_SUCCESS = '[ENTITYRESPONSABLES] Load Success'
}

// load

export class EntityResponsablesPropietarioLoadRequestAction implements Action {
  readonly type =
    EntityResponsablesActionTypes.ENTITYRESPONSABLES_PROPIETARIO_LOAD_REQUEST;
  constructor(public payload: { personasId: number[] }) {}
}

export class EntityResponsablesArrendatarioLoadRequestAction implements Action {
  readonly type =
    EntityResponsablesActionTypes.ENTITYRESPONSABLES_ARRENDATARIO_LOAD_REQUEST;
  constructor(public payload: { personasId: number[] }) {}
}

export class EntityResponsablesLoadFailureAction implements Action {
  readonly type = EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityResponsablesLoadSuccessAction implements Action {
  readonly type = EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_SUCCESS;
  constructor(public payload: { items: ResponsableCore[] }) {}
}

// actions

export type EntityResponsablesActions =
  | EntityResponsablesPropietarioLoadRequestAction
  | EntityResponsablesArrendatarioLoadRequestAction
  | EntityResponsablesLoadFailureAction
  | EntityResponsablesLoadSuccessAction;
