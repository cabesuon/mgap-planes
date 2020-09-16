import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ResponsableCore } from 'planes-core-lib';

export { ResponsableCore } from 'planes-core-lib';

export const entityResponsablesAdapter: EntityAdapter<
  ResponsableCore
> = createEntityAdapter<ResponsableCore>({
  selectId: model => model.contacto.personaId,
  sortComparer: (a: ResponsableCore, b: ResponsableCore): number =>
    b.contacto.personaId
      .toString()
      .localeCompare(a.contacto.personaId.toString())
});

export interface EntityResponsablesState extends EntityState<ResponsableCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityResponsablesState = entityResponsablesAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
