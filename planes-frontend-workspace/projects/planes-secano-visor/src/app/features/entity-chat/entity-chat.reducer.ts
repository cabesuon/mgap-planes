import {
  EntityChatActions,
  EntityChatActionTypes
} from './entity-chat.actions';
import {
  entityChatSecanoAdapter,
  initialState,
  EntityChatSecanoState
} from './entity-chat.state';

export function entityChatReducer(
  state = initialState,
  action: EntityChatActions
): EntityChatSecanoState {
  switch (action.type) {
    // load
    case EntityChatActionTypes.ENTITYCHAT_LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case EntityChatActionTypes.ENTITYCHAT_LOAD_SUCCESS: {
      return entityChatSecanoAdapter.addMany(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case EntityChatActionTypes.ENTITYCHAT_LOAD_FAILURE: {
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
