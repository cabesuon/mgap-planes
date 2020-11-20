import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityCiclosAdapter,
  EntityCiclosState,
  CicloSegurosSecano
} from './entity-ciclos.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityCiclosState): any => state.error;

export const getIsLoading = (state: EntityCiclosState): boolean =>
  state.isLoading;

export const selectEntityCiclosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityCiclos
);

export const selectAllEntityCiclos: (
  state: object
) => CicloSegurosSecano[] = entityCiclosAdapter.getSelectors(
  selectEntityCiclosState
).selectAll;
