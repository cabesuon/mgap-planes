import {
  EntityEmpresasActions,
  EntityEmpresasActionTypes
} from './entity-empresas.actions';
import {
  entityEmpresasAdapter,
  initialState,
  EntityEmpresasState
} from './entity-empresas.state';

export function entityEmpresasReducer(
  state = initialState,
  action: EntityEmpresasActions
): EntityEmpresasState {
  switch (action.type) {
    // load
    case EntityEmpresasActionTypes.ENTITYEMPRESAS_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityEmpresasActionTypes.ENTITYEMPRESAS_LOAD_SUCCESS: {
      return entityEmpresasAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityEmpresasActionTypes.ENTITYEMPRESAS_LOAD_FAILURE: {
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
