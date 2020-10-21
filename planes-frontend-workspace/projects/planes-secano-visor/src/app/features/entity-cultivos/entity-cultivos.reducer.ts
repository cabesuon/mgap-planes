import {
  EntityCultivosActions,
  EntityCultivosActionTypes
} from './entity-cultivos.actions';
import {
  entityCultivosAdapter,
  initialState,
  EntityCultivosState
} from './entity-cultivos.state';

export function entityCultivosReducer(
  state = initialState,
  action: EntityCultivosActions
): EntityCultivosState {
  switch (action.type) {
    // load
    case EntityCultivosActionTypes.ENTITYCULTIVOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityCultivosActionTypes.ENTITYCULTIVOS_LOAD_SUCCESS: {
      return entityCultivosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityCultivosActionTypes.ENTITYCULTIVOS_LOAD_FAILURE: {
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
