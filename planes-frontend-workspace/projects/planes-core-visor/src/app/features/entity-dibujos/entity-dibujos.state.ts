import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { DibujoCore } from 'planes-core-lib';
export { DibujoCore } from 'planes-core-lib';

export const entityDibujosAdapter: EntityAdapter<
  DibujoCore
> = createEntityAdapter<DibujoCore>({
  selectId: model => model.dibujoId,
  sortComparer: (a: DibujoCore, b: DibujoCore): number =>
    b.dibujoId.toString().localeCompare(a.dibujoId.toString())
});

export interface EntityDibujosState extends EntityState<DibujoCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityDibujosState = entityDibujosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
