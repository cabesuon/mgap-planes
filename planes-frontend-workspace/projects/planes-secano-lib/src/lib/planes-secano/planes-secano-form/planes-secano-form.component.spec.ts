import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesSecanoFormComponent } from './planes-secano-form.component';

describe('PlanesSecanoFormComponent', () => {
  let component: PlanesSecanoFormComponent;
  let fixture: ComponentFixture<PlanesSecanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesSecanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
