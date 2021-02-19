import {
  EntityPlanesActions,
  EntityPlanesActionTypes
} from './entity-planes.actions';
import {
  entityPlanesAdapter,
  initialState,
  EntityPlanesState
} from './entity-planes.state';

export function entityPlanesReducer(
  state = initialState,
  action: EntityPlanesActions
): EntityPlanesState {
  switch (action.type) {
    // load
    case EntityPlanesActionTypes.ENTITYPLANES_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_LOAD_SUCCESS: {
      return entityPlanesAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityPlanesActionTypes.ENTITYPLANES_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // add
    case EntityPlanesActionTypes.ENTITYPLANES_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_ADD_SUCCESS: {
      return entityPlanesAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityPlanesActionTypes.ENTITYPLANES_ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // change
    case EntityPlanesActionTypes.ENTITYPLANES_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_CHANGE_SUCCESS: {
      return entityPlanesAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityPlanesActionTypes.ENTITYPLANES_CHANGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // delete
    case EntityPlanesActionTypes.ENTITYPLANES_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_DELETE_SUCCESS: {
      return entityPlanesAdapter.removeOne(action.payload.planId, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityPlanesActionTypes.ENTITYPLANES_DELETE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // copy
    case EntityPlanesActionTypes.ENTITYPLANES_COPY_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_COPY_SUCCESS: {
      return entityPlanesAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityPlanesActionTypes.ENTITYPLANES_COPY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // get url
    case EntityPlanesActionTypes.ENTITYPLANES_GETURL_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_GETURL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case EntityPlanesActionTypes.ENTITYPLANES_GETURL_FAILURE: {
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
