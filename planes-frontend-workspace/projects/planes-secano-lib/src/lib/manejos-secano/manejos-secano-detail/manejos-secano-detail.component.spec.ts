import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejosSecanoDetailComponent } from './manejos-secano-detail.component';

describe('ManejosSecanoDetailComponent', () => {
  let component: ManejosSecanoDetailComponent;
  let fixture: ComponentFixture<ManejosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManejosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
