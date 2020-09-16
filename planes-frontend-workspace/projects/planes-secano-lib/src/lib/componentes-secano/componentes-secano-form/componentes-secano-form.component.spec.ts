import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesSecanoFormComponent } from './componentes-secano-form.component';

describe('ComponentesSecanoFormComponent', () => {
  let component: ComponentesSecanoFormComponent;
  let fixture: ComponentFixture<ComponentesSecanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesSecanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
