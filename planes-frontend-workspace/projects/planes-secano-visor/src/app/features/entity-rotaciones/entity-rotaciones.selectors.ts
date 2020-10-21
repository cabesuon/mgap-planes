import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityRotacionesAdapter,
  EntityRotacionesState,
  RotacionSecano
} from './entity-rotaciones.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityRotacionesState): any => state.error;

export const getIsLoading = (state: EntityRotacionesState): boolean =>
  state.isLoading;

export const selectEntityRotacionesState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityRotaciones
);

export const selectAllEntityRotaciones: (
  state: object
) => RotacionSecano[] = entityRotacionesAdapter.getSelectors(
  selectEntityRotacionesState
).selectAll;

export const selectRotacionById = (id: string) =>
  createSelector(
    selectAllEntityRotaciones,
    (allRotaciones: RotacionSecano[]) => {
      if (allRotaciones) {
        return allRotaciones.find(r => r.rotacionId === id);
      } else {
        return null;
      }
    }
  );

export const selectEntityRotacionesError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityRotacionesState,
  getError
);

export const selectEntityRotacionesIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityRotacionesState,
  getIsLoading
);
