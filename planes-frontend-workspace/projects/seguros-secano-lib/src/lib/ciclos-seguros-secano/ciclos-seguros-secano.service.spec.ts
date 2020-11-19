import { TestBed } from '@angular/core/testing';

import { CiclosSegurosSecanoService } from './ciclos-seguros-secano.service';

describe('CiclosSegurosSecanoService', () => {
  let service: CiclosSegurosSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiclosSegurosSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
