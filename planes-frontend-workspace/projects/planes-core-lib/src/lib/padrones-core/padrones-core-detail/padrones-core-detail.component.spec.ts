import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadronesCoreDetailComponent } from './padrones-core-detail.component';

describe('PadronesCoreDetailComponent', () => {
  let component: PadronesCoreDetailComponent;
  let fixture: ComponentFixture<PadronesCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PadronesCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadronesCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
