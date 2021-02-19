import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ComponenteSecano } from 'planes-secano-lib';
export { ComponenteSecano } from 'planes-secano-lib';

export function componenteSelectId(componente: ComponenteSecano): string {
  return `r:${componente.rotacionId} c:${componente.componenteId}`;
}

export const entityComponentesAdapter: EntityAdapter<
  ComponenteSecano
> = createEntityAdapter<ComponenteSecano>({
  selectId: model => componenteSelectId(model),
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
