import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  UnidadesManejosSegurosSecanoFormComponent
} from './unidades-manejos-seguros-secano-form.component';

describe('UnidadesManejosSegurosSecanoFormComponent', () => {
  let component: UnidadesManejosSegurosSecanoFormComponent;
  let fixture: ComponentFixture<
  UnidadesManejosSegurosSecanoFormComponent
  >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesManejosSegurosSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      UnidadesManejosSegurosSecanoFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
