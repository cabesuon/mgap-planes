import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { NotificationService } from '../notifications/notification.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

import { AuthService } from './auth.service';

import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authLogout
} from './auth.actions';

import { AUTH_KEY } from './auth.models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  loginRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginRequest),
      switchMap(payload =>
        this.authService.login(payload.token).pipe(
          map(result =>
            authLoginSuccess({
              personaId: result.personaId,
              token: payload.token
            })
          ),
          catchError(error =>
            observableOf(
              authLoginFailure({
                error: 'Error al ingresar.'
              })
            )
          )
        )
      )
    )
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginSuccess),
        tap(payload => {
          this.localStorageService.setItem(AUTH_KEY, {
            personaId: payload.personaId,
            token: payload.token
          });
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  loginFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginFailure),
        tap(payload => {
          this.localStorageService.setItem(AUTH_KEY, {
            personaId: null,
            token: null
          });
          this.notificationService.error(payload.error);
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['/features/login']);
          this.localStorageService.setItem(AUTH_KEY, {
            personaId: null,
            token: null
          });
        })
      ),
    { dispatch: false }
  );
}
