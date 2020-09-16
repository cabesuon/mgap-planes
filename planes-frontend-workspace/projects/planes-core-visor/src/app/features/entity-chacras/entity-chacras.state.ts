import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ChacraCore } from 'planes-core-lib';

export { ChacraCore } from 'planes-core-lib';

export const entityChacrasAdapter: EntityAdapter<
  ChacraCore
> = createEntityAdapter<ChacraCore>({
  selectId: model => model.chacraId,
  sortComparer: (a: ChacraCore, b: ChacraCore): number =>
    b.chacraId.toString().localeCompare(a.chacraId.toString())
});

export interface EntityChacrasState extends EntityState<ChacraCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityChacrasState = entityChacrasAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
