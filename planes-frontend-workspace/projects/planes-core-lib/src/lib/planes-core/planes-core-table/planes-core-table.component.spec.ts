import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesCoreTableComponent } from './planes-core-table.component';

describe('PlanesCoreTableComponent', () => {
  let component: PlanesCoreTableComponent;
  let fixture: ComponentFixture<PlanesCoreTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesCoreTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesCoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
