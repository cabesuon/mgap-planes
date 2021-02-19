import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetallesComponent } from './plan-detalles.component';

describe('PlanDetallesComponent', () => {
  let component: PlanDetallesComponent;
  let fixture: ComponentFixture<PlanDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanDetallesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
