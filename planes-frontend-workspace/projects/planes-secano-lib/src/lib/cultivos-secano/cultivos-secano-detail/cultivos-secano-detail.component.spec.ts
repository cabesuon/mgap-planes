import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivosSecanoDetailComponent } from './cultivos-secano-detail.component';

describe('CultivosSecanoDetailComponent', () => {
  let component: CultivosSecanoDetailComponent;
  let fixture: ComponentFixture<CultivosSecanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CultivosSecanoDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivosSecanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
