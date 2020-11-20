import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { AseguradoraSegurosSecano } from 'seguros-secano-lib';
export { AseguradoraSegurosSecano } from 'seguros-secano-lib';

export const entityAseguradorasAdapter: EntityAdapter<
  AseguradoraSegurosSecano
> = createEntityAdapter<AseguradoraSegurosSecano>({
  selectId: model => model.aseguradoraId,
  sortComparer: (
    a: AseguradoraSegurosSecano,
    b: AseguradoraSegurosSecano
  ): number =>
    b.aseguradoraId.toString().localeCompare(a.aseguradoraId.toString())
});

export interface EntityAseguradorasState
  extends EntityState<AseguradoraSegurosSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityAseguradorasState = entityAseguradorasAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
