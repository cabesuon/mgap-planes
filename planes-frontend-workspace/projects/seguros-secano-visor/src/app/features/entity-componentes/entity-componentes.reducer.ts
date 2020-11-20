import {
  EntityComponentesActions,
  EntityComponentesActionTypes
} from './entity-componentes.actions';
import {
  entityComponentesAdapter,
  initialState,
  EntityComponentesState
} from './entity-componentes.state';

export function entityComponentesReducer(
  state = initialState,
  action: EntityComponentesActions
): EntityComponentesState {
  switch (action.type) {
    // load
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_LOAD_SUCCESS: {
      return entityComponentesAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // add
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_SUCCESS: {
      return entityComponentesAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // change
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_SUCCESS: {
      return entityComponentesAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_CHANGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // delete
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_SUCCESS: {
      return entityComponentesAdapter.removeOne(
        action.payload.item.componenteId,
        {
          ...state,
          isLoading: false,
          error: null
        }
      );
    }
    case EntityComponentesActionTypes.ENTITYCOMPONENTES_DELETE_FAILURE: {
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
