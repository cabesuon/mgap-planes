import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ResponsableSecano } from 'planes-secano-lib';

export { ResponsableSecano } from 'planes-secano-lib';

export const entityResponsablesAdapter: EntityAdapter<
  ResponsableSecano
> = createEntityAdapter<ResponsableSecano>({
  selectId: model => model.contacto.personaId,
  sortComparer: (a: ResponsableSecano, b: ResponsableSecano): number =>
    b.contacto.personaId
      .toString()
      .localeCompare(a.contacto.personaId.toString())
});

export interface EntityResponsablesState
  extends EntityState<ResponsableSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityResponsablesState = entityResponsablesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
