import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import {
  entityPersonasAdapter,
  PersonaCore,
  EntityPersonasState
} from './entity-personas.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityPersonasState): any => state.error;

export const getIsLoading = (state: EntityPersonasState): boolean =>
  state.isLoading;

export const selectEntityPersonasState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityPersonas
);

export const selectAllEntityPersonas: (
  state: object
) => PersonaCore[] = entityPersonasAdapter.getSelectors(
  selectEntityPersonasState
).selectAll;

export const selectPersonaById = (id: number) =>
  createSelector(
    selectAllEntityPersonas,
    (allPersonas: PersonaCore[]) => {
      if (allPersonas) {
        return allPersonas.find(p => p.personaId.toString() === `${id}`);
      } else {
        return null;
      }
    }
  );

export const selectEntityPersonasError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectEntityPersonasState,
  getError
);

export const selectEntityPersonasIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectEntityPersonasState,
  getIsLoading
);
