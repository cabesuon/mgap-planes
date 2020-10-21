import { TestBed } from '@angular/core/testing';

import { RendimientosSecanoService } from './rendimientos-secano.service';

describe('RendimientosSecanoService', () => {
  let service: RendimientosSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendimientosSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
