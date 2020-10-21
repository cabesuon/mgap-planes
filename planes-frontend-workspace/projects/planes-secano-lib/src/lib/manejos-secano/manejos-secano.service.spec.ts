import { TestBed } from '@angular/core/testing';

import { ManejosSecanoService } from './manejos-secano.service';

describe('ManejosSecanoService', () => {
  let service: ManejosSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejosSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
