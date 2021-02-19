import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { PlanSecano } from 'planes-secano-lib';

export { PlanSecano } from 'planes-secano-lib';

export const entityPlanesAdapter: EntityAdapter<
  PlanSecano
> = createEntityAdapter<PlanSecano>({
  selectId: model => model.planId,
  sortComparer: (a: PlanSecano, b: PlanSecano): number =>
    b.planId.localeCompare(a.planId)
});

export interface EntityPlanesState extends EntityState<PlanSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityPlanesState = entityPlanesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
