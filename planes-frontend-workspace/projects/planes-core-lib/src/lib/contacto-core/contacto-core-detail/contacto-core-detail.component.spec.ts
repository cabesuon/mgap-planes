import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCoreDetailComponent } from './contacto-core-detail.component';

describe('ContactoCoreDetailComponent', () => {
  let component: ContactoCoreDetailComponent;
  let fixture: ComponentFixture<ContactoCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
