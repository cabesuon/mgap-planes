import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityRendimientosAdapter,
  EntityRendimientosState,
  RendimientoSecano
} from './entity-rendimientos.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityRendimientosState): any => state.error;

export const getIsLoading = (state: EntityRendimientosState): boolean =>
  state.isLoading;

export const selectEntityRendimientosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityRendimientos
);

export const selectAllEntityRendimientos: (
  state: object
) => RendimientoSecano[] = entityRendimientosAdapter.getSelectors(
  selectEntityRendimientosState
).selectAll;

export const selectRendimientoById = (id: string) =>
  createSelector(
    selectAllEntityRendimientos,
    (allRendimientos: RendimientoSecano[]) => {
      if (allRendimientos) {
        return allRendimientos.find(r => r.rendimientoId === id);
      } else {
        return null;
      }
    }
  );

export const selectEntityRendimientosError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityRendimientosState,
  getError
);

export const selectEntityRendimientosIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityRendimientosState,
  getIsLoading
);
