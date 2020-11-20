import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AseguradorasSegurosSecanoDetailComponent
} from './aseguradoras-seguros-secano-detail.component';

describe('AseguradorasSegurosSecanoDetailComponent', () => {
  let component: AseguradorasSegurosSecanoDetailComponent;
  let fixture: ComponentFixture<AseguradorasSegurosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AseguradorasSegurosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguradorasSegurosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
