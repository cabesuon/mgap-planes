import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { RotacionSecano } from 'planes-secano-lib';
export { RotacionSecano } from 'planes-secano-lib';

export const entityRotacionesAdapter: EntityAdapter<
  RotacionSecano
> = createEntityAdapter<RotacionSecano>({
  selectId: model => model.rotacionPlanId,
  sortComparer: (a: RotacionSecano, b: RotacionSecano): number =>
    b.rotacionPlanId.toString().localeCompare(a.rotacionPlanId.toString())
});

export interface EntityRotacionesState extends EntityState<RotacionSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityRotacionesState = entityRotacionesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
