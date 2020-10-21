import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ComponenteSecano } from 'planes-secano-lib';
export { ComponenteSecano } from 'planes-secano-lib';

export const entityComponentesAdapter: EntityAdapter<
  ComponenteSecano
> = createEntityAdapter<ComponenteSecano>({
  selectId: model => model.componenteId,
  sortComparer: (a: ComponenteSecano, b: ComponenteSecano): number =>
    b.componenteId.toString().localeCompare(a.componenteId.toString())
});

export interface EntityComponentesState extends EntityState<ComponenteSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityComponentesState = entityComponentesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
