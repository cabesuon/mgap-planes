import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../local-storage/local-storage.service';

import { AUTH_KEY } from './auth.models';

@Injectable()
export class AuthBodyTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const localStorageService = this.injector.get(LocalStorageService);
    const auth = localStorageService.getItem(AUTH_KEY);
    if (auth) {
      request = request.clone({
        body: {
          ...(request.body as any),
          token: auth.token
        }
      });
    }
    return next.handle(request);
  }
}
