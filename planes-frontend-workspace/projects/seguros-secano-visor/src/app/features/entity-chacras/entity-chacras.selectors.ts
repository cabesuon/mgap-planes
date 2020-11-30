import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityChacrasAdapter,
  ChacraSegurosSecano,
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
) => ChacraSegurosSecano[] = entityChacrasAdapter.getSelectors(
  selectEntityChacrasState
).selectAll;

export const selectChacrasByEmpresaId = (id: string) =>
  createSelector(
    selectAllEntityChacras,
    (allChacras: ChacraSegurosSecano[]) => {
      if (allChacras) {
        return allChacras.filter(c => c.empresaId === id);
      } else {
        return [];
      }
    }
  );

export const selectChacraById = (id: string) =>
  createSelector(
    selectAllEntityChacras,
    (allChacras: ChacraSegurosSecano[]) => {
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
