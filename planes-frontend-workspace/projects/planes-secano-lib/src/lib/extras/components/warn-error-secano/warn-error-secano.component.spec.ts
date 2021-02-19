import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnErrorSecanoComponent } from './warn-error-secano.component';

describe('WarnErrorSecanoComponent', () => {
  let component: WarnErrorSecanoComponent;
  let fixture: ComponentFixture<WarnErrorSecanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarnErrorSecanoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnErrorSecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
