import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { ChatSecano } from 'planes-secano-lib';
export { ChatSecano } from 'planes-secano-lib';

export const entityChatSecanoAdapter: EntityAdapter<
  ChatSecano
> = createEntityAdapter<ChatSecano>({
  selectId: model => model.mensajeId,
  sortComparer: (a: ChatSecano, b: ChatSecano): number =>
    b.mensajeId.toString().localeCompare(a.mensajeId.toString())
});

export interface EntityChatSecanoState extends EntityState<ChatSecano> {
  isLoading?: boolean;
  error?: string | null;
}

export const initialState: EntityChatSecanoState = entityChatSecanoAdapter.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
