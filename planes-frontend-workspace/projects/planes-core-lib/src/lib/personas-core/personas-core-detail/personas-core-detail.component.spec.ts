import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasCoreDetailComponent } from './personas-core-detail.component';

describe('PersonasCoreDetailComponent', () => {
  let component: PersonasCoreDetailComponent;
  let fixture: ComponentFixture<PersonasCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonasCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
