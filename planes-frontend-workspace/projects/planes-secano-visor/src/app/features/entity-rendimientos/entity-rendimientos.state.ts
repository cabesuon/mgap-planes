import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { RendimientoSecano } from 'planes-secano-lib';
export { RendimientoSecano } from 'planes-secano-lib';

export const entityRendimientosAdapter: EntityAdapter<
  RendimientoSecano
> = createEntityAdapter<RendimientoSecano>({
  selectId: model => model.rendimientoId,
  sortComparer: (a: RendimientoSecano, b: RendimientoSecano): number =>
    b.rendimientoId.toString().localeCompare(a.rendimientoId.toString())
});

export interface EntityRendimientosState
  extends EntityState<RendimientoSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityRendimientosState = entityRendimientosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
