import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasExclusionCoreFormComponent } from './zonas-exclusion-core-form.component';

describe('ZonasExclusionCoreFormComponent', () => {
  let component: ZonasExclusionCoreFormComponent;
  let fixture: ComponentFixture<ZonasExclusionCoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZonasExclusionCoreFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasExclusionCoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
