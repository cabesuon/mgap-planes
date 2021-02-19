import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { SueloCore } from 'planes-core-lib';

export { SueloCore } from 'planes-core-lib';

export const entitySuelosAdapter: EntityAdapter<
  SueloCore
> = createEntityAdapter<SueloCore>({
  selectId: model => model.sueloId,
  sortComparer: (a: SueloCore, b: SueloCore): number =>
    b.sueloId.localeCompare(a.sueloId)
});

export interface EntitySuelosState extends EntityState<SueloCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntitySuelosState = entitySuelosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
