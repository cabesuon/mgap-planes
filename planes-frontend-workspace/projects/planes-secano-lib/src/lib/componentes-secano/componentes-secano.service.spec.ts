import { TestBed } from '@angular/core/testing';

import { ComponentesSecanoService } from './componentes-secano.service';

describe('ComponentesSecanoService', () => {
  let service: ComponentesSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentesSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
