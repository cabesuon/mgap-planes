import {
  EntityChacrasActions,
  EntityChacrasActionTypes
} from './entity-chacras.actions';
import {
  entityChacrasAdapter,
  initialState,
  EntityChacrasState
} from './entity-chacras.state';

export function entityChacrasReducer(
  state = initialState,
  action: EntityChacrasActions
): EntityChacrasState {
  switch (action.type) {
    // load
    case EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_SUCCESS: {
      return entityChacrasAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // add
    case EntityChacrasActionTypes.ENTITYCHACRAS_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_ADD_SUCCESS: {
      return entityChacrasAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // change
    case EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_SUCCESS: {
      return entityChacrasAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_CHANGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // delete
    case EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_SUCCESS: {
      return entityChacrasAdapter.removeOne(action.payload.chacraId, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_DELETE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // get padrones
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETPADRONES_REQUEST: {
      return {
        ...state,
        isLoading: false, // dont want to stop app
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETPADRONES_SUCCESS: {
      return entityChacrasAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETPADRONES_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // get suelos
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETSUELOS_REQUEST: {
      return {
        ...state,
        isLoading: false, // dont want to stop app
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETSUELOS_SUCCESS: {
      return entityChacrasAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETSUELOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // get LS
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_REQUEST: {
      return {
        ...state,
        isLoading: false, // dont want to stop app
        error: null
      };
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_SUCCESS: {
      return entityChacrasAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChacrasActionTypes.ENTITYCHACRAS_GETLS_FAILURE: {
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
