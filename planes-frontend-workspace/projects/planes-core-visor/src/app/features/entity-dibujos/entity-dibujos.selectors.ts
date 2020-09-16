import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityDibujosAdapter,
  DibujoCore,
  EntityDibujosState
} from './entity-dibujos.state';

import { selectFeatures, FeaturesState } from '../features.state';
import { DibujoCoreType } from 'projects/planes-core-lib/src/public-api';

export const getError = (state: EntityDibujosState): any => state.error;

export const getIsLoading = (state: EntityDibujosState): boolean =>
  state.isLoading;

export const selectEntityDibujosState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityDibujos
);

export const selectAllEntityDibujos: (
  state: object
) => DibujoCore[] = entityDibujosAdapter.getSelectors(selectEntityDibujosState)
  .selectAll;

export const selectAllEntityDibujosByTipo = (tipo: DibujoCoreType) =>
  createSelector(
    selectAllEntityDibujos,
    (allDibujos: DibujoCore[]) => {
      if (allDibujos) {
        return allDibujos.filter(d => d.dibujoTipo === tipo);
      } else {
        return [];
      }
    }
  );

export const selectDibujoById = (id: number) =>
  createSelector(
    selectAllEntityDibujos,
    (allDibujos: DibujoCore[]) => {
      if (allDibujos) {
        return allDibujos.find(d => d.dibujoId.toString() === `${id}`);
      } else {
        return null;
      }
    }
  );

export const selectEntityDibujosError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityDibujosState,
  getError
);

export const selectEntityDibujosIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityDibujosState,
  getIsLoading
);
