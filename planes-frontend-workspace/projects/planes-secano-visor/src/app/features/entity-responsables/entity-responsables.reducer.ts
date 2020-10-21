import {
  EntityResponsablesActions,
  EntityResponsablesActionTypes
} from './entity-responsables.actions';
import {
  entityResponsablesAdapter,
  initialState,
  EntityResponsablesState
} from './entity-responsables.state';

export function entityResponsablesReducer(
  state = initialState,
  action: EntityResponsablesActions
): EntityResponsablesState {
  switch (action.type) {
    // load
    case EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_SUCCESS: {
      return entityResponsablesAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityResponsablesActionTypes.ENTITYRESPONSABLES_LOAD_FAILURE: {
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
