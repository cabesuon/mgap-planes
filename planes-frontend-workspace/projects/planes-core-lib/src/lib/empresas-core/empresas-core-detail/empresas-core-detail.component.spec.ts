import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasCoreDetailComponent } from './empresas-core-detail.component';

describe('EmpresasCoreDetailComponent', () => {
  let component: EmpresasCoreDetailComponent;
  let fixture: ComponentFixture<EmpresasCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresasCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
