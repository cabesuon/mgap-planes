import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityEmpresasAdapter,
  EmpresaCore,
  EntityEmpresasState
} from './entity-empresas.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityEmpresasState): any => state.error;

export const getIsLoading = (state: EntityEmpresasState): boolean =>
  state.isLoading;

export const selectEntityEmpresasState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityEmpresas
);

export const selectAllEntityEmpresas: (
  state: object
) => EmpresaCore[] = entityEmpresasAdapter.getSelectors(
  selectEntityEmpresasState
).selectAll;

export const selectEmpresaById = (id: string) =>
  createSelector(
    selectAllEntityEmpresas,
    (allEmpresas: EmpresaCore[]) => {
      if (allEmpresas) {
        return allEmpresas.find(e => e.empresaId === id);
      } else {
        return null;
      }
    }
  );

export const selectEmpresasById = (ids: string[]) =>
  createSelector(
    selectAllEntityEmpresas,
    (allEmpresas: EmpresaCore[]) => {
      if (allEmpresas) {
        return allEmpresas.filter(e => ids.indexOf(e.empresaId) >= 0);
      } else {
        return [];
      }
    }
  );

export const selectEntityEmpresasError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityEmpresasState,
  getError
);

export const selectEntityEmpresasIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityEmpresasState,
  getIsLoading
);
