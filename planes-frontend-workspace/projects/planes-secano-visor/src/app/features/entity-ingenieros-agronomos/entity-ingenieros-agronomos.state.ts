import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { IngenieroAgronomoCore } from 'planes-core-lib';

export { IngenieroAgronomoCore } from 'planes-core-lib';

export const entityIngenierosAgronomosAdapter: EntityAdapter<
  IngenieroAgronomoCore
> = createEntityAdapter<IngenieroAgronomoCore>({
  selectId: model => model.ingenieroAgronomoId,
  sortComparer: (a: IngenieroAgronomoCore, b: IngenieroAgronomoCore): number =>
    b.ingenieroAgronomoId
      .toString()
      .localeCompare(a.ingenieroAgronomoId.toString())
});

export interface EntityIngenierosAgronomosState
  extends EntityState<IngenieroAgronomoCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityIngenierosAgronomosState = entityIngenierosAgronomosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
