import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablesSecanoDetailComponent } from './responsables-secano-detail.component';

describe('ResponsablesSecanoDetailComponent', () => {
  let component: ResponsablesSecanoDetailComponent;
  let fixture: ComponentFixture<ResponsablesSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsablesSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsablesSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
