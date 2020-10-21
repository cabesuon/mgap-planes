import { TestBed } from '@angular/core/testing';

import { RelacionesPerdidaSueloSecanoService } from './relaciones-perdida-suelo-secano.service';

describe('RelacionesPerdidaSueloSecanoService', () => {
  let service: RelacionesPerdidaSueloSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionesPerdidaSueloSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
