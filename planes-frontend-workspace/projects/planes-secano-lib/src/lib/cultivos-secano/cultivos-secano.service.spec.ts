import { TestBed } from '@angular/core/testing';

import { CultivosSecanoService } from './cultivos-secano.service';

describe('CultivosSecanoService', () => {
  let service: CultivosSecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultivosSecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
