import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosSecanoDetailComponent } from './periodos-secano-detail.component';

describe('PeriodosSecanoDetailComponent', () => {
  let component: PeriodosSecanoDetailComponent;
  let fixture: ComponentFixture<PeriodosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
