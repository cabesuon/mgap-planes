import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotacionesSecanoFormComponent } from './rotaciones-secano-form.component';

describe('RotacionesSecanoFormComponent', () => {
  let component: RotacionesSecanoFormComponent;
  let fixture: ComponentFixture<RotacionesSecanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RotacionesSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotacionesSecanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
