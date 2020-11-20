import {
  EntityUnidadesManejosActions,
  EntityUnidadesManejosActionTypes
} from './entity-unidades.actions';
import {
  entityUnidadesManejosAdapter,
  initialState,
  EntityUnidadesManejosState
} from './entity-unidades.state';

export function entityUnidadesManejosReducer(
  state = initialState,
  action: EntityUnidadesManejosActions
): EntityUnidadesManejosState {
  switch (action.type) {
    // load
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_LOAD_SUCCESS: {
      return entityUnidadesManejosAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_LOAD_FAILURE: {
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
