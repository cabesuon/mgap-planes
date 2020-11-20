import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ComponentesProductivosSegurosSecanoTableComponent
} from './componentes-productivos-seguros-secano-table.component';

describe('ComponentesProductivosSegurosSecanoTableComponent', () => {
  let component: ComponentesProductivosSegurosSecanoTableComponent;
  let fixture: ComponentFixture<ComponentesProductivosSegurosSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesProductivosSegurosSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesProductivosSegurosSecanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
