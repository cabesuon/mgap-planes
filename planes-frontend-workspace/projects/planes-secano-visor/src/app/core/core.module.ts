import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

import {
  AppState,
  reducers,
  metaReducers,
  selectRouterState
} from './core.state';
import { AuthEffects } from './auth/auth.effects';
import {
  selectAuth,
  selectAuthToken,
  selectAuthPersonaId,
  selectAuthError,
  selectAuthIsLoading
} from './auth/auth.selectors';
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authLogout
} from './auth/auth.actions';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthBodyTokenInterceptor } from './auth/auth-body-token.interceptor';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NotificationService } from './notifications/notification.service';
import { FileService } from './file/file.service';

export {
  selectAuth,
  selectAuthToken,
  selectAuthPersonaId,
  selectAuthError,
  selectAuthIsLoading,
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService,
  AuthGuardService,
  selectRouterState,
  NotificationService,
  FileService
};

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Planes Secano Visor'
        })
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthBodyTokenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
