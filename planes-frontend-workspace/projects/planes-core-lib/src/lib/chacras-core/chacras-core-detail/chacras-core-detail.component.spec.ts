import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasCoreDetailComponent } from './chacras-core-detail.component';

describe('ChacrasCoreDetailComponent', () => {
  let component: ChacrasCoreDetailComponent;
  let fixture: ComponentFixture<ChacrasCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
