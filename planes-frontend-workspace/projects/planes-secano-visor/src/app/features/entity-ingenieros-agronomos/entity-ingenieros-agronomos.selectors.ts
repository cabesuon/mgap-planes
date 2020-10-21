import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityIngenierosAgronomosAdapter,
  IngenieroAgronomoCore,
  EntityIngenierosAgronomosState
} from './entity-ingenieros-agronomos.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityIngenierosAgronomosState): any =>
  state.error;

export const getIsLoading = (state: EntityIngenierosAgronomosState): boolean =>
  state.isLoading;

export const selectEntityIngenierosAgronomosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityIngenierosAgronomos
);

export const selectAllEntityIngenierosAgronomos: (
  state: object
) => IngenieroAgronomoCore[] = entityIngenierosAgronomosAdapter.getSelectors(
  selectEntityIngenierosAgronomosState
).selectAll;

export const selectIngenieroAgronomoById = (id: string) =>
  createSelector(
    selectAllEntityIngenierosAgronomos,
    (allIngenierosAgronomos: IngenieroAgronomoCore[]) => {
      if (allIngenierosAgronomos) {
        return allIngenierosAgronomos.find(p => p.ingenieroAgronomoId === id);
      } else {
        return null;
      }
    }
  );

export const selectEntityIngenierosAgronomosError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityIngenierosAgronomosState,
  getError
);

export const selectEntityIngenierosAgronomosIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityIngenierosAgronomosState,
  getIsLoading
);
