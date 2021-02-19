import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRotacionComponentesComponent } from './plan-rotacion-componentes.component';

describe('PlanRotacionComponentesComponent', () => {
  let component: PlanRotacionComponentesComponent;
  let fixture: ComponentFixture<PlanRotacionComponentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanRotacionComponentesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRotacionComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
