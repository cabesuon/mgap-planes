import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablesCoreDetailComponent } from './responsables-core-detail.component';

describe('ResponsablesCoreDetailComponent', () => {
  let component: ResponsablesCoreDetailComponent;
  let fixture: ComponentFixture<ResponsablesCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsablesCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsablesCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
