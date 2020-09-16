import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesCoreDetailComponent } from './planes-core-detail.component';

describe('PlanesCoreDetailComponent', () => {
  let component: PlanesCoreDetailComponent;
  let fixture: ComponentFixture<PlanesCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
