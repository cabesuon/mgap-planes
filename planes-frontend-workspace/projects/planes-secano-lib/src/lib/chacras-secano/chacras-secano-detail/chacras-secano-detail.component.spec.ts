import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasSecanoDetailComponent } from './chacras-secano-detail.component';

describe('ChacrasSecanoDetailComponent', () => {
  let component: ChacrasSecanoDetailComponent;
  let fixture: ComponentFixture<ChacrasSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
