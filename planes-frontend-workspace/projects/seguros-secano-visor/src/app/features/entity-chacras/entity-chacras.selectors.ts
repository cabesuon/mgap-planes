import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityChacrasAdapter,
  ChacraSecano,
  EntityChacrasState
} from './entity-chacras.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityChacrasState): any => state.error;

export const getIsLoading = (state: EntityChacrasState): boolean =>
  state.isLoading;

export const selectEntityChacrasState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityChacras
);

export const selectAllEntityChacras: (
  state: object
) => ChacraSecano[] = entityChacrasAdapter.getSelectors(
  selectEntityChacrasState
).selectAll;

export const selectChacrasByPlanId = (id: string) =>
  createSelector(
    selectAllEntityChacras,
    (allChacras: ChacraSecano[]) => {
      if (allChacras) {
        return allChacras.filter(c => c.planId === id);
      } else {
        return [];
      }
    }
  );

export const selectChacraById = (id: string) =>
  createSelector(
    selectAllEntityChacras,
    (allChacras: ChacraSecano[]) => {
      if (allChacras) {
        return allChacras.find(c => c.chacraId === id);
      } else {
        return null;
      }
    }
  );

export const selectEntityChacrasError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityChacrasState,
  getError
);

export const selectEntityChacrasIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityChacrasState,
  getIsLoading
);
