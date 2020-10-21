import {
  EntityZonasExclusionActions,
  EntityZonasExclusionActionTypes
} from './entity-zonas-exclusion.actions';
import {
  entityZonasExclusionAdapter,
  initialState,
  EntityZonasExclusionState
} from './entity-zonas-exclusion.state';

export function entityZonasExclusionReducer(
  state = initialState,
  action: EntityZonasExclusionActions
): EntityZonasExclusionState {
  switch (action.type) {
    // load
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_LOAD_SUCCESS: {
      return entityZonasExclusionAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // add
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_ADD_SUCCESS: {
      return entityZonasExclusionAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // change
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_CHANGE_SUCCESS: {
      return entityZonasExclusionAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_CHANGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // delete
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_DELETE_SUCCESS: {
      return entityZonasExclusionAdapter.removeOne(
        action.payload.item.zonaExclusionId,
        {
          ...state,
          isLoading: false,
          error: null
        }
      );
    }
    case EntityZonasExclusionActionTypes.ENTITYZONASEXCLUSION_DELETE_FAILURE: {
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
