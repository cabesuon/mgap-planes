import { Action } from '@ngrx/store';

import { CultivoSegurosSecano } from './entity-cultivos.state';

export enum EntityCultivosActionTypes {
  ENTITYCULTIVOS_LOAD_REQUEST = '[ENTITYCULTIVOS] Load Request',
  ENTITYCULTIVOS_LOAD_FAILURE = '[ENTITYCULTIVOS] Load Failure',
  ENTITYCULTIVOS_LOAD_SUCCESS = '[ENTITYCULTIVOS] Load Success'
}

// load

export class EntityCultivosLoadRequestAction implements Action {
  readonly type = EntityCultivosActionTypes.ENTITYCULTIVOS_LOAD_REQUEST;
}

export class EntityCultivosLoadFailureAction implements Action {
  readonly type = EntityCultivosActionTypes.ENTITYCULTIVOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityCultivosLoadSuccessAction implements Action {
  readonly type = EntityCultivosActionTypes.ENTITYCULTIVOS_LOAD_SUCCESS;
  constructor(public payload: { items: CultivoSegurosSecano[] }) {}
}

// actions

export type EntityCultivosActions =
  | EntityCultivosLoadRequestAction
  | EntityCultivosLoadFailureAction
  | EntityCultivosLoadSuccessAction;
