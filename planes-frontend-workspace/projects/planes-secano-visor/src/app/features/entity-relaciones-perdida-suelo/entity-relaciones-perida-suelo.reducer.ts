import {
  EntityRelacionesPerdidaSueloActions,
  EntityRelacionesPerdidaSueloActionTypes
} from './entity-relaciones-perida-suelo.actions';
import {
  entityRelacionesPerdidaSueloSecanoAdapter,
  initialState,
  EntityRelacionesPerdidaSueloSecanoState
} from './entity-relaciones-perdida-suelo.state';

export function entityRelacionesPerdidaSueloReducer(
  state = initialState,
  action: EntityRelacionesPerdidaSueloActions
): EntityRelacionesPerdidaSueloSecanoState {
  switch (action.type) {
    // load
    case EntityRelacionesPerdidaSueloActionTypes.ENTITYRELACIONESPERDIDASUELO_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityRelacionesPerdidaSueloActionTypes.ENTITYRELACIONESPERDIDASUELO_LOAD_SUCCESS: {
      return entityRelacionesPerdidaSueloSecanoAdapter.addMany(
        action.payload.items,
        {
          ...state,
          isLoading: false,
          error: null
        }
      );
    }
    case EntityRelacionesPerdidaSueloActionTypes.ENTITYRELACIONESPERDIDASUELO_LOAD_FAILURE: {
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
