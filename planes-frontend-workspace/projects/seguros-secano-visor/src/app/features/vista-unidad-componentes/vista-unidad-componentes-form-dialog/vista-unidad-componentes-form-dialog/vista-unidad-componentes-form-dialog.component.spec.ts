import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUnidadComponentesFormDialogComponent } from './vista-unidad-componentes-form-dialog.component';

describe('VistaUnidadComponentesFormDialogComponent', () => {
  let component: VistaUnidadComponentesFormDialogComponent;
  let fixture: ComponentFixture<VistaUnidadComponentesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaUnidadComponentesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaUnidadComponentesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
