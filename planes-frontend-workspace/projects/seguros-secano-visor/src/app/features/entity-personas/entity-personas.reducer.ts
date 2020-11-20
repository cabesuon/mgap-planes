import {
  EntityPersonasActions,
  EntityPersonasActionTypes
} from './entity-personas.actions';
import {
  entityPersonasAdapter,
  initialState,
  EntityPersonasState
} from './entity-personas.state';

export function entityPersonasReducer(
  state = initialState,
  action: EntityPersonasActions
): EntityPersonasState {
  switch (action.type) {
    // load
    case EntityPersonasActionTypes.ENTITYPERSONAS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPersonasActionTypes.ENTITYPERSONAS_LOAD_SUCCESS: {
      return entityPersonasAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityPersonasActionTypes.ENTITYPERSONAS_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // default
    default: {
      return state;
    }
  }
}
