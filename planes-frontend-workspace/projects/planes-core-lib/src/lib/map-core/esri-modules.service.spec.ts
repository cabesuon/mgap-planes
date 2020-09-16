import { TestBed } from '@angular/core/testing';

import { EsriModulesService } from './esri-modules.service';

describe('MapCoreService', () => {
  let service: EsriModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsriModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
