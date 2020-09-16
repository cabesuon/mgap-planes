import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesCoreFormComponent } from './planes-core-form.component';

describe('PlanesCoreFormComponent', () => {
  let component: PlanesCoreFormComponent;
  let fixture: ComponentFixture<PlanesCoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesCoreFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesCoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
