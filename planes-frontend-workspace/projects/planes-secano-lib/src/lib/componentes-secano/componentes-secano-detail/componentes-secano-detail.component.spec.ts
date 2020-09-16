import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesSecanoDetailComponent } from './componentes-secano-detail.component';

describe('ComponentesSecanoDetailComponent', () => {
  let component: ComponentesSecanoDetailComponent;
  let fixture: ComponentFixture<ComponentesSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
