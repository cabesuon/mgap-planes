import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityUnidadesManejosAdapter,
  EntityUnidadesManejosState,
  UnidadManejoSegurosSecano
} from './entity-unidades.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityUnidadesManejosState): any => state.error;

export const getIsLoading = (state: EntityUnidadesManejosState): boolean =>
  state.isLoading;

export const selectEntityUnidadesManejosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityUnidades
);

export const selectAllEntityUnidadesManejos: (
  state: object
) => UnidadManejoSegurosSecano[] = entityUnidadesManejosAdapter.getSelectors(
  selectEntityUnidadesManejosState
).selectAll;
