import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ComponenteProductivoSegurosSecano } from 'seguros-secano-lib';
export { ComponenteProductivoSegurosSecano } from 'seguros-secano-lib';

export const entityComponentesAdapter: EntityAdapter<
  ComponenteProductivoSegurosSecano
> = createEntityAdapter<ComponenteProductivoSegurosSecano>({
  selectId: model => model.componenteId,
  sortComparer: (
    a: ComponenteProductivoSegurosSecano,
    b: ComponenteProductivoSegurosSecano
  ): number =>
    b.componenteId.toString().localeCompare(a.componenteId.toString())
});

export interface EntityComponentesState
  extends EntityState<ComponenteProductivoSegurosSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityComponentesState = entityComponentesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
