import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityComponentesFormDialogComponent } from './entity-componentes-form-dialog.component';

describe('EntityComponentesFormDialogComponent', () => {
  let component: EntityComponentesFormDialogComponent;
  let fixture: ComponentFixture<EntityComponentesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityComponentesFormDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityComponentesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
