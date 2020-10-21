import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityManejosAdapter,
  EntityManejosState,
  ManejoSecano
} from './entity-manejos.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityManejosState): any => state.error;

export const getIsLoading = (state: EntityManejosState): boolean =>
  state.isLoading;

export const selectEntityManejosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityManejos
);

export const selectAllEntityManejos: (
  state: object
) => ManejoSecano[] = entityManejosAdapter.getSelectors(
  selectEntityManejosState
).selectAll;

export const selectManejoById = (id: string) =>
  createSelector(
    selectAllEntityManejos,
    (allManejos: ManejoSecano[]) => {
      if (allManejos) {
        return allManejos.find(p => p.manejoId === id);
      } else {
        return null;
      }
    }
  );

export const selectEntityManejosError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityManejosState,
  getError
);

export const selectEntityManejosIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityManejosState,
  getIsLoading
);
