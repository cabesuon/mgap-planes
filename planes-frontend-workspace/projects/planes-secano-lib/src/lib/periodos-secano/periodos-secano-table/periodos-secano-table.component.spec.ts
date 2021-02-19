import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosSecanoTableComponent } from './periodos-secano-table.component';

describe('PeriodosSecanoTableComponent', () => {
  let component: PeriodosSecanoTableComponent;
  let fixture: ComponentFixture<PeriodosSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodosSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodosSecanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
