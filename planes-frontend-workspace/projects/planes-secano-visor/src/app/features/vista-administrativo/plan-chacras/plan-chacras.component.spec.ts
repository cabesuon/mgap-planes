import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanChacrasComponent } from './plan-chacras.component';

describe('PlanChacrasComponent', () => {
  let component: PlanChacrasComponent;
  let fixture: ComponentFixture<PlanChacrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanChacrasComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanChacrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
