import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityAseguradorasAdapter,
  EntityAseguradorasState,
  AseguradoraSegurosSecano
} from './entity-aseguradoras.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityAseguradorasState): any => state.error;

export const getIsLoading = (state: EntityAseguradorasState): boolean =>
  state.isLoading;

export const selectEntityAseguradorasState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityAseguradoras
);

export const selectAllEntityAseguradoras: (
  state: object
) => AseguradoraSegurosSecano[] = entityAseguradorasAdapter.getSelectors(
  selectEntityAseguradorasState
).selectAll;
