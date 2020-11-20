import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesManejosSegurosSecanoTableComponent } from './unidades-manejos-seguros-secano-table.component';

describe('UnidadesManejosSegurosSecanoTableComponent', () => {
  let component: UnidadesManejosSegurosSecanoTableComponent;
  let fixture: ComponentFixture<UnidadesManejosSegurosSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesManejosSegurosSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      UnidadesManejosSegurosSecanoTableComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
