import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityResponsablesAdapter,
  ResponsableCore,
  EntityResponsablesState
} from './entity-responsables.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityResponsablesState): any => state.error;

export const getIsLoading = (state: EntityResponsablesState): boolean =>
  state.isLoading;

export const selectEntityResponsablesState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityResponsables
);

export const selectAllEntityResponsables: (
  state: object
) => ResponsableCore[] = entityResponsablesAdapter.getSelectors(
  selectEntityResponsablesState
).selectAll;

export const selectResponsableById = (id: number) =>
  createSelector(
    selectAllEntityResponsables,
    (allResponsables: ResponsableCore[]) => {
      if (allResponsables) {
        return allResponsables.find(
          r => r.contacto.personaId.toString() === `${id}`
        );
      } else {
        return null;
      }
    }
  );

export const selectEntityResponsablesError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityResponsablesState,
  getError
);

export const selectEntityResponsablesIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityResponsablesState,
  getIsLoading
);
