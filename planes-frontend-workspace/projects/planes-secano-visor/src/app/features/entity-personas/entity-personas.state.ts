import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { PersonaCore } from 'planes-core-lib';

export { PersonaCore } from 'planes-core-lib';

export const entityPersonasAdapter: EntityAdapter<
  PersonaCore
> = createEntityAdapter<PersonaCore>({
  selectId: model => model.personaId,
  sortComparer: (a: PersonaCore, b: PersonaCore): number =>
    b.personaId.localeCompare(a.personaId)
});

export interface EntityPersonasState extends EntityState<PersonaCore> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityPersonasState = entityPersonasAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
