import {
  EntityAseguradorasActions,
  EntityAseguradorasActionTypes
} from './entity-aseguradoras.actions';
import {
  entityAseguradorasAdapter,
  initialState,
  EntityAseguradorasState
} from './entity-aseguradoras.state';

export function entityAseguradorasReducer(
  state = initialState,
  action: EntityAseguradorasActions
): EntityAseguradorasState {
  switch (action.type) {
    // load
    case EntityAseguradorasActionTypes.ENTITYASEGURADORAS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityAseguradorasActionTypes.ENTITYASEGURADORAS_LOAD_SUCCESS: {
      return entityAseguradorasAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityAseguradorasActionTypes.ENTITYASEGURADORAS_LOAD_FAILURE: {
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
