import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityZonasExclusionFormDialogComponent } from './entity-zonas-exclusion-form-dialog.component';

describe('EntityZonasExclusionFormDialogComponent', () => {
  let component: EntityZonasExclusionFormDialogComponent;
  let fixture: ComponentFixture<EntityZonasExclusionFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityZonasExclusionFormDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityZonasExclusionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
