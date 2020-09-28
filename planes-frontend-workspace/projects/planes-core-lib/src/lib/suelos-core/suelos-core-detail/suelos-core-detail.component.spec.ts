import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuelosCoreDetailComponent } from './suelos-core-detail.component';

describe('SuelosCoreDetailComponent', () => {
  let component: SuelosCoreDetailComponent;
  let fixture: ComponentFixture<SuelosCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuelosCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuelosCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
