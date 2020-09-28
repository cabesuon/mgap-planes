import { TestBed } from '@angular/core/testing';

import { SuelosCoreService } from './suelos-core.service';

describe('SuelosCoreService', () => {
  let service: SuelosCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuelosCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
