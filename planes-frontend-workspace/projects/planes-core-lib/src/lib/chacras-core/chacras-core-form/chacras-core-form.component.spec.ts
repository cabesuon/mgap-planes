import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasCoreFormComponent } from './chacras-core-form.component';

describe('ChacrasCoreFormComponent', () => {
  let component: ChacrasCoreFormComponent;
  let fixture: ComponentFixture<ChacrasCoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasCoreFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasCoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
