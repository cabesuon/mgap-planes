import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { CicloSegurosSecano } from 'seguros-secano-lib';
export { CicloSegurosSecano } from 'seguros-secano-lib';

export const entityCiclosAdapter: EntityAdapter<
  CicloSegurosSecano
> = createEntityAdapter<CicloSegurosSecano>({
  selectId: model => model.cicloId,
  sortComparer: (a: CicloSegurosSecano, b: CicloSegurosSecano): number =>
    b.cicloId.toString().localeCompare(a.cicloId.toString())
});

export interface EntityCiclosState extends EntityState<CicloSegurosSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityCiclosState = entityCiclosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
