import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityRelacionesPerdidaSueloSecanoAdapter,
  EntityRelacionesPerdidaSueloSecanoState,
  RelacionPerdidaSueloSecano
} from './entity-relaciones-perdida-suelo.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityRelacionesPerdidaSueloSecanoState): any => state.error;

export const getIsLoading = (state: EntityRelacionesPerdidaSueloSecanoState): boolean => state.isLoading;

export const selectEntityRelacionesPerdidaSueloSecanoState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityRelacionesPerdidaSuelo
);

export const selectAllEntityRelacionesPerdidaSuelo: (
  state:object
) => RelacionPerdidaSueloSecano[] = entityRelacionesPerdidaSueloSecanoAdapter.getSelectors(selectEntityRelacionesPerdidaSueloSecanoState).selectAll;