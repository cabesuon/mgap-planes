import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../core/core.state';

import { entityPlanesReducer } from './entity-planes/entity-planes.reducer';
import { EntityPlanesState } from './entity-planes/entity-planes.state';
import { entityChacrasReducer } from './entity-chacras/entity-chacras.reducer';
import { EntityChacrasState } from './entity-chacras/entity-chacras.state';
import { entityZonasExclusionReducer } from './entity-zonas-exclusion/entity-zonas-exclusion.reducer';
import { EntityZonasExclusionState } from './entity-zonas-exclusion/entity-zonas-exclusion.state';
import { entityDibujosReducer } from './entity-dibujos/entity-dibujos.reducer';
import { EntityDibujosState } from './entity-dibujos/entity-dibujos.state';
import { entityPersonasReducer } from './entity-personas/entity-personas.reducer';
import { EntityPersonasState } from './entity-personas/entity-personas.state';
import { entityIngenierosAgronomosReducer } from './entity-ingenieros-agronomos/entity-ingenieros-agronomos.reducer';
import { EntityIngenierosAgronomosState } from './entity-ingenieros-agronomos/entity-ingenieros-agronomos.state';
import { entityEmpresasReducer } from './entity-empresas/entity-empresas.reducer';
import { EntityEmpresasState } from './entity-empresas/entity-empresas.state';

export const FEATURE_NAME = 'features';
export const selectFeatures = createFeatureSelector<State, FeaturesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<FeaturesState> = {
  entityPlanes: entityPlanesReducer,
  entityChacras: entityChacrasReducer,
  entityZonasExclusion: entityZonasExclusionReducer,
  entityDibujos: entityDibujosReducer,
  entityPersonas: entityPersonasReducer,
  entityIngenierosAgronomos: entityIngenierosAgronomosReducer,
  entityEmpresas: entityEmpresasReducer
};

export interface FeaturesState {
  entityPlanes: EntityPlanesState;
  entityChacras: EntityChacrasState;
  entityZonasExclusion: EntityZonasExclusionState;
  entityDibujos: EntityDibujosState;
  entityPersonas: EntityPersonasState;
  entityIngenierosAgronomos: EntityIngenierosAgronomosState;
  entityEmpresas: EntityEmpresasState;
}

export interface State extends AppState {
  features: FeaturesState;
}
