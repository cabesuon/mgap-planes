import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityCultivosAdapter,
  EntityCultivosState,
  CultivoSecano
} from './entity-cultivos.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityCultivosState): any => state.error;

export const getIsLoading = (state: EntityCultivosState): boolean =>
  state.isLoading;

export const selectEntityCultivosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityCultivos
);

export const selectAllEntityCultivos: (
  state: object
) => CultivoSecano[] = entityCultivosAdapter.getSelectors(
  selectEntityCultivosState
).selectAll;

export const selectEntityCultivosError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityCultivosState,
  getError
);

export const selectEntityCultivosIsLoading: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityCultivosState,
  getIsLoading
);
