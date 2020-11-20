import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { UnidadManejoSegurosSecano } from './entity-unidades.state';

export enum EntityUnidadesManejosActionTypes {
  ENTITYUNIDADESMANEJOS_LOAD_REQUEST = '[ENTITYUNIDADESMANEJOS] Load Request',
  ENTITYUNIDADESMANEJOS_LOAD_FAILURE = '[ENTITYUNIDADESMANEJOS] Load Failure',
  ENTITYUNIDADESMANEJOS_LOAD_SUCCESS = '[ENTITYUNIDADESMANEJOS] Load Success',
  ENTITYUNIDADESMANEJOS_ADD_REQUEST = '[ENTITYUNIDADESMANEJOS] Add Request',
  ENTITYUNIDADESMANEJOS_ADD_FAILURE = '[ENTITYUNIDADESMANEJOS] Add Failure',
  ENTITYUNIDADESMANEJOS_ADD_SUCCESS = '[ENTITYUNIDADESMANEJOS] Add Success',
  ENTITYUNIDADESMANEJOS_CHANGE_REQUEST = '[ENTITYUNIDADESMANEJOS] Change Request',
  ENTITYUNIDADESMANEJOS_CHANGE_FAILURE = '[ENTITYUNIDADESMANEJOS] Change Failure',
  ENTITYUNIDADESMANEJOS_CHANGE_SUCCESS = '[ENTITYUNIDADESMANEJOS] Change Success',
  ENTITYUNIDADESMANEJOS_DELETE_REQUEST = '[ENTITYUNIDADESMANEJOS] Delete Request',
  ENTITYUNIDADESMANEJOS_DELETE_FAILURE = '[ENTITYUNIDADESMANEJOS] Delete Failure',
  ENTITYUNIDADESMANEJOS_DELETE_SUCCESS = '[ENTITYUNIDADESMANEJOS] Delete Success'
}

// load

export class EntityUnidadesManejosLoadRequestAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_LOAD_REQUEST;
}

export class EntityUnidadesManejosLoadFailureAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityUnidadesManejosLoadSuccessAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_LOAD_SUCCESS;
  constructor(public payload: { items: UnidadManejoSegurosSecano[] }) {}
}

// add

export class EntityUnidadesManejosAddRequestAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_REQUEST;
  constructor(
    public payload: {
      item: UnidadManejoSegurosSecano;
    }
  ) {}
}

export class EntityUnidadesManejosAddFailureAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityUnidadesManejosAddSuccessAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_SUCCESS;
  constructor(
    public payload: {
      item: UnidadManejoSegurosSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

// change

export class EntityUnidadesManejosChangeRequestAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_REQUEST;
  constructor(
    public payload: {
      item: UnidadManejoSegurosSecano /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

export class EntityUnidadesManejosChangeFailureAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityUnidadesManejosChangeSuccessAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_SUCCESS;
  constructor(
    public payload: {
      item: Update<
        UnidadManejoSegurosSecano
      > /* dibujosId: number[] TODO: Completar*/;
    }
  ) {}
}

// delete

export class EntityUnidadesManejosDeleteRequestAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_REQUEST;
  constructor(public payload: { item: UnidadManejoSegurosSecano }) {}
}

export class EntityUnidadesManejosDeleteFailureAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityUnidadesManejosDeleteSuccessAction implements Action {
  readonly type =
    EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_SUCCESS;
  constructor(public payload: { item: UnidadManejoSegurosSecano }) {}
}

// actions

export type EntityUnidadesManejosActions =
  | EntityUnidadesManejosLoadRequestAction
  | EntityUnidadesManejosLoadFailureAction
  | EntityUnidadesManejosLoadSuccessAction
  | EntityUnidadesManejosAddRequestAction
  | EntityUnidadesManejosAddFailureAction
  | EntityUnidadesManejosAddSuccessAction
  | EntityUnidadesManejosChangeRequestAction
  | EntityUnidadesManejosChangeFailureAction
  | EntityUnidadesManejosChangeSuccessAction
  | EntityUnidadesManejosDeleteRequestAction
  | EntityUnidadesManejosDeleteFailureAction
  | EntityUnidadesManejosDeleteSuccessAction;
