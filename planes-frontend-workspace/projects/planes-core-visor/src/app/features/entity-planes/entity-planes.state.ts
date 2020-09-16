import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { PlanCore } from 'planes-core-lib';

export { PlanCore } from 'planes-core-lib';

export const entityPlanesAdapter: EntityAdapter<PlanCore> = createEntityAdapter<
  PlanCore
>({
  selectId: model => model.planId,
  sortComparer: (a: PlanCore, b: PlanCore): number =>
    b.planId.toString().localeCompare(a.planId.toString())
});

export interface EntityPlanesState extends EntityState<PlanCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityPlanesState = entityPlanesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
