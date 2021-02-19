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

export const getIsLoading = (state: EntityComponentesState): boolean =>
  state.isLoading;

export const selectEntityComponentesState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityComponentes
);

export const selectAllEntityComponentes: (
  state: object
) => ComponenteSecano[] = entityComponentesAdapter.getSelectors(
  selectEntityComponentesState
).selectAll;

export const selectComponentesByRotacionId = (rotacionId: string) =>
  createSelector(
    selectAllEntityComponentes,
    (allComponentes: ComponenteSecano[]) => {
      if (allComponentes) {
        return allComponentes.filter(c => c.rotacionId === rotacionId);
      } else {
        return [];
      }
    }
  );

export const selectEntityComponentesError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityComponentesState,
  getError
);

export const selectEntityComponentesIsLoading: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityComponentesState,
  getIsLoading
);
