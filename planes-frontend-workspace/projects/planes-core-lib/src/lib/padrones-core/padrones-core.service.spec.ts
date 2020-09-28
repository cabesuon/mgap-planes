import { TestBed } from '@angular/core/testing';

import { PadronesCoreService } from './padrones-core.service';

describe('PadronesCoreService', () => {
  let service: PadronesCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadronesCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
