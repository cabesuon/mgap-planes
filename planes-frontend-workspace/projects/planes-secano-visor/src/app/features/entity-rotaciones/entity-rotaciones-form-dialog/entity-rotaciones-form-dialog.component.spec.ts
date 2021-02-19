import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRotacionesFormDialogComponent } from './entity-rotaciones-form-dialog.component';

describe('EntityRotacionesFormDialogComponent', () => {
  let component: EntityRotacionesFormDialogComponent;
  let fixture: ComponentFixture<EntityRotacionesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityRotacionesFormDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityRotacionesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
