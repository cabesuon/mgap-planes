import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotacionesSecanoTableComponent } from './rotaciones-secano-table.component';

describe('RotacionesSecanoTableComponent', () => {
  let component: RotacionesSecanoTableComponent;
  let fixture: ComponentFixture<RotacionesSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RotacionesSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotacionesSecanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
