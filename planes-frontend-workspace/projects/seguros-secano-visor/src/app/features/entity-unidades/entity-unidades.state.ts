import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { UnidadManejoSegurosSecano } from 'seguros-secano-lib';
export { UnidadManejoSegurosSecano } from 'seguros-secano-lib';

export const entityUnidadesManejosAdapter: EntityAdapter<
  UnidadManejoSegurosSecano
> = createEntityAdapter<UnidadManejoSegurosSecano>({
  selectId: model => model.unidadId,
  sortComparer: (
    a: UnidadManejoSegurosSecano,
    b: UnidadManejoSegurosSecano
  ): number => b.unidadId.toString().localeCompare(a.unidadId.toString())
});

export interface EntityUnidadesManejosState
  extends EntityState<UnidadManejoSegurosSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityUnidadesManejosState = entityUnidadesManejosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
