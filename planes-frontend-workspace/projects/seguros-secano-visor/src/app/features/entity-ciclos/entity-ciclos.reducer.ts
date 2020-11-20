import {
  EntityCiclosActions,
  EntityCiclosActionTypes
} from './entity-ciclos.actions';
import {
  entityCiclosAdapter,
  initialState,
  EntityCiclosState
} from './entity-ciclos.state';

export function entityCiclosReducer(
  state = initialState,
  action: EntityCiclosActions
): EntityCiclosState {
  switch (action.type) {
    // load
    case EntityCiclosActionTypes.ENTITYCICLOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityCiclosActionTypes.ENTITYCICLOS_LOAD_SUCCESS: {
      return entityCiclosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityCiclosActionTypes.ENTITYCICLOS_LOAD_FAILURE: {
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
