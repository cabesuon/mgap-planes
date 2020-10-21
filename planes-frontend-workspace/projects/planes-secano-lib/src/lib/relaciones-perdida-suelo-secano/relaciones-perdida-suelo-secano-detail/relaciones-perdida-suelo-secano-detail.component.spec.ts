import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesPerdidaSueloSecanoDetailComponent } from './relaciones-perdida-suelo-secano-detail.component';

describe('RelacionesPerdidaSueloSecanoDetailComponent', () => {
  let component: RelacionesPerdidaSueloSecanoDetailComponent;
  let fixture: ComponentFixture<RelacionesPerdidaSueloSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelacionesPerdidaSueloSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      RelacionesPerdidaSueloSecanoDetailComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
