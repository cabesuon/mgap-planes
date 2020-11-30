import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ChacraSegurosSecano } from 'seguros-secano-lib';
export { ChacraSegurosSecano } from 'seguros-secano-lib';

export const entityChacrasAdapter: EntityAdapter<
ChacraSegurosSecano
> = createEntityAdapter<ChacraSegurosSecano>({
  selectId: model => model.chacraId,
  sortComparer: (a: ChacraSegurosSecano, b: ChacraSegurosSecano): number =>
    b.chacraId.toString().localeCompare(a.chacraId.toString())
});

export interface EntityChacrasState extends EntityState<ChacraSegurosSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityChacrasState = entityChacrasAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
