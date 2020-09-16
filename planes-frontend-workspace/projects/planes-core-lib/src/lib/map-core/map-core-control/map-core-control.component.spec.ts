import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCoreControlComponent } from './map-core-control.component';

describe('MapCoreControlComponent', () => {
  let component: MapCoreControlComponent;
  let fixture: ComponentFixture<MapCoreControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCoreControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCoreControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
