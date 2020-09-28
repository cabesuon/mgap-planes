import { TestBed } from '@angular/core/testing';

import { EmpresasCoreService } from './empresas-core.service';

describe('EmpresasCoreService', () => {
  let service: EmpresasCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresasCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
