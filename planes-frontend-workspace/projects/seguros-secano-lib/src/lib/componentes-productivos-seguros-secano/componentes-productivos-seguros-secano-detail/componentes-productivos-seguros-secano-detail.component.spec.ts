import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesProductivosSegurosSecanoDetailComponent } from './componente-productivo-seguros-secano-detail.component';

describe('ComponentesProductivosSegurosSecanoDetailComponent', () => {
  let component: ComponentesProductivosSegurosSecanoDetailComponent;
  let fixture: ComponentFixture<
    ComponentesProductivosSegurosSecanoDetailComponent
  >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesProductivosSegurosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ComponentesProductivosSegurosSecanoDetailComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
