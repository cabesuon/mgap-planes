import { AuthState } from './auth.models';
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authLogout
} from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  personaId: null,
  token: null,
  isLoading: false,
  error: null
};

const reducer = createReducer(
  initialState,
  on(authLoginRequest, state => ({
    ...state,
    personaId: null,
    token: null,
    isLoading: true,
    error: null
  })),
  on(authLoginSuccess, (state, payload) => ({
    ...state,
    personaId: payload.personaId,
    token: payload.token,
    isLoading: false,
    error: null
  })),
  on(authLoginFailure, (state, payload) => ({
    ...state,
    personaId: null,
    token: null,
    isLoading: false,
    error: payload.error
  })),
  on(authLogout, state => ({ ...state, personaId: null, token: null }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
