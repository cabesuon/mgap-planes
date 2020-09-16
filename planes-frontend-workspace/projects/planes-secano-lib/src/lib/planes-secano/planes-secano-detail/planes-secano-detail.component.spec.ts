import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesSecanoDetailComponent } from './planes-secano-detail.component';

describe('PlanesSecanoDetailComponent', () => {
  let component: PlanesSecanoDetailComponent;
  let fixture: ComponentFixture<PlanesSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
