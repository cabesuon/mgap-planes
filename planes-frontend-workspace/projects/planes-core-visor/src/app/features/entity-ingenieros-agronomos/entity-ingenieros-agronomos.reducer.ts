import {
  EntityIngenierosAgronomosActions,
  EntityIngenierosAgronomosActionTypes
} from './entity-ingenieros-agronomos.actions';
import {
  entityIngenierosAgronomosAdapter,
  initialState,
  EntityIngenierosAgronomosState
} from './entity-ingenieros-agronomos.state';

export function entityIngenierosAgronomosReducer(
  state = initialState,
  action: EntityIngenierosAgronomosActions
): EntityIngenierosAgronomosState {
  switch (action.type) {
    // load
    case EntityIngenierosAgronomosActionTypes.ENTITYINGENIEROSAGRONOMOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityIngenierosAgronomosActionTypes.ENTITYINGENIEROSAGRONOMOS_LOAD_SUCCESS: {
      return entityIngenierosAgronomosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityIngenierosAgronomosActionTypes.ENTITYINGENIEROSAGRONOMOS_LOAD_FAILURE: {
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
