import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../core/core.state';

import { entityChacrasReducer } from './entity-chacras/entity-chacras.reducer';
import { EntityChacrasState } from './entity-chacras/entity-chacras.state';
import { entityDibujosReducer } from './entity-dibujos/entity-dibujos.reducer';
import { EntityDibujosState } from './entity-dibujos/entity-dibujos.state';
import { entityPersonasReducer } from './entity-personas/entity-personas.reducer';
import { EntityPersonasState } from './entity-personas/entity-personas.state';
import { entityEmpresasReducer } from './entity-empresas/entity-empresas.reducer';
import { EntityEmpresasState } from './entity-empresas/entity-empresas.state';
import { entityComponentesReducer } from './entity-componentes/entity-componentes.reducer';
import { EntityComponentesState } from './entity-componentes/entity-componentes.state';
import { entityCultivosReducer } from './entity-cultivos/entity-cultivos.reducer';
import { EntityCultivosState } from './entity-cultivos/entity-cultivos.state';
import { entityCiclosReducer } from './entity-ciclos/entity-ciclos.reducer';
import { EntityCiclosState } from './entity-ciclos/entity-ciclos.state';
import { entityAseguradorasReducer } from './entity-aseguradoras/entity-aseguradoras.reducer';
import { EntityAseguradorasState } from './entity-aseguradoras/entity-aseguradoras.state';
import { entityUnidadesManejosReducer } from './entity-unidades/entity-unidades.reducer';
import { EntityUnidadesManejosState } from './entity-unidades/entity-unidades.state';

export const FEATURE_NAME = 'features';
export const selectFeatures = createFeatureSelector<State, FeaturesState>(
  FEATURE_NAME
);

export const reducers: ActionReducerMap<FeaturesState> = {
  entityChacras: entityChacrasReducer,
  entityDibujos: entityDibujosReducer,

  entityPersonas: entityPersonasReducer,
  entityEmpresas: entityEmpresasReducer,

  entityComponentes: entityComponentesReducer,
  entityCultivos: entityCultivosReducer,
  entityCiclos: entityCiclosReducer,

  entityAseguradoras: entityAseguradorasReducer,
  entityUnidades: entityUnidadesManejosReducer
};

export interface FeaturesState {
  entityChacras: EntityChacrasState;
  entityDibujos: EntityDibujosState;

  entityPersonas: EntityPersonasState;
  entityEmpresas: EntityEmpresasState;

  entityComponentes: EntityComponentesState;
  entityCultivos: EntityCultivosState;
  entityCiclos: EntityCiclosState;
  entityAseguradoras: EntityAseguradorasState;
  entityUnidades: EntityUnidadesManejosState;
}

export interface State extends AppState {
  features: FeaturesState;
}
