import {
  EntityManejosActions,
  EntityManejosActionTypes
} from './entity-manejos.actions';
import {
  entityManejosAdapter,
  initialState,
  EntityManejosState
} from './entity-manejos.state';

export function entityManejosReducer(
  state = initialState,
  action: EntityManejosActions
): EntityManejosState {
  switch (action.type) {
    // load
    case EntityManejosActionTypes.ENTITYMANEJOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityManejosActionTypes.ENTITYMANEJOS_LOAD_SUCCESS: {
      return entityManejosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityManejosActionTypes.ENTITYMANEJOS_LOAD_FAILURE: {
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
