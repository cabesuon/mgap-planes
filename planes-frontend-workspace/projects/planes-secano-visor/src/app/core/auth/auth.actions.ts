import { createAction, props } from '@ngrx/store';

export const authLoginRequest = createAction(
  '[Auth] Login Request',
  props<{ token: string }>()
);
export const authLoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ personaId: string; token: string }>()
);
export const authLoginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
export const authLogout = createAction('[Auth] Logout');
