import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entitySuelosAdapter,
  SueloCore,
  EntitySuelosState
} from './entity-suelos.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntitySuelosState): any => state.error;

export const getIsLoading = (state: EntitySuelosState): boolean =>
  state.isLoading;

export const selectEntitySuelosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entitySuelos
);

export const selectAllEntitySuelos: (
  state: object
) => SueloCore[] = entitySuelosAdapter.getSelectors(selectEntitySuelosState)
  .selectAll;

export const selectSueloById = (id: string) =>
  createSelector(
    selectAllEntitySuelos,
    (allSuelos: SueloCore[]) => {
      if (allSuelos) {
        return allSuelos.find(s => s.sueloId === id);
      } else {
        return null;
      }
    }
  );

export const selectSuelosById = (ids: string[]) =>
  createSelector(
    selectAllEntitySuelos,
    (allSuelos: SueloCore[]) => {
      if (allSuelos) {
        return allSuelos.filter(s => ids.indexOf(s.sueloId) >= 0);
      } else {
        return [];
      }
    }
  );

export const selectEntitySuelosError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntitySuelosState,
  getError
);

export const selectEntitySuelosIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntitySuelosState,
  getIsLoading
);
