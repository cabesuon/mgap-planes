import {
  EntityRotacionesActions,
  EntityRotacionesActionTypes
} from './entity-rotaciones.actions';
import {
  entityRotacionesAdapter,
  initialState,
  EntityRotacionesState
} from './entity-rotaciones.state';

export function entityRotacionesReducer(
  state = initialState,
  action: EntityRotacionesActions
): EntityRotacionesState {
  switch (action.type) {
    // load
    case EntityRotacionesActionTypes.ENTITYROTACIONES_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_LOAD_SUCCESS: {
      return entityRotacionesAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // add
    case EntityRotacionesActionTypes.ENTITYROTACIONES_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_ADD_SUCCESS: {
      return entityRotacionesAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // change
    case EntityRotacionesActionTypes.ENTITYROTACIONES_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_CHANGE_SUCCESS: {
      return entityRotacionesAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_CHANGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // delete
    case EntityRotacionesActionTypes.ENTITYROTACIONES_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_DELETE_SUCCESS: {
      return entityRotacionesAdapter.removeOne(
        action.payload.item.rotacionPlanId,
        {
          ...state,
          isLoading: false,
          error: null
        }
      );
    }
    case EntityRotacionesActionTypes.ENTITYROTACIONES_DELETE_FAILURE: {
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
