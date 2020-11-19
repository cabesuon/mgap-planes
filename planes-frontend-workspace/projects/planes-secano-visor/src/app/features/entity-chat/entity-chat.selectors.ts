import { createSelector } from '@ngrx/store';
import {
  entityChatSecanoAdapter,
  EntityChatSecanoState,
  ChatSecano
} from './entity-chat.state';

import { selectFeatures, FeaturesState } from '../features.state';

export const getError = (state: EntityChatSecanoState): any => state.error;

export const getIsLoading = (state: EntityChatSecanoState): boolean =>
  state.isLoading;

export const selectEntityChatSecanoState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.entityChat
);

export const selectAllEntityChat: (
  state: object
) => ChatSecano[] = entityChatSecanoAdapter.getSelectors(
  selectEntityChatSecanoState
).selectAll;
