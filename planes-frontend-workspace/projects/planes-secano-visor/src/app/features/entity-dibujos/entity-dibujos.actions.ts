import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DibujoCore } from './entity-dibujos.state';

export const loadDibujos = createAction(
  '[ENTITYDIBUJOS] Load Dibujos',
  props<{ dibujos: DibujoCore[] }>()
);
export const addDibujo = createAction(
  '[ENTITYDIBUJOS] Add Dibujo',
  props<{ dibujo: DibujoCore }>()
);
export const setDibujo = createAction(
  '[ENTITYDIBUJOS] Set Dibujo',
  props<{ dibujo: DibujoCore }>()
);
export const upsertDibujo = createAction(
  '[ENTITYDIBUJOS] Upsert Dibujo',
  props<{ dibujo: DibujoCore }>()
);
export const addDibujos = createAction(
  '[ENTITYDIBUJOS] Add Dibujos',
  props<{ dibujos: DibujoCore[] }>()
);
export const updateDibujo = createAction(
  '[ENTITYDIBUJOS] Update Dibujo',
  props<{ update: Update<DibujoCore> }>()
);
export const updateDibujos = createAction(
  '[ENTITYDIBUJOS] Update Dibujos',
  props<{ updates: Update<DibujoCore>[] }>()
);
export const deleteDibujo = createAction(
  '[ENTITYDIBUJOS] Delete Dibujo',
  props<{ id: number }>()
);
export const deleteDibujos = createAction(
  '[ENTITYDIBUJOS] Delete Dibujos',
  props<{ ids: number[] }>()
);
export const clearDibujos = createAction('[ENTITYDIBUJOS] Clear Dibujos');
