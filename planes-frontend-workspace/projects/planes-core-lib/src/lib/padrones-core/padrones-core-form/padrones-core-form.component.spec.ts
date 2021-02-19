import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadronesCoreFormComponent } from './padrones-core-form.component';

describe('PadronesCoreFormComponent', () => {
  let component: PadronesCoreFormComponent;
  let fixture: ComponentFixture<PadronesCoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PadronesCoreFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadronesCoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
