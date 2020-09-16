import { TestBed } from '@angular/core/testing';

import { MatPaginatorIntlCoreService } from './mat-paginator-intl-core.service';

describe('MatPaginatorIntlCoreService', () => {
  let service: MatPaginatorIntlCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatPaginatorIntlCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
