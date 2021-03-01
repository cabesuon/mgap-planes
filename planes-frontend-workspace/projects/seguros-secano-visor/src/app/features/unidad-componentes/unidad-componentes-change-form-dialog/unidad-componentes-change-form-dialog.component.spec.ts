import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadComponentesChangeFormDialogComponent } from './unidad-componentes-change-form-dialog.component';

describe('UnidadComponentesChangeFormDialogComponent', () => {
  let component: UnidadComponentesChangeFormDialogComponent;
  let fixture: ComponentFixture<UnidadComponentesChangeFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadComponentesChangeFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadComponentesChangeFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
