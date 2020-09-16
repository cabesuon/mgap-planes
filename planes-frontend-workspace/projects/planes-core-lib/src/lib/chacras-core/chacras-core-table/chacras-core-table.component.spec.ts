import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasCoreTableComponent } from './chacras-core-table.component';

describe('ChacrasCoreTableComponent', () => {
  let component: ChacrasCoreTableComponent;
  let fixture: ComponentFixture<ChacrasCoreTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasCoreTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasCoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
