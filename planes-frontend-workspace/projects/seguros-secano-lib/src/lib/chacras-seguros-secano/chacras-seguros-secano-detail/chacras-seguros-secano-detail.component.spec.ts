import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasSegurosSecanoDetailComponent } from './chacras-seguros-secano-detail.component';

describe('ChacrasSegurosSecanoDetailComponent', () => {
  let component: ChacrasSegurosSecanoDetailComponent;
  let fixture: ComponentFixture<ChacrasSegurosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasSegurosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasSegurosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
