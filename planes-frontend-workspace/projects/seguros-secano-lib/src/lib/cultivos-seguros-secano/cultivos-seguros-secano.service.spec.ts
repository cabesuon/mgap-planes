import { TestBed } from '@angular/core/testing';

import { CultivosSegurosSecanoService } from './cultivos-seguros-secano.service';

describe('CultivosSegurosSecanoService', () => {
  let service: CultivosSegurosSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultivosSegurosSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
