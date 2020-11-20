import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ChacraSecano } from 'planes-secano-lib';

export { ChacraSecano } from 'planes-secano-lib';

export const entityChacrasAdapter: EntityAdapter<
  ChacraSecano
> = createEntityAdapter<ChacraSecano>({
  selectId: model => model.chacraId,
  sortComparer: (a: ChacraSecano, b: ChacraSecano): number =>
    b.chacraId.toString().localeCompare(a.chacraId.toString())
});

export interface EntityChacrasState extends EntityState<ChacraSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityChacrasState = entityChacrasAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
