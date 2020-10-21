import {
  EntityRendimientosActions,
  EntityRendimientosActionTypes
} from './entity-rendimientos.actions';
import {
  entityRendimientosAdapter,
  initialState,
  EntityRendimientosState
} from './entity-rendimientos.state';

export function entityRendimientosReducer(
  state = initialState,
  action: EntityRendimientosActions
): EntityRendimientosState {
  switch (action.type) {
    // load
    case EntityRendimientosActionTypes.ENTITYRENDIMIENTOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityRendimientosActionTypes.ENTITYRENDIMIENTOS_LOAD_SUCCESS: {
      return entityRendimientosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityRendimientosActionTypes.ENTITYRENDIMIENTOS_LOAD_FAILURE: {
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
