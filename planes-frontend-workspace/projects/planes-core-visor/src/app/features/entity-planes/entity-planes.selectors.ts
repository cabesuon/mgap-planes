import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityPlanesAdapter,
  PlanCore,
  EntityPlanesState
} from './entity-planes.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityPlanesState): any => state.error;

export const getIsLoading = (state: EntityPlanesState): boolean =>
  state.isLoading;

export const selectEntityPlanesState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityPlanes
);

export const selectAllEntityPlanes: (
  state: object
) => PlanCore[] = entityPlanesAdapter.getSelectors(selectEntityPlanesState)
  .selectAll;

export const selectPlanById = (id: string) =>
  createSelector(
    selectAllEntityPlanes,
    (allPlanes: PlanCore[]) => {
      if (allPlanes) {
        return allPlanes.find(p => p.planId.toString() === `${id}`);
      } else {
        return null;
      }
    }
  );

export const selectEntityPlanesError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityPlanesState,
  getError
);

export const selectEntityPlanesIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityPlanesState,
  getIsLoading
);
