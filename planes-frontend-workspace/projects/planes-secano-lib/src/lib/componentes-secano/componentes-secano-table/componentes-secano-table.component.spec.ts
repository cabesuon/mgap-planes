import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesSecanoTableComponent } from './componentes-secano-table.component';

describe('ComponentesSecanoTableComponent', () => {
  let component: ComponentesSecanoTableComponent;
  let fixture: ComponentFixture<ComponentesSecanoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesSecanoTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesSecanoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
