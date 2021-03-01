import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadComponentesSendFormDialogComponent } from './unidad-componentes-send-form-dialog.component';

describe('UnidadComponentesSendFormDialogComponent', () => {
  let component: UnidadComponentesSendFormDialogComponent;
  let fixture: ComponentFixture<UnidadComponentesSendFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadComponentesSendFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadComponentesSendFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
