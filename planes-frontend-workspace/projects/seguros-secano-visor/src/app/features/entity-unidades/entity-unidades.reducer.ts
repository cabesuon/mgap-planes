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
    // add
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_SUCCESS: {
      return entityUnidadesManejosAdapter.addOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_ADD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // change
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_SUCCESS: {
      return entityUnidadesManejosAdapter.updateOne(action.payload.item, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_CHANGE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    // delete
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_SUCCESS: {
      return entityUnidadesManejosAdapter.removeOne(action.payload.item.unidadId, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityUnidadesManejosActionTypes.ENTITYUNIDADESMANEJOS_DELETE_FAILURE: {
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
