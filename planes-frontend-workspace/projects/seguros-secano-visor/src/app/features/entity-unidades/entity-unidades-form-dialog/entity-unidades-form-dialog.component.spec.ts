import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityUnidadesFormDialogComponent } from './entity-unidades-form-dialog.component';

describe('EntityUnidadesFormDialogComponent', () => {
  let component: EntityUnidadesFormDialogComponent;
  let fixture: ComponentFixture<EntityUnidadesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityUnidadesFormDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityUnidadesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
