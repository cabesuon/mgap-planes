import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenierosAgronomosCoreDetailComponent } from './ingenieros-agronomos-core-detail.component';

describe('IngenierosAgronomosCoreDetailComponent', () => {
  let component: IngenierosAgronomosCoreDetailComponent;
  let fixture: ComponentFixture<IngenierosAgronomosCoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IngenierosAgronomosCoreDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngenierosAgronomosCoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
