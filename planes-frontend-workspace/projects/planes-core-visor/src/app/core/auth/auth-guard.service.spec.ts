import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState } from '../core.state';

import { AuthGuardService } from './auth-guard.service';
import { AuthState } from './auth.models';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let store: MockStore<AppState>;

  const authState: AuthState = {
    token: null,
    personaId: null,
    isLoading: false,
    error: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        provideMockStore({
          initialState: {
            auth: authState
          }
        })
      ]
    });
    authGuardService = TestBed.inject(AuthGuardService);
    store = TestBed.inject(Store) as MockStore<AppState>;
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });
});

function createState(authState: AuthState) {
  return {
    auth: authState
  } as AppState;
}
