import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityComponentesAdapter,
  EntityComponentesState,
  ComponenteSecano
} from './entity-componentes.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityComponentesState): any => state.error;

export const getIsLoading = (state: EntityComponentesState): boolean => state.isLoading;

export const selectEntityComponentesState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityComponentes
);

export const selectAllEntityComponentes: (
  state:object
) => ComponenteSecano[] = entityComponentesAdapter.getSelectors(selectEntityComponentesState).selectAll;