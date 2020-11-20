import { TestBed } from '@angular/core/testing';

import { AuthBodyTokenInterceptor } from './auth-body-token.interceptor';

describe('AuthBodyTokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthBodyTokenInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: AuthBodyTokenInterceptor = TestBed.inject(
      AuthBodyTokenInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
