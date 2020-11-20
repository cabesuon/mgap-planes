import { TestBed } from '@angular/core/testing';

import { AseguradorasSegurosSecanoService } from './aseguradoras-seguros-secano.service';

describe('AseguradorasSegurosSecanoService', () => {
  let service: AseguradorasSegurosSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AseguradorasSegurosSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
