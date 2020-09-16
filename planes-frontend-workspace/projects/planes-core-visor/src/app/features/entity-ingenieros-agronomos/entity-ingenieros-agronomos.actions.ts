import { Action } from '@ngrx/store';

import { IngenieroAgronomoCore } from './entity-ingenieros-agronomos.state';

export enum EntityIngenierosAgronomosActionTypes {
  ENTITYINGENIEROSAGRONOMOS_LOAD_REQUEST = '[ENTITYINGENIEROSAGRONOMOS] Load Request',
  ENTITYINGENIEROSAGRONOMOS_LOAD_FAILURE = '[ENTITYINGENIEROSAGRONOMOS] Load Failure',
  ENTITYINGENIEROSAGRONOMOS_LOAD_SUCCESS = '[ENTITYINGENIEROSAGRONOMOS] Load Success'
}

// load

export class EntityIngenierosAgronomosLoadRequestAction implements Action {
  readonly type =
    EntityIngenierosAgronomosActionTypes.ENTITYINGENIEROSAGRONOMOS_LOAD_REQUEST;
  constructor(public payload: { ingenierosAgronomosId: number[] }) {}
}

export class EntityIngenierosAgronomosLoadFailureAction implements Action {
  readonly type =
    EntityIngenierosAgronomosActionTypes.ENTITYINGENIEROSAGRONOMOS_LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EntityIngenierosAgronomosLoadSuccessAction implements Action {
  readonly type =
    EntityIngenierosAgronomosActionTypes.ENTITYINGENIEROSAGRONOMOS_LOAD_SUCCESS;
  constructor(public payload: { items: IngenieroAgronomoCore[] }) {}
}

// actions

export type EntityIngenierosAgronomosActions =
  | EntityIngenierosAgronomosLoadRequestAction
  | EntityIngenierosAgronomosLoadFailureAction
  | EntityIngenierosAgronomosLoadSuccessAction;
