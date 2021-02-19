import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PlanSecanoUrlType } from 'planes-secano-lib';

import { PlanSecano } from './entity-planes.state';

export enum EntityPlanesActionTypes {
  ENTITYPLANES_LOAD_REQUEST = '[ENTITYPLANES] Load Request',
  ENTITYPLANES_LOAD_FAILURE = '[ENTITYPLANES] Load Failure',
  ENTITYPLANES_LOAD_SUCCESS = '[ENTITYPLANES] Load Success',
  ENTITYPLANES_ADD_REQUEST = '[ENTITYPLANES] Add Request',
  ENTITYPLANES_ADD_FAILURE = '[ENTITYPLANES] Add Failure',
  ENTITYPLANES_ADD_SUCCESS = '[ENTITYPLANES] Add Success',
  ENTITYPLANES_CHANGE_REQUEST = '[ENTITYPLANES] Change Request',
  ENTITYPLANES_CHANGE_FAILURE = '[ENTITYPLANES] Change Failure',
  ENTITYPLANES_CHANGE_SUCCESS = '[ENTITYPLANES] Change Success',
  ENTITYPLANES_DELETE_REQUEST = '[ENTITYPLANES] Delete Request',
  ENTITYPLANES_DELETE_FAILURE = '[ENTITYPLANES] Delete Failure',
  ENTITYPLANES_DELETE_SUCCESS = '[ENTITYPLANES] Delete Success',
  ENTITYPLANES_COPY_REQUEST = '[ENTITYPLANES] Copy Request',
  ENTITYPLANES_COPY_FAILURE = '[ENTITYPLANES] Copy Failure',
  ENTITYPLANES_COPY_SUCCESS = '[ENTITYPLANES] Copy Success',
  ENTITYPLANES_GETURL_REQUEST = '[ENTITYPLANES] Get Url Request',
  ENTITYPLANES_GETURL_FAILURE = '[ENTITYPLANES] Get Url Failure',
  ENTITYPLANES_GETURL_SUCCESS = '[ENTITYPLANES] Get Url Success'
}

// load

export class EntityPlanesLoadRequestAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_LOAD_REQUEST;
}

export class EntityPlanesLoadFailureAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPlanesLoadSuccessAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_LOAD_SUCCESS;
  constructor(public payload: { items: PlanSecano[] }) {}
}

// add

export class EntityPlanesAddRequestAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_ADD_REQUEST;
  constructor(public payload: { item: PlanSecano }) {}
}

export class EntityPlanesAddFailureAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPlanesAddSuccessAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_ADD_SUCCESS;
  constructor(public payload: { item: PlanSecano }) {}
}

// change

export class EntityPlanesChangeRequestAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_CHANGE_REQUEST;
  constructor(public payload: { item: PlanSecano }) {}
}

export class EntityPlanesChangeFailureAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_CHANGE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPlanesChangeSuccessAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_CHANGE_SUCCESS;
  constructor(public payload: { item: Update<PlanSecano> }) {}
}

// delete

export class EntityPlanesDeleteRequestAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_DELETE_REQUEST;
  constructor(public payload: { item: PlanSecano }) {}
}

export class EntityPlanesDeleteFailureAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPlanesDeleteSuccessAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_DELETE_SUCCESS;
  constructor(public payload: { planId: string }) {}
}

// copy

export class EntityPlanesCopyRequestAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_COPY_REQUEST;
  constructor(public payload: { item: PlanSecano }) {}
}

export class EntityPlanesCopyFailureAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_COPY_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPlanesCopySuccessAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_COPY_SUCCESS;
  constructor(public payload: { item: PlanSecano }) {}
}

// get url

export class EntityPlanesGetUrlRequestAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_GETURL_REQUEST;
  constructor(
    public payload: { item: PlanSecano; urlType: PlanSecanoUrlType }
  ) {}
}

export class EntityPlanesGetUrlFailureAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_GETURL_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityPlanesGetUrlSuccessAction implements Action {
  readonly type = EntityPlanesActionTypes.ENTITYPLANES_GETURL_SUCCESS;
  constructor(public payload: { url: string }) {}
}

// actions

export type EntityPlanesActions =
  | EntityPlanesLoadRequestAction
  | EntityPlanesLoadFailureAction
  | EntityPlanesLoadSuccessAction
  | EntityPlanesAddRequestAction
  | EntityPlanesAddFailureAction
  | EntityPlanesAddSuccessAction
  | EntityPlanesChangeRequestAction
  | EntityPlanesChangeFailureAction
  | EntityPlanesChangeSuccessAction
  | EntityPlanesDeleteRequestAction
  | EntityPlanesDeleteFailureAction
  | EntityPlanesDeleteSuccessAction
  | EntityPlanesCopyRequestAction
  | EntityPlanesCopyFailureAction
  | EntityPlanesCopySuccessAction
  | EntityPlanesGetUrlRequestAction
  | EntityPlanesGetUrlFailureAction
  | EntityPlanesGetUrlSuccessAction;
