import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ZonaExclusionCore } from 'planes-core-lib';
export { ZonaExclusionCore } from 'planes-core-lib';

export const entityZonasExclusionAdapter: EntityAdapter<
  ZonaExclusionCore
> = createEntityAdapter<ZonaExclusionCore>({
  selectId: model => model.zonaExclusionId,
  sortComparer: (a: ZonaExclusionCore, b: ZonaExclusionCore): number =>
    b.zonaExclusionId.toString().localeCompare(a.zonaExclusionId.toString())
});

export interface EntityZonasExclusionState
  extends EntityState<ZonaExclusionCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityZonasExclusionState = entityZonasExclusionAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
