import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityChacrasFormDialogComponent } from './entity-chacras-form-dialog.component';

describe('EntityChacrasFormDialogComponent', () => {
  let component: EntityChacrasFormDialogComponent;
  let fixture: ComponentFixture<EntityChacrasFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityChacrasFormDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityChacrasFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
