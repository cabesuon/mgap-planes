import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesSecanoTableComponent } from './planes-secano-table.component';

describe('PlanesSecanoTableComponent', () => {
  let component: PlanesSecanoTableComponent;
  let fixture: ComponentFixture<PlanesSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesSecanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
