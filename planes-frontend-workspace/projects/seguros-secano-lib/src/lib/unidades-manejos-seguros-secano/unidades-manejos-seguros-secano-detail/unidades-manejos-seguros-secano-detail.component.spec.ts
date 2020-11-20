import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesManejosSegurosSecanoDetailComponent } from './unidades-manejos-seguros-secano-detail.component';

describe('UnidadesManejosSegurosSecanoDetailComponent', () => {
  let component: UnidadesManejosSegurosSecanoDetailComponent;
  let fixture: ComponentFixture<UnidadesManejosSegurosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesManejosSegurosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      UnidadesManejosSegurosSecanoDetailComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
