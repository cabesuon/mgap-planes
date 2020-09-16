import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacrasSecanoFormComponent } from './chacras-secano-form.component';

describe('ChacrasSecanoFormComponent', () => {
  let component: ChacrasSecanoFormComponent;
  let fixture: ComponentFixture<ChacrasSecanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChacrasSecanoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacrasSecanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
