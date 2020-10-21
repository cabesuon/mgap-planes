import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ManejoSecano } from 'planes-secano-lib';
export { ManejoSecano } from 'planes-secano-lib';

export const entityManejosAdapter: EntityAdapter<
  ManejoSecano
> = createEntityAdapter<ManejoSecano>({
  selectId: model => model.manejoId,
  sortComparer: (a: ManejoSecano, b: ManejoSecano): number =>
    b.manejoId.toString().localeCompare(a.manejoId.toString())
});

export interface EntityManejosState extends EntityState<ManejoSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityManejosState = entityManejosAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
