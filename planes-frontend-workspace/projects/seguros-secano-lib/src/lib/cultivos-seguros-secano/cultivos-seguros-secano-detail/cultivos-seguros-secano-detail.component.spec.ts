import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivosSegurosSecanoDetailComponent } from './cultivos-seguros-secano-detail.component';

describe('CultivosSegurosSecanoDetailComponent', () => {
  let component: CultivosSegurosSecanoDetailComponent;
  let fixture: ComponentFixture<CultivosSegurosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CultivosSegurosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivosSegurosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
