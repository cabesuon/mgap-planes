import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasSecanoTableComponent } from './chacras-secano-table.component';

describe('ChacrasSecanoTableComponent', () => {
  let component: ChacrasSecanoTableComponent;
  let fixture: ComponentFixture<ChacrasSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasSecanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
