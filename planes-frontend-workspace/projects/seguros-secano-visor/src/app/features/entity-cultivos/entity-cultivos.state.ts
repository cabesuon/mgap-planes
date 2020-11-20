import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { CultivoSegurosSecano } from 'seguros-secano-lib';
export { CultivoSegurosSecano } from 'seguros-secano-lib';

export const entityCultivosAdapter: EntityAdapter<
  CultivoSegurosSecano
> = createEntityAdapter<CultivoSegurosSecano>({
  selectId: model => model.cultivoId,
  sortComparer: (a: CultivoSegurosSecano, b: CultivoSegurosSecano): number =>
    b.cultivoId.toString().localeCompare(a.cultivoId.toString())
});

export interface EntityCultivosState extends EntityState<CultivoSegurosSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityCultivosState = entityCultivosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
