import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuelosCoreFormComponent } from './suelos-core-form.component';

describe('SuelosCoreFormComponent', () => {
  let component: SuelosCoreFormComponent;
  let fixture: ComponentFixture<SuelosCoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuelosCoreFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuelosCoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
