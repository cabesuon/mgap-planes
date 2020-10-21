import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { CultivoSecano } from 'planes-secano-lib';
export { CultivoSecano } from 'planes-secano-lib';

export const entityCultivosAdapter: EntityAdapter<
  CultivoSecano
> = createEntityAdapter<CultivoSecano>({
  selectId: model => model.cultivoId,
  sortComparer: (a: CultivoSecano, b: CultivoSecano): number =>
    b.cultivoId.toString().localeCompare(a.cultivoId.toString())
});

export interface EntityCultivosState extends EntityState<CultivoSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityCultivosState = entityCultivosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
