import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesProductivosSegurosSecanoFormComponent } from './componentes-productivos-seguros-secano-form.component';

describe('ComponentesProductivosSegurosSecanoFormComponent', () => {
  let component: ComponentesProductivosSegurosSecanoFormComponent;
  let fixture: ComponentFixture<
    ComponentesProductivosSegurosSecanoFormComponent
  >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesProductivosSegurosSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ComponentesProductivosSegurosSecanoFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
