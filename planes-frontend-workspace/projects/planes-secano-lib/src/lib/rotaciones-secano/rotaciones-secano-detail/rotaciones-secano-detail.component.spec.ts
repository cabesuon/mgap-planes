import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotacionesSecanoDetailComponent } from './rotaciones-secano-detail.component';

describe('RotacionesSecanoDetailComponent', () => {
  let component: RotacionesSecanoDetailComponent;
  let fixture: ComponentFixture<RotacionesSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RotacionesSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotacionesSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
