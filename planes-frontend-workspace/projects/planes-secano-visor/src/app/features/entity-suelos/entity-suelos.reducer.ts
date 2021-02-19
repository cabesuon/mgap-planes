import {
  EntitySuelosActions,
  EntitySuelosActionTypes
} from './entity-suelos.actions';
import {
  entitySuelosAdapter,
  initialState,
  EntitySuelosState
} from './entity-suelos.state';

export function entitySuelosReducer(
  state = initialState,
  action: EntitySuelosActions
): EntitySuelosState {
  switch (action.type) {
    // load
    case EntitySuelosActionTypes.ENTITYSUELOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntitySuelosActionTypes.ENTITYSUELOS_LOAD_SUCCESS: {
      return entitySuelosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntitySuelosActionTypes.ENTITYSUELOS_LOAD_FAILURE: {
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
