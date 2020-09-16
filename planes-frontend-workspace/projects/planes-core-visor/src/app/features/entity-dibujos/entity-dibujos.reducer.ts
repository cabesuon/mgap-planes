import { Action, createReducer, on } from '@ngrx/store';
import * as DibujosActions from './entity-dibujos.actions';
import {
  entityDibujosAdapter,
  initialState,
  EntityDibujosState
} from './entity-dibujos.state';

const dibujosReducer = createReducer(
  initialState,
  on(DibujosActions.addDibujo, (state, { dibujo }) => {
    return entityDibujosAdapter.addOne(dibujo, state);
  }),
  on(DibujosActions.addDibujos, (state, { dibujos }) => {
    return entityDibujosAdapter.addMany(dibujos, state);
  }),
  on(DibujosActions.updateDibujo, (state, { update }) => {
    return entityDibujosAdapter.updateOne(update, state);
  }),
  on(DibujosActions.updateDibujos, (state, { updates }) => {
    return entityDibujosAdapter.updateMany(updates, state);
  }),
  on(DibujosActions.deleteDibujo, (state, { id }) => {
    return entityDibujosAdapter.removeOne(id, state);
  }),
  on(DibujosActions.deleteDibujos, (state, { ids }) => {
    return entityDibujosAdapter.removeMany(ids, state);
  }),
  on(DibujosActions.loadDibujos, (state, { dibujos }) => {
    return entityDibujosAdapter.setAll(dibujos, state);
  }),
  on(DibujosActions.clearDibujos, state => {
    return entityDibujosAdapter.removeAll({ ...state });
  })
);

export function entityDibujosReducer(
  state: EntityDibujosState | undefined,
  action: Action
) {
  return dibujosReducer(state, action);
}
