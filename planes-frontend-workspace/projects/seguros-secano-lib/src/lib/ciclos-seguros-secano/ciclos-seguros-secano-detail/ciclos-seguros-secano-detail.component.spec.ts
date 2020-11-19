import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclosSegurosSecanoDetailComponent } from './ciclos-seguros-secano-detail.component';

describe('CiclosSegurosSecanoDetailComponent', () => {
  let component: CiclosSegurosSecanoDetailComponent;
  let fixture: ComponentFixture<CiclosSegurosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiclosSegurosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiclosSegurosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
