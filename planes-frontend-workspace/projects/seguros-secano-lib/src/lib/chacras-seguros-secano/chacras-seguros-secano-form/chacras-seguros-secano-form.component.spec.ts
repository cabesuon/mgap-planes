import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasSegurosSecanoFormComponent } from './chacras-seguros-secano-form.component';

describe('ChacrasSegurosSecanoFormComponent', () => {
  let component: ChacrasSegurosSecanoFormComponent;
  let fixture: ComponentFixture<ChacrasSegurosSecanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasSegurosSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasSegurosSecanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
