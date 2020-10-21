import { TestBed } from '@angular/core/testing';

import { RotacionesSecanoService } from './rotaciones-secano.service';

describe('RotacionesSecanoService', () => {
  let service: RotacionesSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotacionesSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
