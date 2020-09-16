import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPlanesFormDialogComponent } from './entity-planes-form-dialog.component';

describe('EntityPlanesFormDialogComponent', () => {
  let component: EntityPlanesFormDialogComponent;
  let fixture: ComponentFixture<EntityPlanesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityPlanesFormDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPlanesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
