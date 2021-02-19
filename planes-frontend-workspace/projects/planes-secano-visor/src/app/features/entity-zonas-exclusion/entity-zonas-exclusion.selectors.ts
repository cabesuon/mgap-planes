import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityZonasExclusionAdapter,
  ZonaExclusionCore,
  EntityZonasExclusionState
} from './entity-zonas-exclusion.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityZonasExclusionState): any => state.error;

export const getIsLoading = (state: EntityZonasExclusionState): boolean =>
  state.isLoading;

export const selectEntityZonasExclusionState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityZonasExclusion
);

export const selectAllEntityZonasExclusion: (
  state: object
) => ZonaExclusionCore[] = entityZonasExclusionAdapter.getSelectors(
  selectEntityZonasExclusionState
).selectAll;

export const selectZonasExclusionByPlanId = (planId: string) =>
  createSelector(
    selectAllEntityZonasExclusion,
    (allZonasExclusion: ZonaExclusionCore[]) => {
      if (allZonasExclusion) {
        return allZonasExclusion.filter(z => z.planId === planId);
      } else {
        return [];
      }
    }
  );

export const selectZonaExclusionById = (id: string) =>
  createSelector(
    selectAllEntityZonasExclusion,
    (allZonasExclusion: ZonaExclusionCore[]) => {
      if (allZonasExclusion) {
        return allZonasExclusion.find(z => z.zonaExclusionId === id);
      } else {
        return null;
      }
    }
  );

export const selectEntityZonasExclusionError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityZonasExclusionState,
  getError
);

export const selectEntityZonasExclusionIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityZonasExclusionState,
  getIsLoading
);
